// 🧱 Agrégation des composants

import { buttonComponent } from './button.js';
import { cardComponent } from './card.js';
import { alertComponent } from './alert.js';

export function buildComponents(theme, components) {
  const chunks = [];

  if (components.includes('button')) {
    chunks.push(buttonComponent(theme));
  }

  if (components.includes('card')) {
    chunks.push(cardComponent(theme));
  }

  if (components.includes('alert')) {
    chunks.push(alertComponent(theme));
  }

  if (!chunks.length) {
    return `/* Aucun composant généré (liste "components" vide dans plugo.config.js) */`;
  }

  return `/* ===============================
   🧱 SECTION : COMPOSANTS
   =============================== */

${chunks.join('\n\n')}`;
}
