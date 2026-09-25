// ==========================================================================
// IDSR — Shaders GLSL de Mural Monolítico 3D (Estilo Rogier de Boevé)
// Composição central unificada: 540 blocos modulares em 3D que formam o objeto
// protagonista da cena com iluminação volumétrica âmbar contínua e fresnel.
// Na transição de seção, os blocos se fragmentam e explodem no espaço.
// ==========================================================================

export const blockVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uGlitchIntensity;
  uniform float uExplosionForce;
  uniform float uIsSectionTransition;
  uniform float uIsIntroGenesis;
  uniform float uIntroExploded;
  uniform vec2 uMousePos;
  uniform vec2 uMuralBounds;

  attribute vec3 aInstanceOriginalPos;
  attribute vec3 aInstanceExplodedPos;
  attribute vec3 aInstanceScale;
  attribute vec3 aInstanceRotAxis;
  attribute float aInstanceRotSpeed;
  attribute vec2 aInstanceGridUv;
  attribute float aInstanceDelay;
  attribute float aInstancePhase;
  attribute float aInstanceForwardWeight;
  attribute float aInstanceArrivalOrder;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vGridUv;
  varying vec2 vFaceUv;
  varying float vDistToMouse;
  varying float vMouseForce;
  varying float vProgress;
  varying float vCubeProgress;

  // Rotação 3D por Eixo Arbitrário (Fórmula de Rodrigues)
  vec3 rotateOnAxis(vec3 v, vec3 axis, float angle) {
    float cosA = cos(angle);
    float sinA = sin(angle);
    return v * cosA + cross(axis, v) * sinA + axis * dot(axis, v) * (1.0 - cosA);
  }

  void main() {
    // 0. Se ainda estamos na tela pré-hero e a gênese não começou: blocos ficam 100% ocultos
    if (uIntroExploded < 0.5 && uIsIntroGenesis < 0.5) {
      gl_Position = vec4(9999.0, 9999.0, 9999.0, 1.0);
      return;
    }

    vGridUv = aInstanceGridUv;
    vFaceUv = uv;

    // 1. Interação Dinâmica com o Cursor do Mouse
    float distToMouse = length(aInstanceOriginalPos.xy - uMousePos);
    float mouseRadius = 240.0;
    float mouseFactor = clamp(1.0 - distToMouse / mouseRadius, 0.0, 1.0);
    float mouseForce = smoothstep(0.0, 1.0, mouseFactor);
    vDistToMouse = distToMouse;
    vMouseForce = mouseForce;

    // Projeção tátil para frente (cubos se elevam em Z ao aproximar o mouse)
    float mouseElevateZ = mouseForce * 36.0;

    // Inclinação física 3D do cubo voltada ao cursor
    vec2 mouseDir = normalize(aInstanceOriginalPos.xy - uMousePos + vec2(0.0001));
    vec3 mouseRotAxis = vec3(-mouseDir.y, mouseDir.x, 0.0);
    float mouseTiltAngle = mouseForce * 0.46;

    // 2. Micro-respiração orgânica dos cubos 3D no repouso
    float idleZ = sin(uTime * 1.2 + aInstancePhase) * 3.5;
    float idleRot = sin(uTime * 0.7 + aInstancePhase) * 0.06;

    vec2 radialDir = normalize(aInstanceOriginalPos.xy + vec2(0.0001, 0.0001));
    float centerDist = length(aInstanceOriginalPos.xy);

    vec3 forwardExit = vec3(
      aInstanceOriginalPos.xy * 1.25 + radialDir * 40.0,
      780.0 + aInstanceForwardWeight * 260.0
    );
    vec3 lateralExit = vec3(
      aInstanceOriginalPos.xy + radialDir * (320.0 + centerDist * 0.38),
      160.0 + sin(aInstancePhase) * 45.0
    );
    vec3 exitPos = mix(lateralExit, forwardExit, smoothstep(0.35, 0.95, aInstanceForwardWeight));

    vec3 enterOrigin = vec3(
      aInstanceOriginalPos.xy * 0.20,
      -480.0 - (aInstanceArrivalOrder * 180.0)
    );

    vec3 currentCenter;
    float rotProgress = 0.0;
    float scaleFactor = 1.0;
    float cubeProgress = 0.0;

    float activeProgress = uIsIntroGenesis > 0.5 ? uProgress : (uIsSectionTransition * uProgress);
    vProgress = activeProgress;

    // =========================================================================
    // CASO A: ANIMAÇÃO DE GÊNESE INICIAL DE 5 SEGUNDOS (Emergência Acelerando)
    // =========================================================================
    if (uIsIntroGenesis > 0.5) {
      float genesisStart = aInstanceArrivalOrder * 0.45;
      float genesisDuration = 0.40;

      if (uProgress < genesisStart) {
        currentCenter = enterOrigin;
        scaleFactor = 0.0;
        rotProgress = 1.0;
      } else {
        float t = clamp((uProgress - genesisStart) / genesisDuration, 0.0, 1.0);
        // Easing com aceleração progressiva que monta a tela bloco a bloco
        float eased = t * t * (3.0 - 2.0 * t);
        currentCenter = mix(enterOrigin, aInstanceOriginalPos, eased);
        rotProgress = 1.0 - eased;
        scaleFactor = mix(0.1, 1.0, eased);
      }
      cubeProgress = uProgress;
    } else {
      // =======================================================================
      // CASO B: TRANSIÇÕES ENTRE SEÇÕES (Scrub Contínuo Frame a Frame 1:1)
      // =======================================================================
      if (activeProgress <= 0.46) {
        // FASE 1: DESCONSTRUÇÃO E EXPLOSÃO
        float tExit = activeProgress / 0.46;
        float exitDelay = aInstanceDelay * 0.12;
        float localExit = clamp((tExit - exitDelay) / (1.0 - exitDelay), 0.0, 1.0);
        float easedExit = localExit * localExit * (3.0 - 2.0 * localExit);

        currentCenter = mix(aInstanceOriginalPos, exitPos, easedExit);
        rotProgress = easedExit;
        scaleFactor = 1.0 + easedExit * (aInstanceForwardWeight * 0.6 + 0.25);
        cubeProgress = localExit * 0.5;
      } else {
        // FASE 2: SURGIMENTO "BLOCO POR BLOCO" ATÉ MONTAR A TELA
        float arrivalWindowStart = 0.46 + aInstanceArrivalOrder * 0.34;
        float arrivalDuration = 0.20;

        if (activeProgress < arrivalWindowStart) {
          currentCenter = enterOrigin;
          scaleFactor = 0.0;
          rotProgress = 1.0;
          cubeProgress = 0.5;
        } else {
          float tEnter = clamp((activeProgress - arrivalWindowStart) / arrivalDuration, 0.0, 1.0);
          float easedEnter = tEnter * tEnter * (3.0 - 2.0 * tEnter);

          currentCenter = mix(enterOrigin, aInstanceOriginalPos, easedEnter);
          rotProgress = 1.0 - easedEnter;
          scaleFactor = mix(0.1, 1.0, easedEnter);
          cubeProgress = 0.5 + easedEnter * 0.5;
        }
      }
    }

    vCubeProgress = cubeProgress;

    // Combinação de Rotações
    float flyRot = rotProgress * aInstanceRotSpeed * 3.8;
    vec3 baseRotated = rotateOnAxis(position * aInstanceScale * scaleFactor, mouseRotAxis, mouseTiltAngle);
    vec3 localRotated = rotateOnAxis(baseRotated, aInstanceRotAxis, idleRot + flyRot);

    vec3 baseNormalRotated = rotateOnAxis(normal, mouseRotAxis, mouseTiltAngle);
    vec3 normalRotated = rotateOnAxis(baseNormalRotated, aInstanceRotAxis, idleRot + flyRot);

    // Turbulência física orgânica e suave durante o voo
    float midAirIntensity = sin(activeProgress * 3.14159265);
    vec3 noiseOffset = vec3(
      sin(currentCenter.y * 0.012 + uTime * 0.6),
      cos(currentCenter.x * 0.012 + uTime * 0.6),
      sin((currentCenter.x + currentCenter.y) * 0.008 + uTime * 0.8)
    ) * (midAirIntensity * 18.0);

    currentCenter += noiseOffset;
    currentCenter.z += (idleZ + mouseElevateZ) * (1.0 - midAirIntensity);

    // =========================================================================
    // TREMOR E GLITCH DOS BLOCOS JUNTOS (Transição entre Serviços sem Explosão)
    // =========================================================================
    if (uGlitchIntensity > 0.001) {
      // Tremor coletivo em bloco de alta frequência
      vec3 collectiveShake = vec3(
        sin(uTime * 52.0) * 4.2,
        cos(uTime * 58.0) * 3.4,
        sin(uTime * 44.0) * 5.0
      ) * uGlitchIntensity;

      // Micro-vibração física individual por bloco
      float jitterSeed = sin(dot(aInstanceOriginalPos.xy, vec2(12.9898, 78.233))) * 43758.5453;
      vec3 blockJitter = vec3(
        fract(jitterSeed + uTime * 28.0) - 0.5,
        fract(jitterSeed * 1.4 + uTime * 34.0) - 0.5,
        fract(jitterSeed * 1.8 + uTime * 38.0) - 0.5
      ) * (uGlitchIntensity * 6.5);

      currentCenter += collectiveShake + blockJitter;
    }

    vec3 finalVertexPos = currentCenter + localRotated;

    vec4 mvPosition = modelViewMatrix * vec4(finalVertexPos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normalRotated);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const blockFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uGlitchIntensity;
  uniform vec3 uThemeCoreColor;
  uniform vec3 uThemeEdgeColor;
  uniform vec2 uMousePos;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vGridUv;
  varying vec2 vFaceUv;
  varying float vDistToMouse;
  varying float vMouseForce;
  varying float vProgress;
  varying float vCubeProgress;

  // Granulação procedural cinematográfica (Film Grain) para textura analógica suave
  float filmGrain(vec2 uv, float time) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233)) + time * 45.0) * 43758.5453);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 norm = normalize(vNormal);

    // 1. Fresnel nas bordas do cubo de quartzo/vidro
    float fresnel = pow(1.0 - abs(dot(viewDir, norm)), 2.2);

    // 2. Iluminação Tridimensional de Cubo (Chiaroscuro por Face)
    vec3 lightDirTop = normalize(vec3(0.35, 1.2, 0.7));
    vec3 lightDirSide = normalize(vec3(-0.8, -0.2, 0.5));

    float diffTop = max(dot(norm, lightDirTop), 0.0);
    float diffSide = max(dot(norm, lightDirSide), 0.0) * 0.45;
    
    float isTopFace = max(norm.y, 0.0);
    float isFrontFace = max(norm.z, 0.0);

    float totalDiff = 0.25 + diffTop * 0.7 + diffSide;

    // 3. Atmosfera e Cores Temáticas Dinâmicas por Seção/Serviço
    vec2 centeredUv = vGridUv - vec2(0.5);
    float distFromCenter = length(centeredUv);

    vec3 coreTheme = uThemeCoreColor;
    vec3 edgeTheme = uThemeEdgeColor;

    vec3 obsidianGlass = vec3(0.05, 0.05, 0.07); // Obsidiana escura
    vec3 deepSmoke     = mix(vec3(0.12, 0.11, 0.13), coreTheme * 0.22, 0.4);

    // Brilho volumétrico central dinâmico com gradiente
    float coreLight = exp(-distFromCenter * 2.8);
    vec3 cubeColor = mix(obsidianGlass, deepSmoke, smoothstep(0.5, 0.1, distFromCenter));
    cubeColor = mix(cubeColor, coreTheme, coreLight * 0.85);
    cubeColor = mix(cubeColor, edgeTheme, smoothstep(0.35, 0.75, distFromCenter) * 0.30);

    // Face superior recebe brilho zenital
    cubeColor += coreTheme * (isTopFace * 0.35);

    // 4. Rastro de Luz do Mouse (Spotlight Focado e Discreto - Raio Calibrado ~85.0)
    float mouseLight = exp(-pow(vDistToMouse / 85.0, 2.0));
    vec3 cursorAura = mix(coreTheme, edgeTheme, vMouseForce);
    cubeColor += cursorAura * (mouseLight * 0.35);

    // Iluminação total sobre o corpo do cubo
    vec3 baseCol = cubeColor * totalDiff;

    // Arestas e Chanfros dos Cubos 3D
    float edgeX = min(vFaceUv.x, 1.0 - vFaceUv.x);
    float edgeY = min(vFaceUv.y, 1.0 - vFaceUv.y);
    float edgeDist = min(edgeX, edgeY);
    float cubeBevel = 1.0 - smoothstep(0.0, 0.08, edgeDist);
    vec3 edgeLight = mix(coreTheme, edgeTheme, vGridUv.x);
    vec3 edgeGlow = edgeLight * (cubeBevel * 1.2 + fresnel * 0.8) + vec3(0.95) * pow(fresnel, 4.0) * 0.4;
    edgeGlow += cursorAura * (mouseLight * 0.65 + vMouseForce * 0.35);

    // Efeito TV Color Bars Glitch nos Cubos entre Serviços
    if (uGlitchIntensity > 0.01) {
      float sliceY = floor((vGridUv.y + sin(uTime * 24.0) * 0.04) * 12.0);
      float sliceShift = sin(sliceY * 37.0 + uTime * 30.0) * uGlitchIntensity * 0.35;
      float barUvX = clamp(vGridUv.x + sliceShift, 0.0, 0.999);
      float barIndex = floor(barUvX * 7.0);

      vec3 smpteColor = vec3(0.95);
      if (barIndex < 1.0) smpteColor = vec3(0.95, 0.95, 0.95);       // Branco
      else if (barIndex < 2.0) smpteColor = vec3(0.95, 0.82, 0.10);  // Amarelo
      else if (barIndex < 3.0) smpteColor = vec3(0.12, 0.82, 0.88);  // Ciano
      else if (barIndex < 4.0) smpteColor = vec3(0.18, 0.85, 0.32);  // Verde
      else if (barIndex < 5.0) smpteColor = vec3(0.92, 0.22, 0.75);  // Magenta
      else if (barIndex < 6.0) smpteColor = vec3(0.92, 0.18, 0.18);  // Vermelho
      else smpteColor = vec3(0.18, 0.35, 0.95);                      // Azul

      baseCol = mix(baseCol, smpteColor * (totalDiff * 1.25), uGlitchIntensity * 0.82);
      edgeGlow += smpteColor * (uGlitchIntensity * 1.8);
    }

    // Brilho especular sutil
    float specAngle = dot(reflect(-lightDirTop, norm), viewDir);
    float spec = pow(max(specAngle, 0.0), 32.0) * 0.55;

    // Iluminação Orgânica de Voo 3D (Transição Fluida)
    float midTransition = sin(vProgress * 3.14159265);
    edgeGlow += edgeTheme * (midTransition * 0.85);

    // Granulação Cinematográfica Sutil
    float grainVal = (filmGrain(gl_FragCoord.xy * 0.0025, uTime) - 0.5) * 0.08;
    baseCol += vec3(grainVal) * (1.0 + midTransition * 0.6);

    float alpha = mix(0.94, 1.0, cubeBevel);

    gl_FragColor = vec4(baseCol + edgeGlow + vec3(spec), alpha);
  }
`;

// --------------------------------------------------------------------------
// 2. Shaders de Micro-Partículas Atmosféricas (Stardust de Fundo)
// --------------------------------------------------------------------------

export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uExplosionForce;
  uniform vec2 uResolution;

  attribute vec3 aExplodedPos;
  attribute vec3 aOriginalPos;
  attribute vec3 aColor;
  attribute float aDelay;
  attribute float aSize;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    float localProgress = clamp((uProgress - aDelay * 0.25) / (1.0 - aDelay * 0.25), 0.0, 1.0);
    float eased = smoothstep(0.0, 1.0, localProgress);

    vec3 currentPos = mix(aOriginalPos, aExplodedPos, eased);
    currentPos.y += sin(uTime * 0.8 + aOriginalPos.x * 0.01) * 6.0;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * (260.0 / -mvPosition.z);
    vAlpha = mix(0.5, 0.15, eased);
  }
`;

export const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float intensity = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(vColor, vAlpha * intensity);
  }
`;

// --------------------------------------------------------------------------
// 3. Shader de Refração de Bordas em Vidro Líquido (Post-Processing)
// --------------------------------------------------------------------------

export const edgeRefractionVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const edgeRefractionFragmentShader = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float bellCurve = uProgress * (1.0 - uProgress) * 4.0;
    vec2 centered = vUv - 0.5;
    float edgeFactor = smoothstep(0.2, 0.6, length(centered));
    float distortionIntensity = bellCurve * edgeFactor * 0.07;

    float nX = snoise(vUv * 4.0 + vec2(uTime * 0.3, 0.0));
    float nY = snoise(vUv * 4.0 + vec2(0.0, uTime * 0.3));

    vec2 distortedUv = vUv + vec2(nX, nY) * distortionIntensity;

    float r = texture2D(tDiffuse, distortedUv + vec2(distortionIntensity * 0.4, 0.0)).r;
    float g = texture2D(tDiffuse, distortedUv).g;
    float b = texture2D(tDiffuse, distortedUv - vec2(distortionIntensity * 0.4, 0.0)).b;

    vec3 color = vec3(r, g, b);
    vec3 auroraGlow = mix(vec3(0.22, 0.88, 0.88), vec3(0.48, 0.42, 0.96), vUv.x);
    color += auroraGlow * (distortionIntensity * 4.0);

    float vignette = 1.0 - smoothstep(0.3, 0.85, length(centered)) * bellCurve * 0.25;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;
