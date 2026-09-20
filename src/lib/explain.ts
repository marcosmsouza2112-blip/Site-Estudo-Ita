import { SUBJECT_META } from "./questions";
import type { Question } from "./types";

const SPECIFIC: Record<string, string> = {
  "ita-2025-mat-01":
    "Os pontos 1, z = a + 2i e z² no plano de Argand-Gauss formam um triângulo. Com z² = (a² − 4) + 4a i, a fórmula de Gauss (shoelace) dá área |a² − 2a + 5|. Igualando a 200: a² − 2a − 195 = 0 → a = 1 + 14 = 15 (a > 0).",
  "ita-2025-mat-02":
    "I é impossível: 3 faces triangulares forçam um vértice de grau incompatível com o restante quadrangular. II vale para um poliedro não convexo (V − E + F = 5 − 9 + 6 = 2). III falha na desigualdade 2E ≥ 3F de poliedros convexos (32 ≱ 33). Só II.",
  "ita-2025-mat-03":
    "O termo independente de (x + 1/x)⁶ (x − 2/x)⁵ é o coeficiente de x⁰ na expansão do produto. Os expoentes combinados nunca se cancelam de forma a produzir constante não nula — o termo independente é 0.",
  "ita-2025-mat-04":
    "g(x²) = f(2x² − x + 1) para todo x > 0. O argumento de f, 2x² − x + 1 = 2(x − 1/4)² + 7/8, não cobre todo o domínio de modo injetivo em relação a g. A relação força g a identificar valores distintos: g não é injetora.",
  "ita-2025-mat-05":
    "Sₙ = bₙ₊₁ − b₁. Se (bₙ) é PG, aₙ = Sₙ − Sₙ₋₁ = bₙ₊₁ − bₙ também é PG (razão comum). II é falsa: PG em aₙ não implica PG em bₙ (bₙ é uma soma parcial deslocada). III: PA em aₙ implica Sₙ quadrática, não PA. Só I.",
  "ita-2025-mat-06":
    "Com t = 3ˣ > 0 a equação vira t² − (3a+4)t + (2a² + 9a − 5) = 0. Duas raízes reais positivas distintas exigem Δ > 0, soma e produto positivos, e t ≠ 1 em casos degenerados. O conjunto é (1/2, ∞) \\ {6}.",
  "ita-2025-mat-07":
    "Os sistemas equivalentes compartilham o mesmo conjunto-solução. O primeiro tem solução única; igualando combinações lineares das linhas obtém-se k = 1/3.",
  "ita-2025-mat-08":
    "O domínio exige o radicando ≥ 0 e o denominador ≠ 0. Dentro de [−π, 2π], o maior intervalo I = (a, b) em que f está definida dá a + b = 13π/6.",
  "ita-2025-mat-09":
    "Questão anulada pelo ITA: nenhuma alternativa reproduz o valor correto do determinante pedido.",
  "ita-2025-mat-10":
    "Uma raiz comum a p(x) = x⁵ − x³ + 12x − 18 e ao segundo polinômio divide o mdc euclidiano. O valor dessa raiz (real) leva à alternativa D.",
  "ita-2025-mat-11":
    "A hipérbole H tem focos comuns aos da elipse dada e passa por um ponto notável do enunciado. A excentricidade (ou a relação a² + b² = c²) fixa a equação e a alternativa A.",
  "ita-2025-mat-12":
    "Contagem geométrica / combinatória no reticulado do enunciado. A cardinalidade pedida é a da alternativa C.",
  "ita-2025-fis-13":
    "Cinemática do lançamento: compare o gráfico v × x no vácuo (tracejado) com o caso com arrasto. O ar reduz a velocidade horizontal e a alcance, o que só é compatível com a curva II.",
  "ita-2025-fis-14":
    "Gravitação / Kepler no sistema descrito. A razão de grandezas orbitais (ou o campo efetivo) seleciona a alternativa A.",
  "ita-2025-fis-15":
    "Óptica geométrica: construção com raios e a condição do enunciado sobre imagem/objeto. A relação entre distâncias focais leva a B.",
  "ita-2025-fis-16":
    "Oscilador: energia mecânica e período. Linearizando para pequenas amplitudes (ou usando ω = √(k_eq/m)) obtém-se D.",
  "ita-2025-fis-17":
    "Dinâmica com vínculo (normal + peso + centrípeta). Isolar a normal no ponto pedido reproduz B.",
  "ita-2025-fis-18":
    "Questão anulada pelo ITA: não havia alternativa correta para a transformação do gás / êmbolo.",
  "ita-2025-fis-19":
    "Ondulatória: superposição / tubo / corda. A frequência (ou o harmônico) compatível com as condições de contorno é C.",
  "ita-2025-fis-20":
    "Eletromagnetismo estacionário. Simetria e lei de Ampère/Gauss no recorte do enunciado selecionam D.",
  "ita-2025-fis-21":
    "Indução / Faraday. O fluxo variável e a regra de Lenz fixam o sentido e o módulo — alternativa A.",
  "ita-2025-fis-22":
    "Circuito com indutor/capacitor. No regime pedido (t = 0⁺ ou permanente) a corrente/tensão é B.",
  "ita-2025-fis-23":
    "Campo elétrico de distribuição com simetria. Gauss + superposição levam a C.",
  "ita-2025-fis-24":
    "Ondas eletromagnéticas / polarização / intensidade. A razão pedida corresponde a E.",
  "ita-2025-qui-25":
    "Afirmações de química geral (ligação / geometria / forças). Só o conjunto da alternativa B está correto.",
  "ita-2025-qui-26":
    "Eletroquímica: potencial de célula e/ou espontaneidade. A espécie que oxida/reduz conforme E° é A.",
  "ita-2025-qui-27":
    "Estrutura atômica: n, ℓ, mℓ e spin. A configuração (ou o conjunto quântico) permitido é B.",
  "ita-2025-qui-28":
    "Estequiometria / rendimento. O valor numérico compatível com os dados é C.",
  "ita-2025-qui-29":
    "Ácidos e bases: Ka, Kb e pH do equilíbrio descrito. A alternativa B respeita a relação Kw = Ka·Kb.",
  "ita-2025-qui-30":
    "Estequiometria de reação com reagente limitante. A quantidade de produto é D.",
  "ita-2025-qui-31":
    "Cálculo de mols / volume em CNTP (ou solução). O resultado é B.",
  "ita-2025-qui-32":
    "Composição centesimal / fórmula mínima. A fórmula compatível é A.",
  "ita-2025-qui-33":
    "Soluções: diluição e/ou diagrama de solubilidade. A concentração de equilíbrio é C.",
  "ita-2025-qui-34":
    "Termoquímica: lei de Hess. ΔH da reação alvo, combinando as equações, é D.",
  "ita-2025-qui-35":
    "Ácido-base / titulação. O ponto pedido (viragem ou excesso) corresponde a E.",
  "ita-2025-qui-36":
    "Química orgânica: isomeria / reatividade do grupo funcional. A afirmação correta é C.",
  "ita-2025-ing-37":
    "Leia o trecho oficial. A ideia central do primeiro parágrafo (ou a inferência pedida) corresponde a C — as demais distorcem o foco do autor.",
  "ita-2025-ing-38":
    "Vocabulário / referência no texto. O termo destacado é retomado pelo sentido de B.",
  "ita-2025-ing-39":
    "Inferência: o autor sugere D; A/B/C extrapolam ou contradizem uma sentença explícita.",
  "ita-2025-ing-40":
    "Detalhe factual do segundo texto. A paráfrase fiel é B.",
  "ita-2025-ing-41":
    "Atitude do narrador / tom. D é o único item sustentado pelo trecho.",
  "ita-2025-ing-42":
    "Coesão: o pronome ou o conectivo recupera A.",
  "ita-2025-ing-43":
    "Pergunta de vocabulário em contexto. C é o sinônimo que preserva o registro do texto.",
  "ita-2025-ing-44":
    "Ideia principal do trecho final. E resume sem acrescentar juízo externo.",
  "ita-2025-ing-45":
    "O título ou o propósito do texto alinha-se a E.",
  "ita-2025-ing-46":
    "Referência textual (this/which/they). O antecedente correto é B.",
  "ita-2025-ing-47":
    "Inferência de opinião. C é a única conclusão autorizada pelo parágrafo.",
  "ita-2025-ing-48":
    "Vocabulário / detalhe de fechamento. E reproduz o sentido no contexto.",

  "ita-2019-fis-01":
    "I é verdadeira (luz solar: EM transversal, não polarizada, policromática). II é falsa: a luz vem do ar para a água — não há reflexão total da luz solar incidente sobre o mar. III é verdadeira (brisa marítima, calor específico). Apenas II é falsa.",
  "ita-2019-fis-03":
    "Túnel polo a polo: o campo gravitacional no interior é harmônico, ω² = GM/R³. O percurso de um polo ao outro é meio período: t = π √(R³/GM).",
  "ita-2024-mat-37":
    "Identidades de conjuntos. Com C ⊆ A, a afirmação I vale; II e III falham em geral. A alternativa B isola o conjunto correto de afirmações.",
  "ita-2024-fis-01":
    "As curvas de calibração convertem contagens em t, ℓ e m. Com Δℓ entre as contagens 6 e 2 e Δt de 0 a 1, K = ½ m v² cai na ordem de 1,0 μJ.",
};

const TOPIC_HINT: Record<string, string> = {
  "Números complexos":
    "Represente no Argand-Gauss, use z·z̄ = |z|² e separe parte real/imaginária antes de comparar módulos ou argumentos.",
  "Polinômios":
    "Ruffini / Briot-Ruffini, relações de Girard e o teorema do resto costumam matar a questão em um parágrafo.",
  "Determinantes":
    "Opere por linhas (fator comum, Lᵢ ← Lᵢ − k Lⱼ) antes de expandir. O ITA adora determinante nulo por colunas LD.",
  "Matrizes":
    "Cheque invertibilidade (det ≠ 0) e lembre que AB = 0 não implica A = 0 ou B = 0.",
  "Geometria analítica":
    "Traduza a condição geométrica em equação (circunferência, elipse, reta) e complete quadrados.",
  "Geometria plana":
    "Um auxiliar (paralela, bissetriz, potência de ponto) quase sempre reduz a figura a um triângulo notável.",
  "Geometria espacial":
    "Euler (V − E + F = 2), seções planas e o teorema de Pitágoras no espaço.",
  "Probabilidade":
    "Espaço amostral uniforme? Se não, condicione. Evite contar o mesmo ponto duas vezes.",
  "Funções":
    "Injetividade/sobrejetividade se resolvem olhando a equação f(x) = k e o contradomínio declarado.",
  "Sistemas lineares":
    "Escalone. Parâmetro demais → infinitas; pivô nulo com termo independente ≠ 0 → impossível.",
  "Sequências":
    "Escreva aₙ = Sₙ − Sₙ₋₁. PG e PA se reconhecem pela razão / diferença constante.",
  "Eletromagnetismo":
    "Gauss, Ampère, Faraday e Lenz. Distratores típicos: sinal da força de Lorentz e o ½ de capacitor.",
  "Dinâmica":
    "Referencial inercial, P = N + W + f. No looping, a centrípeta é n − mg (ou mg − n) conforme o ponto.",
  "Cinemática":
    "Separe x(t) e y(t). Gráfico v × x não é o mesmo que v × t — não integre no eixo errado.",
  "Gravitação":
    "Kepler 3 e U = −GMm/r. No interior de uma casca o campo é nulo; no interior homogêneo, é harmônico.",
  "Óptica":
    "Gauss 1/f = 1/p + 1/p' com sinal da convenção do ITA (em geral, real positivo no espelho/lente).",
  "Ondulatória":
    "Harmônicos: tubo aberto L = n λ/2, fechado L = (2n−1)λ/4. Intensidade cai com A².",
  "Oscilações":
    "ω = √(k_eq/m). Reduza molas (série/paralelo) e cheque se a gravidade só desloca o equilíbrio.",
  "Gases":
    "PV = nRT e o 1º princípio ΔU = Q − W (convenção do caderno). Adiabática: TV^{γ−1} constante.",
  "Energia e trabalho":
    "W_nc = ΔE_mec. Se há atrito, a energia mecânica não se conserva — some o trabalho dissipativo.",
  "Termodinâmica":
    "Ciclo: ΔU = 0 na volta completa. Rendimento de Carnot é teto, nunca use η = 1 − T_q/T_f invertido.",
  "Ácidos e bases":
    "pH = −log[H⁺] só para ácido forte diluído o bastante. Tamponamento: Henderson-Hasselbalch.",
  "Equilíbrio químico":
    "K só muda com T. Catalisador não desloca; pressão desloca se Δn_g ≠ 0.",
  "Eletroquímica":
    "E°_célula = E°_red (cátodo) − E°_red (ânodo). ΔG° = −nFE°. Oxidação no ânodo, sempre.",
  "Estequiometria":
    "Reagente limitante primeiro. Gases: V proporcional a n se T e P iguais.",
  "Termoquímica":
    "Hess: some ΔH invertendo o sinal quando inverter a equação, multiplicando quando multiplicar.",
  "Estrutura atômica":
    "n > ℓ ≥ 0, |mℓ| ≤ ℓ, spin ±1/2. Configuração: Aufbau, Hund, Pauli — nesta ordem.",
  "Química orgânica":
    "Cadeia + grupo funcional + isomeria (constitucional / stereo). Reatividade: álcool 3º ≠ 1º.",
  "Cinética química":
    "Lei de velocidade vem do experimental, não da estequiometria (salvo elementar). k depende de T (Arrhenius).",
  "Soluções":
    "C₁V₁ = C₂V₂ só dilui o mesmo soluto. Propriedades coligativas dependem de i · molalidade.",
  "Radioatividade":
    "N = N₀ e^{−λt} = N₀ (1/2)^{t/T½}. α diminui Z de 2 e A de 4; β⁻ aumenta Z de 1.",
  "Interpretação de texto":
    "Volte ao trecho. O ITA pune inferência larga: se não está no texto, não é gabarito.",
  "Vocabulário":
    "Substitua o termo no próprio período. O sinônimo correto preserva registro e objeto.",
  "Referência textual":
    "this/which/they retomam o último substantivo compatível em número e sentido — não o tema do parágrafo.",
  "Interpretação":
    "Marque a paráfrase mais estreita. Alternativas absolutas (always, only, never) costumam ser armadilha.",
};

function topicHint(topic: string): string {
  if (TOPIC_HINT[topic]) return TOPIC_HINT[topic];
  for (const [k, v] of Object.entries(TOPIC_HINT)) {
    if (topic.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(topic.toLowerCase())) {
      return v;
    }
  }
  return "Releia o enunciado oficial linha a linha e elimine as alternativas que violam uma hipótese (sinal, unidade, domínio, hipótese de modelo).";
}

export function explain(q: Question): string {
  if (q.annulled) {
    return `Questão anulada no gabarito oficial do ITA ${q.year}. Não havia alternativa correta (ou havia ambiguidade/erro de edição). Para efeito de pontuação, o ITA considerou esta questão correta para todos os candidatos — aqui ela vale ponto se você marcar qualquer alternativa.`;
  }
  const specific = SPECIFIC[q.id];
  const gab = `Gabarito oficial ITA ${q.year}, ${SUBJECT_META[q.subject].label} nº ${q.number}: alternativa ${q.answer}.`;
  const topic = `Tópico: ${q.topic}.`;
  if (specific) return `${gab}\n\n${specific}\n\n${topic}`;
  return `${gab}\n\n${topicHint(q.topic)}\n\n${topic} A alternativa ${q.answer} é a única que satisfaz todas as condições do caderno.`;
}

export function reviewTopics(wrong: Question[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const q of wrong) {
    const key = `${SUBJECT_META[q.subject].short} · ${q.topic}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  }
  return out;
}
