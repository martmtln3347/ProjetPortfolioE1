// 🧱 Composant : Card

export function cardComponent() {
  return `/* 🧱 Composant : Card */

.card {
\tbackground-color: rgba(255, 255, 255, 0.9);
\tborder-radius: calc(var(--base-unit) / 2);
\tbox-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
\tpadding: calc(var(--base-unit) * 1.5);
}

.dark-mode .card {
\tbackground-color: rgba(15, 23, 42, 0.95);
\tcolor: var(--text-color);
}

.card__header {
\tmargin-bottom: calc(var(--base-unit));
\tfont-weight: 600;
\tfont-size: calc(var(--base-unit) * 1.25);
}

.card__footer {
\tmargin-top: calc(var(--base-unit));
\tfont-size: 0.9em;
\topacity: 0.8;
}`;
}
