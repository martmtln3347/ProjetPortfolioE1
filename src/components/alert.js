// 🧱 Composant : Alert

export function alertComponent() {
  return `/* 🧱 Composant : Alert */

.alert {
\tpadding: calc(var(--base-unit)) calc(var(--base-unit) * 1.25);
\tborder-radius: calc(var(--base-unit) / 3);
\tborder-width: 1px;
\tborder-style: solid;
\tmargin-bottom: calc(var(--base-unit));
}

.alert--primary {
\tbackground-color: var(--primary-light);
\tborder-color: var(--primary);
\tcolor: #111827;
}

.alert--success {
\tbackground-color: var(--success-light);
\tborder-color: var(--success);
\tcolor: #064e3b;
}

.alert--warning {
\tbackground-color: var(--warning-light);
\tborder-color: var(--warning);
\tcolor: #92400e;
}

.alert--danger {
\tbackground-color: var(--danger-light);
\tborder-color: var(--danger);
\tcolor: #7f1d1d;
}`;
}
