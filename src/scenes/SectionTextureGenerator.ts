import * as THREE from 'three';

/**
 * SectionTextureGenerator — Gera texturas cinemáticas de alta visibilidade e resolução para o Mural 3D
 * Padrão Rogier de Boevé (rogierdeboeve.com): atmosfera âmbar vibrante, iluminação cinematográfica,
 * núcleo gráfico de alta definição e tipografia nítida mapeada na grade de ladrilhos modulares.
 */
export class SectionTextureGenerator {
  private width: number = 2048;
  private height: number = 1280;

  /**
   * Textura da Seção 0: Hero / Manifesto IDSR (Estilo Rogier de Boevé)
   */
  public createHeroTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;

    // 1. Base escura de quartzo/obsidiana
    ctx.fillStyle = '#0e1017';
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Núcleo Volumétrico Âmbar Dourado Vibrante (Idêntico à cena de Rogier de Boevé)
    const radialGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      80,
      centerX,
      centerY,
      this.width * 0.55
    );
    radialGrad.addColorStop(0, 'rgba(251, 146, 60, 0.95)');   // Âmbar dourado incandescente
    radialGrad.addColorStop(0.25, 'rgba(217, 119, 6, 0.80)'); // Bronze quente
    radialGrad.addColorStop(0.55, 'rgba(124, 108, 246, 0.50)'); // Violeta IDSR
    radialGrad.addColorStop(0.80, 'rgba(56, 224, 224, 0.35)');  // Ciano refração
    radialGrad.addColorStop(1, 'rgba(14, 16, 23, 0.98)');     // Borda escura

    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 3. Grade geométrica de telemetria arquitetônica
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    const step = 64;
    for (let x = 0; x < this.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // 4. Símbolo Central IDSR (Íris de Engenharia com Halo Brilhante)
    ctx.save();
    ctx.translate(centerX, centerY - 240);

    // Anel externo com glow
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#38e0e0';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.stroke();

    // Anel intermediário ciano
    ctx.strokeStyle = '#38e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();

    // Ponto focal central
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. Tag Superior de Status
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#38e0e0';
    ctx.font = '700 32px monospace';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 16;
    ctx.fillText('IDSR // MANIFESTO DE ENGENHARIA', centerX, centerY - 140);

    // 6. Frase Obrigatória em Tipografia Monumental e Nítida
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 76px system-ui, -apple-system, sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 32;

    ctx.fillText(
      '“Fugir do óbvio exige mais do que uma ideia ou uma ferramenta,',
      centerX,
      centerY - 10
    );

    // Segunda linha com gradiente cromático marcante
    const gradText = ctx.createLinearGradient(
      centerX - 420,
      centerY + 85,
      centerX + 420,
      centerY + 85
    );
    gradText.addColorStop(0, '#38e0e0');
    gradText.addColorStop(0.5, '#ffffff');
    gradText.addColorStop(1, '#f472b6');

    ctx.fillStyle = gradText;
    ctx.font = '800 82px system-ui, -apple-system, sans-serif';
    ctx.shadowBlur = 40;
    ctx.shadowColor = 'rgba(124, 108, 246, 0.8)';
    ctx.fillText('é o caminho que conecta as duas.”', centerX, centerY + 85);

    // 7. Rodapé do Mural (Assinatura e Metadados Técnicos)
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '700 26px monospace';
    ctx.fillText('FUNDADA POR ROCHA   ·   ARQUITETURA VIVA   ·   [ 2026 ]', centerX, centerY + 220);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Textura da Seção 1: Serviços / Engenharia de Automação & Dados
   */
  public createServicesTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;

    ctx.fillStyle = '#090b12';
    ctx.fillRect(0, 0, this.width, this.height);

    const radialGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      100,
      centerX,
      centerY,
      this.width * 0.55
    );
    radialGrad.addColorStop(0, 'rgba(56, 224, 224, 0.85)');   // Ciano intenso
    radialGrad.addColorStop(0.35, 'rgba(124, 108, 246, 0.65)'); // Violeta
    radialGrad.addColorStop(0.70, 'rgba(244, 114, 182, 0.40)'); // Rosa aurora
    radialGrad.addColorStop(1, 'rgba(9, 11, 18, 0.98)');

    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#38e0e0';
    ctx.font = '700 32px monospace';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 18;
    ctx.fillText('01 // ENGENHARIA DE AUTOMAÇÃO & DADOS', centerX, centerY - 130);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 84px system-ui, -apple-system, sans-serif';
    ctx.shadowBlur = 35;
    ctx.fillText('AUTOMAÇÃO & SISTEMAS AUTÔNOMOS', centerX, centerY - 15);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '500 34px system-ui, -apple-system, sans-serif';
    ctx.fillText('Operações contínuas 24/7 sem atrito ou trabalho manual residual', centerX, centerY + 80);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '700 24px monospace';
    ctx.fillText('LATÊNCIA < 150MS   ·   UPTIME ALVO 99.98%   ·   ACID REALTIME', centerX, centerY + 200);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }
}
