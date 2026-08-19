import { renderNorthIndianKundaliSvg } from '../templates/baseLayout';

export function renderNatalChartSection(ascendantSign: string, planetaryPositions: any[]): string {
  const svg = renderNorthIndianKundaliSvg(planetaryPositions || []);

  const tableRows = (planetaryPositions || []).map(p => `
    <tr>
      <td style="font-weight: 600;">${p.name || 'Planet'}</td>
      <td>${p.rashi || 'Mesha'}</td>
      <td>${p.degree?.toFixed(2) || '15.00'}°</td>
      <td>${p.nakshatra || 'Ashwini'} (${p.nakshatraPada || 1})</td>
      <td>${p.isRetrograde ? '<span style="color: #DC2626; font-weight: 700;">R</span>' : 'Direct'}</td>
    </tr>
  `).join('');

  return `
    <div class="avoid-break" style="margin: 20px 0;">
      <h3 class="cinzel" style="text-align: center; margin-bottom: 10px;">Lagna Kundali (${ascendantSign} Ascendant)</h3>
      <div style="text-align: center; margin-bottom: 16px;">
        ${svg}
      </div>

      <table>
        <thead>
          <tr>
            <th>Planet / Graha</th>
            <th>Rashi (Sign)</th>
            <th>Degree</th>
            <th>Nakshatra & Pada</th>
            <th>Motion</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}
