import { RemedyItem } from '../../integrations/anthropic/anthropic.types';

export function renderRemedyCards(remedies: RemedyItem[]): string {
  const cards = (remedies || []).map(r => `
    <div class="remedy-card">
      <div class="remedy-category">${r.category || 'VEDIC REMEDY'}</div>
      <div class="remedy-title">${r.title}</div>
      <div class="remedy-desc">${r.description}</div>
      <div class="remedy-instructions">✨ Instructions: ${r.instructions}</div>
    </div>
  `).join('');

  return `
    <div class="remedies-grid">
      ${cards}
    </div>
  `;
}
