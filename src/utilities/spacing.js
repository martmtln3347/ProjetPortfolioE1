// 🧰 Utilitaires : Spacing

export function spacingUtilities(theme) {
  const { layout } = theme;
  const breakpoints = layout.breakpoints || {};

  const spacingLines = [];

  for (let i = 0; i <= 5; i++) {
    const mult = i.toFixed(1).replace('.0', '');
    spacingLines.push(`.mt-${i} { margin-top: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.mb-${i} { margin-bottom: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.ml-${i} { margin-left: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.mr-${i} { margin-right: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.pt-${i} { padding-top: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.pb-${i} { padding-bottom: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.pl-${i} { padding-left: calc(var(--base-unit) * ${mult}); }`);
    spacingLines.push(`.pr-${i} { padding-right: calc(var(--base-unit) * ${mult}); }`);
  }

  const responsiveSpacing = [];

  Object.entries(breakpoints).forEach(([prefix, size]) => {
    const rules = [];
    for (let i = 0; i <= 5; i++) {
      const mult = i.toFixed(1).replace('.0', '');
      rules.push(`\t.${prefix}\\:mt-${i} { margin-top: calc(var(--base-unit) * ${mult}); }`);
      rules.push(`\t.${prefix}\\:mb-${i} { margin-bottom: calc(var(--base-unit) * ${mult}); }`);
    }
    responsiveSpacing.push(
      `@media (min-width: ${size}) {\n${rules.join('\n')}\n}`
    );
  });

  return `/* 🧰 Utilitaires : Spacing */

${spacingLines.join('\n')}

/* Variantes responsives pour les marges verticales */
${responsiveSpacing.join('\n\n')}`;
}
