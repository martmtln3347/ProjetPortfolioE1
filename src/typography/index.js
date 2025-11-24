// 🖋️ Génération de la typographie globale (paragraphes + titres)

export function buildTypography(theme) {
  const { spacing } = theme;
  const ratio = spacing.ratioLineHeight || '1.25';

  return `/* ===============================
   🖋️ SECTION : TYPOGRAPHIE
   - Body
   - Titres h1 → h6
   =============================== */

p {
\tfont-size: var(--base-unit);
\tline-height: calc(var(--base-unit) * ${ratio});
\tfont-weight: 400;
\tmargin-bottom: calc(var(--base-unit) * 1);
}

a {
\tcolor: var(--primary);
\ttext-decoration: none;
}

a:hover {
\ttext-decoration: underline;
}

/* Titres avec typographie dédiée */

h1, h2, h3, h4, h5, h6 {
\tfont-family: var(--typography-headlines), var(--typography-main);
\tline-height: calc(${ratio} * 100%);
\tmargin-bottom: calc(var(--base-unit) * 0.75);
}

h1 { font-size: calc(var(--base-unit) * 3); font-weight: 900; }
h2 { font-size: calc(var(--base-unit) * 2.25); font-weight: 800; }
h3 { font-size: calc(var(--base-unit) * 1.75); font-weight: 700; }
h4 { font-size: calc(var(--base-unit) * 1.5); font-weight: 600; }
h5 { font-size: calc(var(--base-unit) * 1.25); font-weight: 600; }
h6 { font-size: calc(var(--base-unit) * 1.1); font-weight: 500; }`;
}
