// 🧰 Utilitaires : Couleurs

export function colorUtilities(theme) {
  const { colors } = theme;

  const textColorLines = [];
  const bgColorLines = [];

  Object.keys(colors).forEach((name) => {
    textColorLines.push(`.text-${name} { color: var(--${name}); }`);
    textColorLines.push(`.text-${name}-light { color: var(--${name}-light); }`);
    textColorLines.push(`.text-${name}-dark { color: var(--${name}-dark); }`);

    bgColorLines.push(`.bg-${name} { background-color: var(--${name}); }`);
    bgColorLines.push(`.bg-${name}-light { background-color: var(--${name}-light); }`);
    bgColorLines.push(`.bg-${name}-dark { background-color: var(--${name}-dark); }`);
  });

  return `/* 🧰 Utilitaires : Couleurs */

${textColorLines.join('\n')}

${bgColorLines.join('\n')}`;
}
