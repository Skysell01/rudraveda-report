import { AIInterpretation, CustomerDetails, ProkeralaMatchingResponse } from '../types/report';
import { getBaseCss } from './base.layout';

export function renderKundaliMatchingTemplate(
  boy: CustomerDetails,
  girl: CustomerDetails,
  matching: ProkeralaMatchingResponse,
  ai: AIInterpretation
): string {
  const css = getBaseCss();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Kundali Matching - ${boy.name} & ${girl.name}</title>
      <style>${css}</style>
    </head>
    <body>
      <!-- COVER PAGE -->
      <div class="page cover-page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="cover-header">
          <div class="brand-logo">
            <span style="font-size: 36px; color: #FFFFFF;">❤️</span>
          </div>
          <h1 class="brand-name">RUDRAVEDA</h1>
          <div class="brand-tagline">Vedic Matrimonial Compatibility</div>
        </div>

        <div class="cover-title-container">
          <h2 class="cover-report-type">KUNDALI MATCHING & GUNA MILAN REPORT</h2>
          <div class="cover-subtitle">Ashtakoota & Planetary Compatibility Analysis</div>
          <div class="cover-badge">${matching.obtainedPoints} / 36 POINTS (${matching.compatibilityPercentage}% MATCH)</div>
        </div>

        <div class="grid-2" style="width: 100%; max-width: 500px; margin: 0 auto;">
          <div class="cover-details-card" style="padding: 15px;">
            <div style="font-weight: 700; color: #FDE68A; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px;">GROOM DETAILS</div>
            <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${boy.name}</span></div>
            <div class="detail-row"><span class="detail-label">DOB:</span><span class="detail-value">${boy.dob}</span></div>
            <div class="detail-row"><span class="detail-label">TOB:</span><span class="detail-value">${boy.tob}</span></div>
            <div class="detail-row"><span class="detail-label">Place:</span><span class="detail-value">${boy.location.name}</span></div>
          </div>
          <div class="cover-details-card" style="padding: 15px;">
            <div style="font-weight: 700; color: #FDE68A; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px;">BRIDE DETAILS</div>
            <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${girl.name}</span></div>
            <div class="detail-row"><span class="detail-label">DOB:</span><span class="detail-value">${girl.dob}</span></div>
            <div class="detail-row"><span class="detail-label">TOB:</span><span class="detail-value">${girl.tob}</span></div>
            <div class="detail-row"><span class="detail-label">Place:</span><span class="detail-value">${girl.location.name}</span></div>
          </div>
        </div>

        <div class="cover-footer">
          Generated via Rudraveda Matrimonial Intelligence • Confidential
        </div>
      </div>

      <!-- PAGE 2: ASHTAKOOTA BREAKDOWN & AI COMPATIBILITY -->
      <div class="page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="header-bar">
          <div>
            <div class="header-title">ASHTAKOOTA GUNA MILAN BREAKDOWN</div>
            <div class="header-subtitle">${boy.name} & ${girl.name}</div>
          </div>
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #D4AF37;">RUDRAVEDA</div>
        </div>

        <h2 class="section-title">Guna Milan Point Score Summary</h2>
        <div class="info-card" style="background: #FFFDF5; border-left: 4px solid #D4AF37;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #1E1B4B;">Total Obtained Score: ${matching.obtainedPoints} / 36</div>
              <div style="font-size: 13px; color: #64748B;">Compatibility Percentage: ${matching.compatibilityPercentage}%</div>
            </div>
            <div>
              ${matching.obtainedPoints >= 24 
                ? '<span class="badge-success" style="font-size: 14px; padding: 6px 14px;">EXCELLENT MATCH</span>'
                : matching.obtainedPoints >= 18
                ? '<span class="badge-warning" style="font-size: 14px; padding: 6px 14px;">GOOD MATCH</span>'
                : '<span class="badge-warning" style="font-size: 14px; padding: 6px 14px;">MODERATE MATCH</span>'}
            </div>
          </div>
        </div>

        <h2 class="section-title">8 Koota Detailed Breakdown</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>Koota Factor</th>
              <th>Maximum Points</th>
              <th>Obtained Points</th>
              <th>Analysis & Significance</th>
            </tr>
          </thead>
          <tbody>
            ${matching.kootaDetails.map(k => `
              <tr>
                <td><strong>${k.name}</strong></td>
                <td>${k.maxPoints}</td>
                <td><strong style="color: ${k.obtainedPoints === k.maxPoints ? '#166534' : '#B45309'}">${k.obtainedPoints}</strong></td>
                <td>${k.description}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2 class="section-title">Vedic AI Marital Assessment</h2>
        <p style="font-size: 13px; color: #334155; line-height: 1.6; text-align: justify; margin-bottom: 15px;">
          ${ai.overview}
        </p>

        <div class="grid-2">
          <div class="info-card">
            <div class="info-card-title">💬 Communication & Mind Alignment</div>
            <div class="info-card-body">${ai.personalityAndMind}</div>
          </div>
          <div class="info-card">
            <div class="info-card-title">🏡 Domestic Prosperity & Wealth</div>
            <div class="info-card-body">${ai.careerAndWealth}</div>
          </div>
        </div>

        <h2 class="section-title">Harmonizing Matrimonial Remedies</h2>
        <div class="grid-2">
          ${ai.planetaryRemedies.map(r => `
            <div class="remedy-card">
              <div class="remedy-category">${r.category} Remedy</div>
              <div class="remedy-name">${r.remedy}</div>
              <div class="remedy-instruction">${r.instructions}</div>
            </div>
          `).join('')}
        </div>

        <div class="footer-bar">
          <span>Rudraveda Matrimonial Compatibility • No Database Confidential Print</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </body>
    </html>
  `;
}
