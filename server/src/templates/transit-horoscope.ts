import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse } from '../types/report';
import { getBaseCss } from './base.layout';

export function renderTransitHoroscopeTemplate(
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
      <title>Transit Horoscope - ${customer.name}</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="page cover-page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div><div class="corner corner-br"></div>

        <div class="cover-header">
          <div class="brand-logo"><span style="font-size: 36px; color: #FFFFFF;">🪐</span></div>
          <h1 class="brand-name">RUDRAVEDA</h1>
          <div class="brand-tagline">Annual Gochara Transit Forecast</div>
        </div>

        <div class="cover-title-container">
          <h2 class="cover-report-type">ANNUAL PLANETARY TRANSIT FORECAST</h2>
          <div class="cover-subtitle">Jupiter, Saturn & Rahu-Ketu Transit Effects for ${customer.name}</div>
          <div class="cover-badge">ANNUAL FORECAST REPORT</div>
        </div>

        <div class="cover-details-card">
          <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${customer.name}</span></div>
          <div class="detail-row"><span class="detail-label">DOB / TOB:</span><span class="detail-value">${customer.dob} @ ${customer.tob}</span></div>
          <div class="detail-row"><span class="detail-label">Place:</span><span class="detail-value">${customer.location.name}</span></div>
          <div class="detail-row"><span class="detail-label">Moon Rashi:</span><span class="detail-value">${astrology.nakshatraDetails.rashi}</span></div>
        </div>

        <div class="cover-footer">Rudraveda Intelligence Engine • Confidential</div>
      </div>

      <div class="page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div><div class="corner corner-br"></div>

        <div class="header-bar">
          <div>
            <div class="header-title">QUARTERLY HOROSCOPE & TRANSIT PREDICTIONS</div>
            <div class="header-subtitle">Subject: ${customer.name} • ${astrology.nakshatraDetails.rashi}</div>
          </div>
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #D4AF37;">RUDRAVEDA</div>
        </div>

        <h2 class="section-title">Annual Destiny Overview</h2>
        <p style="font-size: 13px; color: #334155; line-height: 1.6; text-align: justify; margin-bottom: 15px;">
          ${ai.overview}
        </p>

        <h2 class="section-title">Quarterly Predictions Breakdown</h2>
        <div class="grid-2">
          ${(ai.yearlyForecast || [
            { quarter: 'Q1 (Jan - Mar)', prediction: 'Strong career developments and fresh income streams.' },
            { quarter: 'Q2 (Apr - Jun)', prediction: 'Beneficial domestic investments and personal growth.' },
            { quarter: 'Q3 (Jul - Sep)', prediction: 'Stabilization of key projects and social recognition.' },
            { quarter: 'Q4 (Oct - Dec)', prediction: 'Harmonious domestic bliss and spiritual peace.' }
          ]).map(q => `
            <div class="info-card" style="border-left: 4px solid #1E1B4B;">
              <div class="info-card-title">${q.quarter}</div>
              <div class="info-card-body">${q.prediction}</div>
            </div>
          `).join('')}
        </div>

        <h2 class="section-title">Transit Mitigation Remedies</h2>
        <div class="grid-2">
          ${ai.planetaryRemedies.slice(0, 2).map(r => `
            <div class="remedy-card">
              <div class="remedy-category">${r.category} Remedy</div>
              <div class="remedy-name">${r.remedy}</div>
              <div class="remedy-instruction">${r.instructions}</div>
            </div>
          `).join('')}
        </div>

        <div class="footer-bar">
          <span>Rudraveda Annual Transit Forecast • No Database Confidential Print</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </body>
    </html>
  `;
}
