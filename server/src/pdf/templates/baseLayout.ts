import { ProkeralaPlanetaryPosition } from '../../types/report';

export function getBaseCss(): string {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1E293B;
      background-color: #FAF9F6;
      font-size: 13px;
      line-height: 1.6;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm 18mm 20mm 18mm;
      position: relative;
      background: #FFFFFF;
      page-break-after: always;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: auto;
    }

    .page-border {
      position: absolute;
      top: 10mm;
      left: 10mm;
      right: 10mm;
      bottom: 10mm;
      border: 2px solid #D4AF37;
      pointer-events: none;
    }

    .page-border::before {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      bottom: 3px;
      border: 1px solid #E5C158;
    }

    .corner {
      position: absolute;
      width: 16px;
      height: 16px;
      border-color: #9A7B1C;
      border-style: solid;
    }
    .corner-tl { top: 8mm; left: 8mm; border-width: 3px 0 0 3px; }
    .corner-tr { top: 8mm; right: 8mm; border-width: 3px 3px 0 0; }
    .corner-bl { bottom: 8mm; left: 8mm; border-width: 0 0 3px 3px; }
    .corner-br { bottom: 8mm; right: 8mm; border-width: 0 3px 3px 0; }

    .cover-page {
      background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #090D16 100%);
      color: #F8FAFC;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 28px;
      font-weight: 800;
      color: #F59E0B;
      letter-spacing: 2px;
      margin: 0;
    }

    .report-main-title {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      font-weight: 900;
      color: #FFFFFF;
      margin: 15px 0 10px 0;
      letter-spacing: 1px;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      color: #1E1B4B;
      border-bottom: 2px solid #D4AF37;
      padding-bottom: 6px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .info-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 12px;
    }

    .data-table th {
      background: #1E1B4B;
      color: #F59E0B;
      font-family: 'Cinzel', serif;
      padding: 10px;
      text-align: left;
    }

    .data-table td {
      padding: 9px 10px;
      border-bottom: 1px solid #E2E8F0;
    }

    .data-table tr:nth-child(even) {
      background: #F1F5F9;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge-gold { background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B; }
    .badge-emerald { background: #D1FAE5; color: #065F46; border: 1px solid #10B981; }

    .footer {
      position: absolute;
      bottom: 14mm;
      left: 18mm;
      right: 18mm;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748B;
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
    }
  `;
}

export function renderNorthIndianKundaliSvg(planets: ProkeralaPlanetaryPosition[]): string {
  const housePlanets: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
  
  planets.forEach(p => {
    const abbrev = p.name.split(' ')[0].substring(0, 2);
    const house = (p.position % 12) + 1;
    if (housePlanets[house]) housePlanets[house].push(abbrev);
  });

  return `
    <svg viewBox="0 0 400 400" width="100%" height="280" style="background:#FFFFFF; border:2px solid #D4AF37; border-radius:12px;">
      <rect x="0" y="0" width="400" height="400" fill="none" stroke="#D4AF37" stroke-width="3" />
      <line x1="0" y1="0" x2="400" y2="400" stroke="#CBD5E1" stroke-width="1.5" />
      <line x1="400" y1="0" x2="0" y2="400" stroke="#CBD5E1" stroke-width="1.5" />
      <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="#D4AF37" stroke-width="2" />

      <text x="200" y="140" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">1. ${housePlanets[1].join(', ') || 'Asc'}</text>
      <text x="100" y="70" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">2. ${housePlanets[2].join(', ')}</text>
      <text x="50" y="140" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">3. ${housePlanets[3].join(', ')}</text>
      <text x="140" y="200" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">4. ${housePlanets[4].join(', ')}</text>
      <text x="50" y="270" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">5. ${housePlanets[5].join(', ')}</text>
      <text x="100" y="340" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">6. ${housePlanets[6].join(', ')}</text>
      <text x="200" y="270" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">7. ${housePlanets[7].join(', ')}</text>
      <text x="300" y="340" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">8. ${housePlanets[8].join(', ')}</text>
      <text x="350" y="270" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">9. ${housePlanets[9].join(', ')}</text>
      <text x="260" y="200" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">10. ${housePlanets[10].join(', ')}</text>
      <text x="350" y="140" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">11. ${housePlanets[11].join(', ')}</text>
      <text x="300" y="70" font-size="11" font-weight="bold" fill="#1E293B" text-anchor="middle">12. ${housePlanets[12].join(', ')}</text>
    </svg>
  `;
}
