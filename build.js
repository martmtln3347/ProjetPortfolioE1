import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import { buildTheme } from './src/theme/index.js';
import { buildTypography } from './src/typography/index.js';
import { buildLayout } from './src/layout/index.js';
import { buildComponents } from './src/components/index.js';
import { buildUtilities } from './src/utilities/index.js';
import { buildReport } from './src/report/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const CSS_FILE = path.join(DIST_DIR, 'plugo.css');
const CSS_MIN_FILE = path.join(DIST_DIR, 'plugo.min.css');

async function runBuild() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  let config;
  try {
    const configPath = path.resolve(process.cwd(), 'plugo.config.js');
    const configModule = await import(configPath);
    config = configModule.default;
  } catch (e) {
    console.error("⚠️ Impossible de charger 'plugo.config.js'. Assurez-vous d'être à la racine du projet.");
    process.exit(1);
  }

  const { theme, components, utilities, darkMode } = config;

  const themeCSS = buildTheme(theme, darkMode);
  const typographyCSS = buildTypography(theme);
  const layoutCSS = buildLayout(theme);
  const componentsCSS = buildComponents(theme, components || []);
  const utilitiesCSS = buildUtilities(theme, utilities || []);

  const banner = `/* 🎨 Plugo CSS Framework
  - Généré automatiquement à partir de plugo.config.js
  - Ne modifiez pas ce fichier directement : éditez la config puis relancez npm run build
*/\n\n`;

  const finalCSS = [
    banner,
    themeCSS,
    typographyCSS,
    layoutCSS,
    componentsCSS,
    utilitiesCSS
  ].join('\n\n');

  console.log('⚙️  Traitement du CSS (Autoprefixer)...');
  const prefixedResult = await postcss([autoprefixer]).process(finalCSS, {
    from: undefined
  });
  
  fs.writeFileSync(CSS_FILE, prefixedResult.css, 'utf-8');

  console.log('📦 Minification (CSSNano)...');
  const minifiedResult = await postcss([cssnano()]).process(prefixedResult.css, {
    from: undefined
  });
  
  fs.writeFileSync(CSS_MIN_FILE, minifiedResult.css, 'utf-8');

  const report = buildReport({
    cssPath: CSS_FILE,
    cssMinPath: CSS_MIN_FILE,
    rawCSS: finalCSS
  });

  console.log('✅ Build terminé !');
  console.log(report);
}

runBuild().catch((err) => {
  console.error('❌ Erreur pendant le build Plugo :', err);
  process.exit(1);
});