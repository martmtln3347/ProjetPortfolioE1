// 📊 Génération d'un petit rapport de build

import fs from 'node:fs';

export function buildReport({ cssPath, cssMinPath, rawCSS }) {
  const cssStats = fs.statSync(cssPath);
  const cssMinStats = fs.statSync(cssMinPath);

  const classMatches = rawCSS.match(/\.[a-zA-Z0-9_\-\\:]+/g) || [];
  const uniqueClasses = new Set(classMatches);

  return [
    '📊 Rapport de build Plugo',
    '----------------------------------',
    `Nombre de classes générées (approx.) : ${uniqueClasses.size}`,
    `Taille plugo.css : ${(cssStats.size / 1024).toFixed(2)} Ko`,
    `Taille plugo.min.css : ${(cssMinStats.size / 1024).toFixed(2)} Ko`,
    '----------------------------------'
  ].join('\n');
}
