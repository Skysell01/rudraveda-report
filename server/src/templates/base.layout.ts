import { ProkeralaPlanetaryPosition } from '../types/report';

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

    /* Outer Golden Border */
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

    /* Corner Ornaments */
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

    /* Cover Page */
    .cover-page {
      background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #090D16 100%);
      color: #F8FAFC;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }

    .cover-header {
      margin-top: 15mm;
    }

    .brand-logo {
      width: 70px;
      height: 70px;
      margin: 0 auto 15px auto;
      background: radial-gradient(circle, #F59E0B 0%, #B45309 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
    }

    .brand-name {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 4px;
      color: #FDE68A;
      text-transform: uppercase;
      margin: 0;
    }

    .brand-tagline {
      font-size: 11px;
      letter-spacing: 3px;
      color: #94A3B8;
      text-transform: uppercase;
      margin-top: 5px;
    }

    .cover-title-container {
      margin: 20mm 0;
    }

    .cover-report-type {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0 0 10px 0;
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .cover-subtitle {
      font-size: 14px;
      color: #CBD5E1;
      max-width: 450px;
      margin: 0 auto;
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 20px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid #D4AF37;
      border-radius: 20px;
      color: #FDE68A;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-top: 15px;
    }

    .cover-details-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      padding: 20px 30px;
      width: 100%;
      max-width: 480px;
      text-align: left;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 13px;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #94A3B8;
      font-weight: 500;
    }

    .detail-value {
      color: #F8FAFC;
      font-weight: 600;
    }

    .cover-footer {
      margin-bottom: 12mm;
      font-size: 11px;
      color: #64748B;
    }

    /* Page Header & Footer */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .header-title {
      font-family: 'Cinzel', serif;
      font-size: 16px;
      font-weight: 700;
      color: #1E1B4B;
    }

    .header-subtitle {
      font-size: 11px;
      color: #64748B;
    }

    .footer-bar {
      position: absolute;
      bottom: 15mm;
      left: 18mm;
      right: 18mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      font-size: 10px;
      color: #94A3B8;
    }

    /* Content Styling */
    h2.section-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      color: #1E1B4B;
      margin: 20px 0 12px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #D4AF37;
      padding-bottom: 6px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    .info-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #D4AF37;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 12px;
    }

    .info-card-title {
      font-family: 'Cinzel', serif;
      font-size: 13px;
      font-weight: 700;
      color: #1E1B4B;
      margin-bottom: 4px;
    }

    .info-card-body {
      font-size: 12px;
      color: #334155;
    }

    /* Tables */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 20px 0;
      font-size: 12px;
    }

    table.data-table th {
      background: #1E1B4B;
      color: #F8FAFC;
      font-family: 'Cinzel', serif;
      font-weight: 600;
      padding: 8px 10px;
      text-align: left;
      border: 1px solid #1E1B4B;
    }

    table.data-table td {
      padding: 8px 10px;
      border: 1px solid #E2E8F0;
      color: #334155;
    }

    table.data-table tr:nth-child(even) {
      background: #F8FAFC;
    }

    /* Kundali Chart Container */
    .chart-container {
      width: 100%;
      max-width: 320px;
      margin: 0 auto 15px auto;
    }

    /* Badges */
    .badge-success {
      background: #DCFCE7;
      color: #166534;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 11px;
    }

    .badge-warning {
      background: #FEF3C7;
      color: #92400E;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 11px;
    }

    .remedy-card {
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
    }

    .remedy-category {
      font-weight: 700;
      color: #B45309;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .remedy-name {
      font-size: 14px;
      font-weight: 700;
      color: #78350F;
      margin: 2px 0 4px 0;
    }

    .remedy-instruction {
      font-size: 12px;
      color: #92400E;
    }
  `;
}

export function renderNorthIndianKundaliSvg(planets: ProkeralaPlanetaryPosition[]): string {
  // Map planets to houses based on rashi / position
  const housePlanets: { [house: number]: string[] } = {};
  for (let i = 1; i <= 12; i++) housePlanets[i] = [];

  planets.forEach(p => {
    const houseNum = p.position || 1;
    const shortName = p.name.split(' ')[0] || p.name;
    housePlanets[houseNum]?.push(shortName);
  });

  return `
    <svg viewBox="0 0 300 300" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF5; border: 2px solid #D4AF37; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <!-- Background Outer Square -->
      <rect x="5" y="5" width="290" height="290" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <rect x="10" y="10" width="280" height="280" fill="none" stroke="#1E1B4B" stroke-width="1.5"/>

      <!-- Diagonals -->
      <line x1="10" y1="10" x2="290" y2="290" stroke="#1E1B4B" stroke-width="1.5"/>
      <line x1="290" y1="10" x2="10" y2="290" stroke="#1E1B4B" stroke-width="1.5"/>

      <!-- Inner Diamond -->
      <polygon points="150,10 290,150 150,290 10,150" fill="none" stroke="#1E1B4B" stroke-width="1.5"/>

      <!-- House Numbers & Planet Labels -->
      <!-- House 1 (Top Center Diamond) -->
      <text x="150" y="45" font-family="'Cinzel', serif" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">Lagna (H1)</text>
      <text x="150" y="70" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[1] || []).join(', ')}</text>

      <!-- House 2 (Top Left Triangle) -->
      <text x="75" y="40" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H2</text>
      <text x="75" y="60" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[2] || []).join(', ')}</text>

      <!-- House 3 (Left Top Triangle) -->
      <text x="40" y="75" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H3</text>
      <text x="50" y="100" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[3] || []).join(', ')}</text>

      <!-- House 4 (Left Center Diamond) -->
      <text x="45" y="150" font-family="'Cinzel', serif" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">H4</text>
      <text x="70" y="170" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[4] || []).join(', ')}</text>

      <!-- House 5 (Left Bottom Triangle) -->
      <text x="40" y="225" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H5</text>
      <text x="50" y="245" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[5] || []).join(', ')}</text>

      <!-- House 6 (Bottom Left Triangle) -->
      <text x="75" y="265" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H6</text>
      <text x="75" y="280" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[6] || []).join(', ')}</text>

      <!-- House 7 (Bottom Center Diamond) -->
      <text x="150" y="260" font-family="'Cinzel', serif" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">H7</text>
      <text x="150" y="235" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[7] || []).join(', ')}</text>

      <!-- House 8 (Bottom Right Triangle) -->
      <text x="225" y="265" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H8</text>
      <text x="225" y="280" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[8] || []).join(', ')}</text>

      <!-- House 9 (Right Bottom Triangle) -->
      <text x="260" y="225" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H9</text>
      <text x="245" y="245" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[9] || []).join(', ')}</text>

      <!-- House 10 (Right Center Diamond) -->
      <text x="250" y="150" font-family="'Cinzel', serif" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">H10</text>
      <text x="230" y="170" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[10] || []).join(', ')}</text>

      <!-- House 11 (Right Top Triangle) -->
      <text x="260" y="75" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H11</text>
      <text x="245" y="100" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[11] || []).join(', ')}</text>

      <!-- House 12 (Top Right Triangle) -->
      <text x="225" y="40" font-family="sans-serif" font-size="8" fill="#64748B" text-anchor="middle">H12</text>
      <text x="225" y="60" font-family="sans-serif" font-size="9" fill="#1E1B4B" text-anchor="middle">${(housePlanets[12] || []).join(', ')}</text>

      <!-- Center Emblem -->
      <circle cx="150" cy="150" r="18" fill="#FFFBEB" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="150" y="154" font-family="'Cinzel', serif" font-size="14" fill="#B45309" text-anchor="middle">ॐ</text>
    </svg>
  `;
}
