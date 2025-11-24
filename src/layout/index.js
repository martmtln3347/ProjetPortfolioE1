// 📐 Génération du layout (container + grille responsive)

export function buildLayout(theme) {
  const { layout } = theme;
  const cols = layout.cols || 12;
  const breakpoints = layout.breakpoints || {};

  const gridLines = [];
  for (let i = 1; i <= cols; i++) {
    gridLines.push(`.grid-${i} { grid-template-columns: repeat(${i}, 1fr); }`);
  }

  const colLines = [];
  for (let i = 1; i <= cols; i++) {
    colLines.push(`.col-${i} { grid-column: span ${i}; }`);
  }

  const responsiveLines = [];

  Object.entries(breakpoints).forEach(([prefix, size]) => {
    const rules = [];
    for (let i = 1; i <= cols; i++) {
      rules.push(`\t.${prefix}\\:col-${i} { grid-column: span ${i}; }`);
    }
    responsiveLines.push(
      `@media (min-width: ${size}) {\n${rules.join('\n')}\n}`
    );
  });

  return `/* ===============================
   📐 SECTION : LAYOUT
   - Container
   - Grille CSS
   - Colonnes responsives
   =============================== */

.container-full {
\tpadding: calc(var(--base-unit) * 2) var(--base-unit);
}

.container {
\tpadding: calc(var(--base-unit) * 2) var(--base-unit);
\tmax-width: var(--max-width);
\tmargin: 0 auto;
}

[class*="grid-"] {
\tdisplay: grid;
\tgap: calc(var(--base-unit));
}

${gridLines.join('\n')}

${colLines.join('\n')}

/* Variantes responsives basées sur layout.breakpoints */
${responsiveLines.join('\n\n')}`;
}
