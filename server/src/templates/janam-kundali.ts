import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse } from '../types/report';
import { getBaseCss, renderNorthIndianKundaliSvg } from './base.layout';

export function renderJanamKundaliTemplate(
  customer: CustomerDetails,
  astrology: ProkeralaKundliResponse,
  ai: AIInterpretation
): string {
  const css = getBaseCss();
  const kundaliSvg = renderNorthIndianKundaliSvg(astrology.planetaryPositions);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Janam Kundali - ${customer.name}</title>
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
            <span style="font-size: 36px; color: #FFFFFF;">ॐ</span>
          </div>
          <h1 class="brand-name">RUDRAVEDA</h1>
          <div class="brand-tagline">Vedic Astrology & Celestial Intelligence</div>
        </div>

        <div class="cover-title-container">
          <h2 class="cover-report-type">JANAM KUNDALI & DESTINY ANALYSIS</h2>
          <div class="cover-subtitle">A Comprehensive Parashari Vedic Astrology Horoscope & Life Predictions Report</div>
          <div class="cover-badge">CERTIFIED HOROSCOPE DOCUMENT</div>
        </div>

        <div class="cover-details-card">
          <div class="detail-row">
            <span class="detail-label">Full Name:</span>
            <span class="detail-value">${customer.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Gender:</span>
            <span class="detail-value">${customer.gender.toUpperCase()}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date of Birth:</span>
            <span class="detail-value">${customer.dob}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Time of Birth:</span>
            <span class="detail-value">${customer.tob}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Place of Birth:</span>
            <span class="detail-value">${customer.location.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Moon Sign (Rashi):</span>
            <span class="detail-value">${astrology.nakshatraDetails.rashi}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Birth Star (Nakshatra):</span>
            <span class="detail-value">${astrology.nakshatraDetails.nakshatra} (Pada ${astrology.nakshatraDetails.charna})</span>
          </div>
        </div>

        <div class="cover-footer">
          Generated via Rudraveda Intelligence Engine • Strictly Confidential
        </div>
      </div>

      <!-- PAGE 2: ASTROLOGICAL METRICS & BIRTH CHART -->
      <div class="page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="header-bar">
          <div>
            <div class="header-title">NATAL CHART & ASTROLOGICAL METRICS</div>
            <div class="header-subtitle">Subject: ${customer.name} • DOB: ${customer.dob}</div>
          </div>
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #D4AF37;">RUDRAVEDA</div>
        </div>

        <div class="grid-2">
          <div>
            <h2 class="section-title">Panchang & Avakahada</h2>
            <table class="data-table">
              <tr><td><strong>Moon Sign (Rashi)</strong></td><td>${astrology.nakshatraDetails.rashi}</td></tr>
              <tr><td><strong>Rashi Lord</strong></td><td>${astrology.nakshatraDetails.rashiLord}</td></tr>
              <tr><td><strong>Nakshatra</strong></td><td>${astrology.nakshatraDetails.nakshatra}</td></tr>
              <tr><td><strong>Nakshatra Lord</strong></td><td>${astrology.nakshatraDetails.nakshatraLord}</td></tr>
              <tr><td><strong>Pada (Quarter)</strong></td><td>Pada ${astrology.nakshatraDetails.charna}</td></tr>
              <tr><td><strong>Gana</strong></td><td>${astrology.nakshatraDetails.gan}</td></tr>
              <tr><td><strong>Yoni</strong></td><td>${astrology.nakshatraDetails.yoni}</td></tr>
              <tr><td><strong>Nadi</strong></td><td>${astrology.nakshatraDetails.nadi}</td></tr>
            </table>

            <h2 class="section-title">Dosha Assessment</h2>
            <div class="info-card">
              <div class="info-card-title">Mangal Dosha Analysis</div>
              <div class="info-card-body">
                ${astrology.mangalDosha.hasDosha ? `<span class="badge-warning">PRESENT</span>` : `<span class="badge-success">NOT PRESENT</span>`}<br>
                ${astrology.mangalDosha.description}
              </div>
            </div>
            <div class="info-card">
              <div class="info-card-title">Kaal Sarp Dosha Analysis</div>
              <div class="info-card-body">
                ${astrology.kaalSarpDosha.hasDosha ? `<span class="badge-warning">PRESENT</span>` : `<span class="badge-success">NOT PRESENT</span>`}<br>
                ${astrology.kaalSarpDosha.description}
              </div>
            </div>
          </div>

          <div>
            <h2 class="section-title" style="text-align: center;">Lagna Kundali Chart</h2>
            <div class="chart-container">
              ${kundaliSvg}
            </div>
            <div style="font-size: 11px; text-align: center; color: #64748B;">North Indian Vedic Kundali Layout</div>
          </div>
        </div>

        <h2 class="section-title">Planetary Positions & Degrees</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>Planet</th>
              <th>Rashi (Sign)</th>
              <th>Rashi Lord</th>
              <th>Degree</th>
              <th>Nakshatra</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${astrology.planetaryPositions.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.rashi}</td>
                <td>${p.rashiLord}</td>
                <td>${p.degree}°</td>
                <td>${p.nakshatra} (${p.nakshatraPada})</td>
                <td>${p.isRetrograde ? '<span style="color:#B45309; font-weight:bold;">Retrograde (R)</span>' : 'Direct'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer-bar">
          <span>Rudraveda Astrology System</span>
          <span>Page 2 of 3</span>
        </div>
      </div>

      <!-- PAGE 3: CLAUDE AI VEDIC INTERPRETATIONS & REMEDIES -->
      <div class="page">
        <div class="page-border"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="header-bar">
          <div>
            <div class="header-title">VEDIC DESTINY & PLANETARY REMEDIES</div>
            <div class="header-subtitle">AI-Synthesized Interpretation for ${customer.name}</div>
          </div>
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #D4AF37;">RUDRAVEDA</div>
        </div>

        <h2 class="section-title">Core Life Destiny Overview</h2>
        <p style="font-size: 13px; color: #334155; line-height: 1.6; text-align: justify; margin-bottom: 15px;">
          ${ai.overview}
        </p>

        <div class="grid-2">
          <div>
            <div class="info-card">
              <div class="info-card-title">🧠 Temperament & Intellect</div>
              <div class="info-card-body">${ai.personalityAndMind}</div>
            </div>
            <div class="info-card">
              <div class="info-card-title">💼 Career & Financial Fortune</div>
              <div class="info-card-body">${ai.careerAndWealth}</div>
            </div>
          </div>
          <div>
            <div class="info-card">
              <div class="info-card-title">🌿 Health & Bio-Vitality</div>
              <div class="info-card-body">${ai.healthAndVitality}</div>
            </div>
            <div class="info-card">
              <div class="info-card-title">⏳ Vimshottari Dasha Analysis</div>
              <div class="info-card-body">${ai.dashaAnalysis}</div>
            </div>
          </div>
        </div>

        <h2 class="section-title">Auspicious Planetary Remedies</h2>
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
          <span>Rudraveda Astrology System • No Database Confidential Print</span>
          <span>Page 3 of 3</span>
        </div>
      </div>
    </body>
    </html>
  `;
}
