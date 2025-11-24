// 🎨 Génération du thème (variables CSS globales + dark mode)

import { createColorVariants } from './colorUtils.js';

export function buildTheme(theme, darkMode) {
  const { colors, spacing, typography, layout, transition } = theme;

  const colorLines = [];
  const darkModeLines = [];

  Object.entries(colors).forEach(([name, hex]) => {
    const { base, light, dark } = createColorVariants(name, hex);

    colorLines.push(`\t--${name}: ${base};`);
    colorLines.push(`\t--${name}-light: ${light};`);
    colorLines.push(`\t--${name}-dark: ${dark};`);

    if (darkMode) {
      darkModeLines.push(`\t--${name}: ${dark};`);
      darkModeLines.push(`\t--${name}-light: ${base};`);
      darkModeLines.push(`\t--${name}-dark: ${light};`);
    }
  });

  const rootVars = [
    '/* ⚙️ Variables globales générées à partir du thème Plugo */',
    ':root {',
    `\t--typography-main: ${typography.main};`,
    `\t--typography-headlines: ${typography.headlines};`,
    `\t--base-unit: ${spacing.baseUnit};`,
    `\t--ratio-line-height: ${spacing.ratioLineHeight};`,
    `\t--max-width: ${layout.container};`,
    `\t--transition-duration: ${transition.duration};`,
    `\t--transition-type: ${transition.type};`,
    ...colorLines,
    '}'
  ].join('\n');

  const resetBase = [
    '/* 🔄 Reset & base (inspiré du microframework) */',
    ':root {',
    '\t--background-color: #f4f4f5;',
    '\t--text-color: #111827;',
    '}',
    darkMode
      ? [
          '.dark-mode {',
          '\t--background-color: #111827;',
          '\t--text-color: #f9fafb;',
          ...darkModeLines,
          '}'
        ].join('\n')
      : '',
    '',
    '::selection {',
    '\tbackground-color: var(--primary);',
    '\tcolor: #ffffff;',
    '}',
    '',
    '*, *::before, *::after {',
    '\tbox-sizing: border-box;',
    '\tmargin: 0;',
    '\tpadding: 0;',
    '\tfont-family: var(--typography-main), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
    '\ttransition: all var(--transition-type) var(--transition-duration);',
    '\tappearance: none;',
    '}',
    '',
    'html {',
    '\tscroll-behavior: smooth;',
    '}',
    '',
    'body {',
    '\tmin-height: 100vh;',
    '\tbackground-color: var(--background-color);',
    '\tcolor: var(--text-color);',
    '\tfont-size: var(--base-unit);',
    '}'
  ].join('\n');

  return `/* ===============================
   🎨 SECTION : THÈME & VARIABLES
   - Couleurs
   - Typographie
   - Layout de base
   - Reset
   =============================== */\n\n${rootVars}\n\n${resetBase}`;
}
