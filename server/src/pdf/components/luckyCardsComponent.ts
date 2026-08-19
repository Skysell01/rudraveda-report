export function renderLuckyCards(
  luckyDays: string[],
  luckyNumbers: number[],
  luckyColors: string[],
  favorablePeriods: string[]
): string {
  return `
    <div class="lucky-grid">
      <div class="lucky-card">
        <div class="lucky-label">🗓️ Lucky Days</div>
        <div class="lucky-value">${(luckyDays || ['Thursday', 'Friday']).join(', ')}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-label">🔢 Lucky Numbers</div>
        <div class="lucky-value">${(luckyNumbers || [7, 3, 9]).join(', ')}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-label">🎨 Lucky Colors</div>
        <div class="lucky-value">${(luckyColors || ['Yellow', 'Royal Blue']).join(', ')}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-label">🌟 Favorable Periods</div>
        <div class="lucky-value">${(favorablePeriods || ['Q1', 'Q4']).slice(0, 2).join(' | ')}</div>
      </div>
    </div>
  `;
}
