# Moacyr Kennedy — Portfolio

Landing page de portfólio para engenheiro de software fullstack. Direção visual *editorial/studio*: tipografia gigante, acentos serifados, paleta paper/ink com acento vermelho, e animações dirigidas por scroll.

## Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | **Astro** | Zero JS por padrão, HTML primeiro. Página estática ultraleve com islands opcionais para interatividade futura. Pesando menos que Next.js para este formato |
| Animações | **GSAP + ScrollTrigger** | Padrão da indústria para motion no web. Controle por timeline, eases refinados e scroll-driven animation (troca de telas do telefone) |
| Scroll suave | **Lenis** | Easing premium síncronizado ao `gsap.ticker`, o "feel de estúdio" |
| Estilo | **CSS customizado** | Design system próprio em `global.css` (tokens, clamp typography, grão via feTurbulence). Sem Tailwind para evitar o visual genérico de templates |
| Fontes | **Syne + Instrument Serif + Space Grotesk** | Syne para títulos oversized, Instrument Serif itálica para acentos editoriais, Space Grotesk para micro-labels |
| Imagens | **SVG inline placeholders** | Placeholders leves já na paleta do site; trocar por screenshots reais quando disponíveis |

## Estrutura

```
public/
  screens/        telas do app (home, comprovante, cursos)
  projects/       cards dos projetos (Conecta, GRM, Controplan)
  curriculo.pdf   currículo baixável
src/
  pages/index.astro    landing page (hero, projeto, timeline, stack, contato)
  styles/global.css    design system + todos os estilos
  scripts/main.js      Lenis + GSAP (reveals, pin do telefone, contadores)
```

## Decisões conscientes (anti-"vibe code")

- Sem Next.js — página estática não precisa de runtime React pesado
- Sem Tailwind — art direction própria em vez de classes utilitárias genéricas
- Sem Three.js — "wow" via scroll do telefone, não 3D pesado
- Sem Framer Motion — React-first, desnecessário sem React
- Acento editorial vs dark-terminal/brutalist — a direção que mais transmite confiança para vender solução tecnológica

## Comandos

```bash
npm install          # instalar dependências
npx astro dev --background   # dev server em background (http://localhost:4321)
npx astro dev stop   # parar o server
npx astro dev status # status do server
npx astro dev logs   # logs do server
npm run build        # build estático em dist/
npm run preview      # pré-visualizar o build
```

## SEO

- JSON-LD schema `Person` no head
- Open Graph para compartilhamento
- `<html lang="pt-BR">`

## Roadmap

- [ ] Substituir SVG placeholders por screenshots reais dos apps
- [ ] Deploy na Vercel com domínio próprio
- [ ] Versão dark/light automática