// 🧰 Utilitaires : Flex

export function flexUtilities() {
  return `/* 🧰 Utilitaires : Flex */

.flex { display: flex; }
.inline-flex { display: inline-flex; }

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }

.items-center { align-items: center; }
.items-start  { align-items: flex-start; }
.items-end    { align-items: flex-end; }

.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around  { justify-content: space-around; }`;
}
