// 🧰 Agrégation des utilitaires

import { flexUtilities } from './flex.js';
import { spacingUtilities } from './spacing.js';
import { colorUtilities } from './color.js';
import { imageUtilities } from './image.js';

export function buildUtilities(theme, utilities) {
  const chunks = [];

  if (utilities.includes('flex')) {
    chunks.push(flexUtilities());
  }

  if (utilities.includes('spacing')) {
    chunks.push(spacingUtilities(theme));
  }

  if (utilities.includes('color')) {
    chunks.push(colorUtilities(theme));
  }

  if (utilities.includes('image')) {
    chunks.push(imageUtilities());
  }

  if (!chunks.length) {
    return `/* Aucun utilitaire généré (liste "utilities" vide dans plugo.config.js) */`;
  }

  return `/* ===============================
   🧰 SECTION : UTILITAIRES
   =============================== */

${chunks.join('\n\n')}`;
}
