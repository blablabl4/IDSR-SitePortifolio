/**
 * IDSR — Three.js Liquid Glass Shader (GLSL)
 * Simula a refração ótica de vidro líquido espesso com:
 * 1. Ruído Simplex 3D animado procedural
 * 2. Refração dinâmica de coordenadas UV
 * 3. Aberração cromática ótica (dispersão RGB nos canais de luz)
 * 4. Campo de cor Aurora (#7c6cf6, #f472b6, #38e0e0, #fbbf24) vazando por trás
 * 5. Borda especular no topo e acabamento em vidro translúcido a 8%
 */

export const liquidGlassVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidGlassFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uRefraction;
  uniform float uDispersion;
  uniform float uGlassOpacity;
  uniform float uHover;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // --- Simplex 3D Noise (Ashima Arts / Stefan Gustavson) ---
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // --- Paleta Oficial Aurora IDSR ---
  // Violeta: #7c6cf6 (0.486, 0.424, 0.965)
  // Magenta: #f472b6 (0.957, 0.447, 0.714)
  // Ciano:   #38e0e0 (0.220, 0.878, 0.878)
  // Âmbar:   #fbbf24 (0.984, 0.749, 0.141)
  const vec3 C_VIOLET  = vec3(0.486, 0.424, 0.965);
  const vec3 C_MAGENTA = vec3(0.957, 0.447, 0.714);
  const vec3 C_CYAN    = vec3(0.220, 0.878, 0.878);
  const vec3 C_AMBER   = vec3(0.984, 0.749, 0.141);

  // Campo Aurora procedural interno
  vec3 getAuroraField(vec2 p, float t) {
    float n1 = snoise(vec3(p * 2.2, t * 0.18));
    float n2 = snoise(vec3(p * 3.8 + vec2(1.7, 9.2), t * 0.22));
    float n3 = snoise(vec3(p * 1.5 - vec2(3.1, 4.5), t * 0.12));

    float wViolet  = smoothstep(-0.4, 0.6, n1);
    float wMagenta = smoothstep(-0.2, 0.8, n2);
    float wCyan    = smoothstep(-0.5, 0.5, n3);
    float wAmber   = smoothstep(0.4, 0.95, n1 * n2);

    vec3 col = mix(C_VIOLET, C_MAGENTA, wMagenta * 0.7);
    col = mix(col, C_CYAN, wCyan * 0.6);
    col = mix(col, C_AMBER, wAmber * 0.25);

    // Vignette suave para que o brilho viva no centro
    float dist = length(p - 0.5);
    float vignette = smoothstep(0.8, 0.15, dist);
    return col * vignette;
  }

  void main() {
    vec2 uv = vUv;

    // Distorção refrativa por ruído Simplex
    float timeSlow = uTime * 0.22;
    vec2 mouseOffset = (uMouse - 0.5) * 0.15 * uHover;

    float nx = snoise(vec3(uv * 3.5 + mouseOffset, timeSlow));
    float ny = snoise(vec3(uv * 3.5 - mouseOffset + 12.34, timeSlow + 4.5));
    vec2 normalDistortion = vec2(nx, ny) * uRefraction;

    vec2 refrUv = uv + normalDistortion;

    // Aberração cromática ótica (RGB split)
    float disp = uDispersion * (1.0 + uHover * 0.5);
    vec2 uvR = refrUv + normalDistortion * disp;
    vec2 uvG = refrUv;
    vec2 uvB = refrUv - normalDistortion * disp;

    vec3 colR = getAuroraField(uvR, timeSlow);
    vec3 colG = getAuroraField(uvG, timeSlow);
    vec3 colB = getAuroraField(uvB, timeSlow);

    vec3 auroraColor = vec3(colR.r, colG.g, colB.b);

    // Efeito de superfície de vidro:
    // 1. Base branca a 8%
    vec3 glassBase = vec3(1.0) * 0.08;

    // 2. Cor da Aurora mais próxima para tingir a iluminação de borda
    vec3 nearestAurora = getAuroraField(uv, timeSlow * 0.6);

    // 3. Borda especular no topo com tingimento Aurora sutil
    vec3 topHighlightColor = mix(vec3(1.0), nearestAurora + vec3(0.5), 0.35) * (smoothstep(0.97, 1.0, uv.y) * 0.4);

    // 4. Rim light cromático nas bordas (a luz vem sempre de dentro, tingida pela aurora)
    float edgeDistX = min(uv.x, 1.0 - uv.x);
    float edgeDistY = min(uv.y, 1.0 - uv.y);
    float edge = min(edgeDistX, edgeDistY);
    float borderFactor = smoothstep(0.05, 0.0, edge);
    vec3 chromaticRimLight = (nearestAurora * 1.6 + vec3(0.15)) * borderFactor * 0.35;

    // Composição final: aurora interna filtrada pelo vidro translúcido com rim light cromático
    vec3 finalColor = glassBase + (auroraColor * 0.85) + topHighlightColor + chromaticRimLight;
    float alpha = clamp(0.14 + (length(auroraColor) * 0.65) + length(topHighlightColor) + borderFactor * 0.25, 0.12, 0.95);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
