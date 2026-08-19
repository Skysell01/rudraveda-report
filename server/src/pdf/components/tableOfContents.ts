import { ReportSectionBlueprint } from '../../reports/configs/types';

export function renderTableOfContents(sections: ReportSectionBlueprint[]): string {
  const items = sections.map((s, idx) => `
    <div class="toc-item">
      <span class="toc-title">${idx + 1}. ${s.title} (${s.subtitle})</span>
      <span class="toc-dots"></span>
      <span style="font-weight: 600; color: #64748B;">Page ${idx + 3}</span>
    </div>
  `).join('');

  return `
    <div class="page-break">
      <div class="section-header">
        <span class="section-badge">NAVIGATION</span>
        <h2>Table of Contents</h2>
      </div>
      <div class="toc-container">
        ${items}
      </div>
    </div>
  `;
}
