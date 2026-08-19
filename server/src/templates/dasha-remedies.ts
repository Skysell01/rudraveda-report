import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse } from '../types/report';
import { getBaseCss } from './base.layout';

export function renderDashaRemediesTemplate(
  customer: CustomerDetails,
  astrology: ProkeralaKundliResponse,
  ai: AIInterpretation
): string {
  const css = getBaseCss();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Dasha & Remedies - ${customer.name}</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="page cover-page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div><div class="corner corner-br"></div>

        <div class="cover-header">
          <div class="brand-logo"><span style="font-size: 36px; color: #FFFFFF;">⚡</span></div>
          <h1 class="brand-name">RUDRAVEDA</h1>
          <div class="brand-tagline">Vedic Timing & Remedial Sciences</div>
        </div>

        <div class="cover-title-container">
          <h2 class="cover-report-type">DASHA PERIODS & PLANETARY REMEDIES</h2>
          <div class="cover-subtitle">Vimshottari Dasha Analysis, Mantras, Gemstones & Astrological Mitigations</div>
          <div class="cover-badge">SPECIALIZED REMEDIAL GUIDE</div>
        </div>

        <div class="cover-details-card">
          <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${customer.name}</span></div>
          <div class="detail-row"><span class="detail-label">DOB / TOB:</span><span class="detail-value">${customer.dob} @ ${customer.tob}</span></div>
          <div class="detail-row"><span class="detail-label">Place:</span><span class="detail-value">${customer.location.name}</span></div>
          <div class="detail-row"><span class="detail-label">Moon Nakshatra:</span><span class="detail-value">${astrology.nakshatraDetails.nakshatra} (Lord: ${astrology.nakshatraDetails.nakshatraLord})</span></div>
        </div>

        <div class="cover-footer">Rudraveda Intelligence Engine • Strictly Confidential</div>
      </div>

      <div class="page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div><div class="corner corner-br"></div>

        <div class="header-bar">
          <div>
            <div class="header-title">VIMSHOTTARI DASHA TIMELINE</div>
            <div class="header-subtitle">Subject: ${customer.name}</div>
          </div>
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #D4AF37;">RUDRAVEDA</div>
        </div>

        <h2 class="section-title">Current & Upcoming Dasha Periods</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>Mahadasha</th>
              <th>Antardasha</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${astrology.dashaPeriods.map((d, idx) => `
              <tr>
                <td><strong>${d.currentDasha}</strong></td>
                <td>${d.currentAntardasha}</td>
                <td>${d.startDate}</td>
                <td>${d.endDate}</td>
                <td>${idx === 0 ? '<span class="badge-success">ACTIVE MAHADASHA</span>' : 'Upcoming'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2 class="section-title">Dasha Strategic Analysis</h2>
        <p style="font-size: 13px; color: #334155; line-height: 1.6; text-align: justify; margin-bottom: 15px;">
          ${ai.dashaAnalysis}
        </p>

        <h2 class="section-title">Personalized Remedial Protocol</h2>
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
          <span>Rudraveda Remedial Guide • No Database Confidential Print</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </body>
    </html>
  `;
}
