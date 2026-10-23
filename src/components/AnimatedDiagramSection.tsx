import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Footprints, Route, CalendarCheck, Sparkles } from 'lucide-react';

export const AnimatedDiagramSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Ciclo da animação do diagrama (duração total: 6 segundos)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = (prev + 0.8) % 100;
        if (next < 33) {
          setActiveStep(1);
        } else if (next < 66) {
          setActiveStep(2);
        } else {
          setActiveStep(3);
        }
        return next;
      });
    }, 48);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    setProgress(0);
    setActiveStep(1);
    setIsPlaying(true);
  };

  // Cálculo das posições dos jogadores e da bola com base no progresso (0 a 100%)
  // Fase 1 (0 a 33%): Saque/Lançamento até o Jogador 1
  // Fase 2 (33 a 66%): Jogador 1 passa de manchete e Jogador 2 se aproxima da rede
  // Fase 3 (66 a 100%): Jogador 2 levanta, Jogador 1 faz a aproximação para o ataque
  const t = progress / 100;

  // Posição do Jogador 1 (Receptor / Atacante)
  let p1X = 390;
  let p1Y = 220;
  if (t < 0.33) {
    const f1 = t / 0.33;
    p1X = 390 - f1 * 25; // Desloca para interceptar a bola
    p1Y = 220 + f1 * 15;
  } else if (t < 0.66) {
    p1X = 365;
    p1Y = 235;
  } else {
    const f3 = (t - 0.66) / 0.34;
    p1X = 365 - f3 * 65; // Avança para a rede para atacar
    p1Y = 235 - f3 * 55;
  }

  // Posição do Jogador 2 (Levantador)
  let p2X = 390;
  let p2Y = 120;
  if (t >= 0.33 && t < 0.66) {
    const f2 = (t - 0.33) / 0.33;
    p2X = 390 - f2 * 60; // Desloca até a rede para levantar
    p2Y = 120 + f2 * 35;
  } else if (t >= 0.66) {
    p2X = 330;
    p2Y = 155;
  }

  // Posição da Bola de Vôlei
  let ballX = 130;
  let ballY = 170;
  let ballScale = 1;
  let ballOpacity = 1;

  if (t < 0.33) {
    const f1 = t / 0.33;
    // Parábola da Quadra A até o Jogador 1
    ballX = 130 + f1 * (365 - 130);
    const arcHeight = Math.sin(f1 * Math.PI) * 45;
    ballY = 170 + f1 * (235 - 170) - arcHeight;
    ballScale = 0.9 + Math.sin(f1 * Math.PI) * 0.35;
  } else if (t < 0.66) {
    const f2 = (t - 0.33) / 0.33;
    // Passe de manchete até a posição de levantamento
    ballX = 365 + f2 * (330 - 365);
    const arcHeight = Math.sin(f2 * Math.PI) * 55;
    ballY = 235 + f2 * (155 - 235) - arcHeight;
    ballScale = 0.9 + Math.sin(f2 * Math.PI) * 0.4;
  } else {
    const f3 = (t - 0.66) / 0.34;
    // Levantamento para a ponta onde o Jogador 1 finaliza
    ballX = 330 + f3 * (300 - 330);
    const arcHeight = Math.sin(f3 * Math.PI) * 40;
    ballY = 155 + f3 * (180 - 155) - arcHeight;
    ballScale = 0.9 + Math.sin(f3 * Math.PI) * 0.3;
  }

  return (
    <section className="py-14 sm:py-20 px-4 max-w-5xl mx-auto text-center scroll-mt-12">
      {/* Selo / Badge no topo */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] text-[#C26500] text-xs font-black uppercase tracking-wider mb-4 border border-[#FFE0B2] shadow-xs">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F1C] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9F1C]"></span>
        </span>
        <span>NOVO RECURSO DO APP • EXERCÍCIOS EM MOVIMENTO</span>
      </div>

      {/* 1. TÍTULO PRINCIPAL */}
      <h2 className="text-3xl sm:text-5xl font-black text-[#0E4B75] tracking-tight uppercase max-w-3xl mx-auto font-heading leading-tight">
        CHEGA DE TENTAR ENTENDER O EXERCÍCIO OLHANDO APENAS PARA UM DESENHO
      </h2>

      {/* 2. TEXTO DE APOIO */}
      <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
        Com <strong className="text-[#0E4B75] font-black">diagramas animados</strong>, você visualiza as movimentações em tempo real e entende exatamente como cada atividade acontece na quadra antes de entrar na areia com os seus alunos.
      </p>

      {/* 3. DEMONSTRAÇÃO VISUAL EM DESTAQUE (MOLDURA ESTILO APP) */}
      <div className="mt-8 sm:mt-12 relative max-w-3xl mx-auto">
        {/* Brilho ambiente sutil atrás da moldura */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF9F1C]/20 via-[#0E4B75]/15 to-[#05D179]/15 rounded-[36px] blur-2xl opacity-70 pointer-events-none" />

        {/* ========================================================================= */}
        {/* ÁREA DE DEMONSTRAÇÃO DO DIAGRAMA ANIMADO:                                 */}
        {/* Este container simula a tela do app com o diagrama animado em movimento.   */}
        {/* Para substituir pelo vídeo real do aplicativo, insira a tag <video> aqui.  */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl border-2 sm:border-3 border-slate-800 bg-[#0B1526] text-white shadow-2xl overflow-hidden text-left">
          
          {/* Barra superior estilo aplicativo */}
          <div className="px-4 sm:px-6 py-3 bg-[#08101E] border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FF9F1C] text-slate-950 font-black text-xs">
                🏐
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0E4B75] text-cyan-200 border border-cyan-400/30">
                    DEF-INT-14
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide">
                    Deslocamento em V com Transição
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Dupla na areia • Nível Intermediário • Defesa e Contra-Ataque
                </div>
              </div>
            </div>

            {/* Badge de reprodução de animação */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Animação em Loop</span>
            </div>
          </div>

          {/* Área da Quadra de Areia com Animação dos Jogadores e da Bola */}
          <div className="relative p-3 sm:p-5 bg-gradient-to-b from-[#0F1E36] to-[#0A1424]">
            
            {/* Tag flutuante sobre a quadra */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/60 text-[11px] text-slate-200 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F1C]" />
              <span>Diagrama em movimento: dinâmica da atividade</span>
            </div>

            {/* Quadra de Areia SVG */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-amber-900/40 shadow-inner bg-[#E8CBA3]">
              <svg
                viewBox="0 0 540 320"
                className="w-full h-full select-none"
                aria-label="Diagrama tático de vôlei de praia em movimento"
              >
                {/* Textura sutil da areia */}
                <rect width="540" height="320" fill="#E8CBA3" />
                <pattern id="sand-texture" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="#D4B386" opacity="0.4" />
                  <circle cx="15" cy="15" r="1" fill="#D4B386" opacity="0.4" />
                </pattern>
                <rect width="540" height="320" fill="url(#sand-texture)" />

                {/* Linhas da Quadra de Vôlei de Praia (8m x 16m) */}
                {/* Quadra Completa com margens de escape */}
                <rect
                  x="40"
                  y="40"
                  width="460"
                  height="240"
                  fill="#E2C195"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  rx="2"
                  className="drop-shadow-xs"
                />

                {/* Rede Central (divide a quadra aos 270px) */}
                <line
                  x1="270"
                  y1="34"
                  x2="270"
                  y2="286"
                  stroke="#0E4B75"
                  strokeWidth="5"
                  strokeDasharray="4 2"
                />
                {/* Postes da rede */}
                <circle cx="270" cy="34" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="270" cy="286" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
                {/* Antenas regulamentares (vermelho/branco) */}
                <line x1="270" y1="40" x2="270" y2="52" stroke="#FF4A3F" strokeWidth="4" />
                <line x1="270" y1="268" x2="270" y2="280" stroke="#FF4A3F" strokeWidth="4" />

                {/* Identificação dos Lados */}
                <text x="140" y="26" textAnchor="middle" fill="#785933" fontSize="11" fontWeight="700" letterSpacing="1">
                  QUADRA A (PROFESSOR / LANÇADOR)
                </text>
                <text x="390" y="26" textAnchor="middle" fill="#0E4B75" fontSize="11" fontWeight="800" letterSpacing="1">
                  QUADRA B (DUPLA NA AREIA)
                </text>

                {/* Trajetórias pontilhadas (vetores de deslocamento) */}
                {/* Trajetória da bola 1 (saque) */}
                <path
                  d="M 130 170 Q 250 80 365 235"
                  fill="none"
                  stroke="#FF9F1C"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity={t < 0.33 ? 0.9 : 0.35}
                />
                {/* Trajetória da bola 2 (passe/levantamento) */}
                <path
                  d="M 365 235 Q 350 140 330 155"
                  fill="none"
                  stroke="#05D179"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  opacity={t >= 0.33 && t < 0.66 ? 0.9 : 0.3}
                />
                {/* Deslocamento do Jogador 1 (em V) */}
                <path
                  d="M 390 220 L 365 235 L 300 180"
                  fill="none"
                  stroke="#0E4B75"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  opacity="0.55"
                />
                {/* Deslocamento do Jogador 2 (para a rede) */}
                <path
                  d="M 390 120 L 330 155"
                  fill="none"
                  stroke="#0E4B75"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  opacity="0.55"
                />

                {/* Jogador Lançador / Treinador na Quadra A */}
                <g transform="translate(130, 170)">
                  <circle r="14" fill="#334155" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                    PROF
                  </text>
                </g>

                {/* Sombra dos jogadores na areia */}
                <ellipse cx={p1X} cy={p1Y + 12} rx="14" ry="5" fill="#5C4028" opacity="0.25" />
                <ellipse cx={p2X} cy={p2Y + 12} rx="14" ry="5" fill="#5C4028" opacity="0.25" />

                {/* Jogador 1 (Receptor / Atacante em movimento) */}
                <g transform={`translate(${p1X}, ${p1Y})`}>
                  {/* Halo de foco no jogador ativo */}
                  <circle r="18" fill="#FF9F1C" opacity={activeStep === 1 || activeStep === 3 ? "0.35" : "0.15"} className="animate-pulse" />
                  <circle r="13" fill="#0E4B75" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">
                    J1
                  </text>
                </g>

                {/* Jogador 2 (Levantador em movimento) */}
                <g transform={`translate(${p2X}, ${p2Y})`}>
                  <circle r="17" fill="#05D179" opacity={activeStep === 2 ? "0.35" : "0.15"} />
                  <circle r="13" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">
                    J2
                  </text>
                </g>

                {/* Sombra da bola na areia */}
                <ellipse
                  cx={ballX}
                  cy={Math.min(ballY + 18, 275)}
                  rx={8 * ballScale}
                  ry={3 * ballScale}
                  fill="#45301E"
                  opacity="0.25"
                />

                {/* Bola de Vôlei em Movimento 3D */}
                <g transform={`translate(${ballX}, ${ballY}) scale(${ballScale})`} opacity={ballOpacity}>
                  <circle r="9" fill="#FFFFFF" stroke="#0E4B75" strokeWidth="1.5" className="drop-shadow-md" />
                  {/* Gomos da bola de vôlei (amarelo e azul) */}
                  <path d="M -8 0 C -4 -5 4 -5 8 0" stroke="#FF9F1C" strokeWidth="2" fill="none" />
                  <path d="M 0 -8 C 5 -4 5 4 0 8" stroke="#0284C7" strokeWidth="2" fill="none" />
                </g>

                {/* Legendas rápidas dos atletas */}
                <text x={p1X} y={p1Y + 28} textAnchor="middle" fill="#0F172A" fontSize="9" fontWeight="800">
                  Receptor / Ataque
                </text>
                <text x={p2X} y={p2Y + 28} textAnchor="middle" fill="#0F172A" fontSize="9" fontWeight="800">
                  Levantador
                </text>
              </svg>
            </div>

            {/* Fases do exercício em tempo real */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className={`p-2 rounded-xl text-center border transition-all ${
                activeStep === 1
                  ? 'bg-[#FF9F1C]/20 border-[#FF9F1C] text-[#FF9F1C]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}>
                <div className="text-[10px] font-mono font-bold uppercase">Passo 1</div>
                <div className="text-xs font-bold truncate">Bola lançada no fundo</div>
              </div>

              <div className={`p-2 rounded-xl text-center border transition-all ${
                activeStep === 2
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}>
                <div className="text-[10px] font-mono font-bold uppercase">Passo 2</div>
                <div className="text-xs font-bold truncate">Deslocamento e Manchete</div>
              </div>

              <div className={`p-2 rounded-xl text-center border transition-all ${
                activeStep === 3
                  ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}>
                <div className="text-[10px] font-mono font-bold uppercase">Passo 3</div>
                <div className="text-xs font-bold truncate">Levantamento e Ataque</div>
              </div>
            </div>

            {/* Barra de controle e reprodução */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF9F1C] hover:bg-[#F58F00] text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pausar animação' : 'Reproduzir animação'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>Reproduzir</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reiniciar animação"
                  aria-label="Reiniciar animação"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Barra de progresso do exercício */}
              <div className="flex-1 max-w-xs sm:max-w-sm flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF9F1C] via-emerald-400 to-[#FF4A3F] rounded-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {Math.round((progress / 100) * 6)}s / 6s
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. BENEFÍCIOS COMPLEMENTARES (3 CARDS CURTOS) */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto text-left">
        {/* Benefício 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DBC9] shadow-sm hover:border-[#0E4B75] hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0E4B75] flex items-center justify-center mb-3">
              <Footprints className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0E4B75] font-heading">
              Visualize os deslocamentos dos jogadores
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Veja com exatidão a posição inicial, os passos na areia e para onde cada atleta deve se mover em cada fase do treino.
            </p>
          </div>
        </div>

        {/* Benefício 2 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DBC9] shadow-sm hover:border-[#FF9F1C] hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#C26500] flex items-center justify-center mb-3">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0E4B75] font-heading">
              Entenda a trajetória da bola e a sequência
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Acompanhe o caminho exato do saque, manchete e levantamento em ação, sem ter que adivinhar setas estáticas no papel.
            </p>
          </div>
        </div>

        {/* Benefício 3 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DBC9] shadow-sm hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0E4B75] font-heading">
              Prepare sua próxima aula com mais clareza
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Basta olhar a animação por alguns segundos antes de entrar na quadra para aplicar o exercício com segurança e fluidez.
            </p>
          </div>
        </div>
      </div>

      {/* 5. FECHAMENTO DA SEÇÃO */}
      <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
        <p className="text-sm sm:text-base font-bold text-slate-800 bg-[#E8EFF5] py-3 px-5 rounded-2xl border border-[#CBDDEB] inline-block shadow-2xs">
          💡 <span className="text-[#0E4B75]">Menos tempo tentando decifrar diagramas estáticos:</span> mais clareza para planejar suas aulas e orientar seus alunos na areia.
        </p>
      </div>
    </section>
  );
};
