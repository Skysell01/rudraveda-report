import { CustomerDetails, ReportType } from '../../types/report';
import { AstrologyData } from '../../integrations/prokerala/prokerala.types';
import { ClaudeReportContent } from '../../integrations/anthropic/anthropic.types';
import { getModularReportConfig } from '../../reports/configs';
import { printStyles } from '../styles/printStyles';
import { renderCoverPage } from '../components/cover';
import { renderTableOfContents } from '../components/tableOfContents';
import { renderNatalChartSection } from '../components/chartComponent';
import { renderInsightBox } from '../components/insightBoxComponent';
import { renderLuckyCards } from '../components/luckyCardsComponent';
import { renderRemedyCards } from '../components/remedyCardsComponent';
import { renderDisclaimer } from '../components/footerComponent';

export function buildFullReportHtml(
  reportType: ReportType,
  customer: CustomerDetails,
  astrologyData: AstrologyData,
  claudeContent: ClaudeReportContent
): string {
  const modularConfig = getModularReportConfig(reportType);
  const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Render cover page
  const coverHtml = renderCoverPage(claudeContent.reportTitle || modularConfig.title, modularConfig.subtitle, customer, generatedDate);

  // Render Table of Contents
  const tocHtml = renderTableOfContents(modularConfig.sections);

  // Render Natal Chart section for Section 5 / Natal Chart
  const chartHtml = renderNatalChartSection(astrologyData.ascendant?.rashi || 'Mesha', astrologyData.planetaryPositions);

  // Render Sections
  const sectionsHtml = (claudeContent.sections || []).map((sec, idx) => {
    const isChartSection = sec.id.includes('natal') || sec.id.includes('chart');
    const bulletHtml = sec.bulletPoints ? `
      <ul>
        ${sec.bulletPoints.map(b => `<li>${b}</li>`).join('')}
      </ul>
    ` : '';

    const tablesHtml = sec.tables ? sec.tables.map(tbl => `
      <table>
        <thead>
          <tr>${tbl.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${tbl.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `).join('') : '';

    const highlightHtml = sec.highlights ? sec.highlights.map(h => renderInsightBox('Cosmic Focus', h)).join('') : '';

    return `
      <div class="page-break">
        <div class="section-header">
          <span class="section-badge">SECTION ${idx + 1} OF ${claudeContent.sections.length}</span>
          <h2>${sec.title}</h2>
        </div>
        <div>
          <p>${sec.content}</p>
        </div>
        ${isChartSection ? chartHtml : ''}
        ${bulletHtml}
        ${tablesHtml}
        ${highlightHtml}
      </div>
    `;
  }).join('');

  // Render Lucky Cards & Remedies
  const luckyHtml = renderLuckyCards(
    claudeContent.luckyDays,
    claudeContent.luckyNumbers,
    claudeContent.luckyColors,
    claudeContent.favorablePeriods
  );

  const remediesHtml = renderRemedyCards(claudeContent.remedies);
  const disclaimerHtml = renderDisclaimer();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${claudeContent.reportTitle || modularConfig.title}</title>
      <style>
        ${printStyles}
      </style>
    </head>
    <body>
      ${coverHtml}
      ${tocHtml}
      ${sectionsHtml}

      <div class="page-break">
        <div class="section-header">
          <span class="section-badge">REMEDIES & LUCKY HORIZON</span>
          <h2>Auspicious Factors & Planetary Remedies</h2>
        </div>
        ${luckyHtml}
        <h3>Prescribed Vedic Remedies</h3>
        ${remediesHtml}
      </div>

      <div class="page-break">
        <div class="section-header">
          <span class="section-badge">CONCLUSION</span>
          <h2>Personalized Astrological Conclusion</h2>
        </div>
        <p>${claudeContent.conclusion || 'May the cosmic celestial energies guide your path towards fulfillment and peace.'}</p>
        ${disclaimerHtml}
      </div>
    </body>
    </html>
  `;
}
