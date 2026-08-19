import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse, ReportType } from '../../types/report';
import { REPORT_TYPE_CONFIGS } from '../../reports/configs/reportTypes.config';
import { getBaseCss, renderNorthIndianKundaliSvg } from './baseLayout';

export function renderReportHtml(
  reportType: ReportType,
  customer: CustomerDetails,
  astrology: ProkeralaKundliResponse,
  ai: AIInterpretation,
  matching?: ProkeralaMatchingResponse,
  secondary?: CustomerDetails
): string {
  const config = REPORT_TYPE_CONFIGS[reportType] || REPORT_TYPE_CONFIGS['janam-kundali'];
  const css = getBaseCss();
  const kundaliSvg = renderNorthIndianKundaliSvg(astrology.planetaryPositions);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rudraveda ${config.title}</title>
  <style>${css}</style>
</head>
<body>
  <!-- PAGE 1: COVER -->
  <div class="page cover-page">
    <div class="page-border"></div>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <div className="cover-header" style="margin-top:20mm;">
      <div style="font-family:'Cinzel',serif; font-size:24px; color:#F59E0B; font-weight:800;">RUDRAVEDA ASTROLOGY</div>
      <div style="font-size:12px; color:#94A3B8; text-transform:uppercase; letter-spacing:2px; margin-top:4px;">Certified Vedic Intelligence</div>
    </div>

    <div style="margin: auto 0;">
      <div class="badge badge-gold">${config.badge}</div>
      <h1 class="report-main-title">${config.title}</h1>
      <div style="font-size:14px; color:#CBD5E1; margin-top:8px;">${config.subtitle}</div>

      <div style="margin-top: 30px; background: rgba(255,255,255,0.06); padding: 20px 30px; border-radius: 16px; border: 1px solid rgba(212,175,55,0.3); inline-block;">
        <div style="font-size:16px; font-weight:700; color:#FFFFFF;">${customer.name}</div>
        <div style="font-size:12px; color:#94A3B8; margin-top:6px;">
          DOB: ${customer.dob} | TOB: ${customer.tob} | Location: ${customer.location.name}
        </div>
      </div>
    </div>

    <div style="margin-bottom:15mm; font-size:11px; color:#64748B;">
      Generated via Rudraveda Ephemeral AI PDF Engine • Verified Zero-Database Binary Output
    </div>
  </div>

  <!-- PAGE 2: KUNDALI CHART & PLANETARY DEGREES -->
  <div class="page">
    <div class="page-border"></div>
    <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div><div class="corner corner-br"></div>

    <div class="section-title">🔮 Natal Horoscope & Planetary Configurations</div>
    
    <div style="display:flex; gap:20px; margin-bottom:20px;">
      <div style="flex:1;">
        <div style="font-weight:700; color:#1E1B4B; margin-bottom:8px;">Lagna Kundali Chart</div>
        ${kundaliSvg}
      </div>
      <div style="flex:1;">
        <div class="info-card">
          <div style="font-weight:700; color:#1E1B4B; margin-bottom:8px;">Nakshatra & Birth Details</div>
          <table style="width:100%; font-size:12px; line-height:1.8;">
            <tr><td><b>Janma Nakshatra:</b></td><td>${astrology.nakshatraDetails.nakshatra}</td></tr>
            <tr><td><b>Nakshatra Lord:</b></td><td>${astrology.nakshatraDetails.nakshatraLord}</td></tr>
            <tr><td><b>Rashi (Moon Sign):</b></td><td>${astrology.nakshatraDetails.rashi}</td></tr>
            <tr><td><b>Rashi Lord:</b></td><td>${astrology.nakshatraDetails.rashiLord}</td></tr>
            <tr><td><b>Gana:</b></td><td>${astrology.nakshatraDetails.gan}</td></tr>
            <tr><td><b>Mangal Dosha:</b></td><td><span class="badge ${astrology.mangalDosha.hasDosha ? 'badge-gold' : 'badge-emerald'}">${astrology.mangalDosha.hasDosha ? 'Present' : 'Absent'}</span></td></tr>
          </table>
        </div>
      </div>
    </div>

    <div class="section-title">🪐 Planetary Longitudes & House Placements</div>
    <table class="data-table">
      <thead>
        <tr><th>Planet</th><th>Rashi</th><th>Degree</th><th>Nakshatra</th><th>House</th><th>Retrograde</th></tr>
      </thead>
      <tbody>
        ${astrology.planetaryPositions.map(p => `
          <tr>
            <td><b>${p.name}</b></td>
            <td>${p.rashi}</td>
            <td>${p.degree.toFixed(2)}°</td>
            <td>${p.nakshatra} (${p.nakshatraPada})</td>
            <td>House ${p.position}</td>
            <td>${p.isRetrograde ? 'Yes (R)' : 'No'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      <span>Customer: ${customer.name}</span>
      <span>Rudraveda Engine • ${config.title}</span>
      <span>Page 2 of 4</span>
    </div>
  </div>

  <!-- PAGE 3: CLAUDE AI VEDIC SYNTHESIS -->
  <div class="page">
    <div class="page-border"></div>
    <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div><div class="corner corner-br"></div>

    <div class="section-title">🧠 ${ai.title || 'Vedic Astrology Interpretation'}</div>

    <div class="info-card">
      <div style="font-weight:700; color:#1E1B4B; margin-bottom:6px;">Executive Life Overview</div>
      <p style="margin:0; font-size:12.5px;">${ai.overview}</p>
    </div>

    <div class="info-card">
      <div style="font-weight:700; color:#1E1B4B; margin-bottom:6px;">Mind, Temperament & Personality</div>
      <p style="margin:0; font-size:12.5px;">${ai.personalityAndMind}</p>
    </div>

    <div class="info-card">
      <div style="font-weight:700; color:#1E1B4B; margin-bottom:6px;">Career, Wealth & Destiny Roadmap</div>
      <p style="margin:0; font-size:12.5px;">${ai.careerAndWealth}</p>
    </div>

    <div class="info-card">
      <div style="font-weight:700; color:#1E1B4B; margin-bottom:6px;">Vimshottari Dasha Analysis</div>
      <p style="margin:0; font-size:12.5px;">${ai.dashaAnalysis}</p>
    </div>

    <div class="footer">
      <span>Customer: ${customer.name}</span>
      <span>Rudraveda AI Interpreter</span>
      <span>Page 3 of 4</span>
    </div>
  </div>

  <!-- PAGE 4: PLANETARY REMEDIES & YEARLY FORECAST -->
  <div class="page">
    <div class="page-border"></div>
    <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div><div class="corner corner-br"></div>

    <div class="section-title">💎 Prescribed Planetary Remedies & Mitigations</div>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:20px;">
      ${ai.planetaryRemedies.map(r => `
        <div class="info-card" style="margin-bottom:0;">
          <div style="display:flex; justify-between; align-items:center; margin-bottom:6px;">
            <b style="color:#1E1B4B;">${r.remedy}</b>
            <span class="badge badge-gold">${r.category}</span>
          </div>
          <p style="margin:0; font-size:11.5px; color:#475569;">${r.instructions}</p>
        </div>
      `).join('')}
    </div>

    <div class="section-title">📅 Quarterly Transit Forecast</div>
    <table class="data-table">
      <thead>
        <tr><th>Quarter</th><th>Astrological Prediction & Focus Area</th></tr>
      </thead>
      <tbody>
        ${(ai.yearlyForecast || []).map(y => `
          <tr>
            <td style="width:25%;"><b>${y.quarter}</b></td>
            <td>${y.prediction}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      <span>Customer: ${customer.name}</span>
      <span>Rudaveda PDF Generator • Signed Buffer</span>
      <span>Page 4 of 4</span>
    </div>
  </div>
</body>
</html>
  `;
}
