// 🧱 Composant : Button

export function buttonComponent() {
  return `/* 🧱 Composant : Button */

:root {
\t--btn-bg: var(--dark-2, #111827);
\t--btn-color: #ffffff;
}

.dark-mode {
\t--btn-bg: var(--light-2, #e5e7eb);
\t--btn-color: #111827;
}

.btn {
\tdisplay: inline-block;
\tborder-radius: calc(var(--base-unit) / 4);
\tbackground-color: var(--btn-bg);
\tcolor: var(--btn-color);
\tpadding: calc(var(--base-unit) * 0.5) calc(var(--base-unit));
\tborder: none;
\tcursor: pointer;
\tfont-weight: 600;
\ttext-align: center;
}

.btn:hover {
\tfilter: brightness(1.05);
\ttransform: translateY(-1px);
}

.btn.is-primary { background-color: var(--primary); color: #fff; }
.btn.is-success { background-color: var(--success); color: #111; }
.btn.is-warning { background-color: var(--warning); color: #111; }
.btn.is-danger  { background-color: var(--danger);  color: #fff; }`;
}
