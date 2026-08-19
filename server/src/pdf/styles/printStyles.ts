export const printStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  @page {
    size: A4 portrait;
    margin: 18mm 12mm 18mm 12mm;
  }

  @page :first {
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1E293B;
    background-color: #FFFFFF;
  }

  h1, h2, h3, h4, .cinzel {
    font-family: 'Cinzel', serif;
    color: #0F172A;
    page-break-after: avoid;
    break-after: avoid;
  }

  h1 {
    font-size: 22pt;
    font-weight: 700;
    margin-bottom: 8px;
    color: #0F172A;
    border-bottom: 2px solid #F59E0B;
    padding-bottom: 6px;
  }

  h2 {
    font-size: 15pt;
    font-weight: 700;
    color: #B45309;
    margin-top: 18px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 12pt;
    font-weight: 600;
    color: #1E293B;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  p {
    margin-bottom: 10px;
    text-align: justify;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 12px;
  }

  li {
    margin-bottom: 4px;
  }

  .page-break {
    page-break-before: always;
    break-before: page;
  }

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Cover Styling */
  .cover-container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%);
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 40px;
    position: relative;
    page-break-after: always;
    break-after: page;
  }

  .cover-header {
    text-align: center;
  }

  .cover-brand {
    font-family: 'Cinzel', serif;
    font-size: 14pt;
    letter-spacing: 4px;
    color: #F59E0B;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .cover-title {
    font-family: 'Cinzel', serif;
    font-size: 28pt;
    font-weight: 900;
    line-height: 1.2;
    color: #FFFFFF;
    margin-bottom: 12px;
    border-bottom: none;
  }

  .cover-subtitle {
    font-size: 12pt;
    color: #CBD5E1;
    font-weight: 300;
  }

  .cover-center-art {
    text-align: center;
    margin: 40px 0;
  }

  .cover-details-card {
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 12px;
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .cover-detail-item label {
    display: block;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #F59E0B;
    margin-bottom: 2px;
  }

  .cover-detail-item value {
    font-size: 11pt;
    font-weight: 600;
    color: #FFFFFF;
  }

  .cover-footer {
    text-align: center;
    font-size: 8.5pt;
    color: #94A3B8;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 16px;
  }

  /* Table of Contents */
  .toc-container {
    margin-bottom: 24px;
  }

  .toc-item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px dotted #CBD5E1;
    font-size: 10pt;
  }

  .toc-title {
    font-weight: 500;
    color: #1E293B;
  }

  .toc-dots {
    flex: 1;
    margin: 0 8px;
    border-bottom: 1px dotted #94A3B8;
    height: 12px;
  }

  /* Section Header */
  .section-header {
    margin-top: 20px;
    margin-bottom: 14px;
    padding-bottom: 6px;
    border-bottom: 2px solid #F59E0B;
  }

  .section-badge {
    display: inline-block;
    background: #FEF3C7;
    color: #92400E;
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 4px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  th {
    background-color: #0F172A;
    color: #FFFFFF;
    font-weight: 600;
    text-align: left;
    padding: 8px 12px;
    border: 1px solid #1E293B;
  }

  td {
    padding: 8px 12px;
    border: 1px solid #E2E8F0;
  }

  tr:nth-child(even) {
    background-color: #F8FAFC;
  }

  /* Insight Box */
  .insight-box {
    background: #FFFBEB;
    border-left: 4px solid #F59E0B;
    border-radius: 0 8px 8px 0;
    padding: 14px 18px;
    margin: 14px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .insight-title {
    font-weight: 700;
    color: #92400E;
    margin-bottom: 4px;
    font-size: 10.5pt;
  }

  /* Lucky Grid */
  .lucky-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 16px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .lucky-card {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 12px 16px;
  }

  .lucky-label {
    font-size: 8.5pt;
    text-transform: uppercase;
    color: #64748B;
    font-weight: 600;
  }

  .lucky-value {
    font-size: 12pt;
    font-weight: 700;
    color: #0F172A;
    margin-top: 2px;
  }

  /* Remedy Cards */
  .remedies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin: 16px 0;
  }

  .remedy-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-left: 4px solid #10B981;
    border-radius: 8px;
    padding: 14px 18px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .remedy-category {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    color: #047857;
    margin-bottom: 2px;
  }

  .remedy-title {
    font-size: 11pt;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 6px;
  }

  .remedy-desc {
    font-size: 9.5pt;
    color: #334155;
    margin-bottom: 6px;
  }

  .remedy-instructions {
    font-size: 9pt;
    font-style: italic;
    color: #047857;
    background: #ECFDF5;
    padding: 6px 10px;
    border-radius: 4px;
  }

  /* Disclaimer Box */
  .disclaimer-box {
    margin-top: 30px;
    padding: 12px 16px;
    background: #F1F5F9;
    border-radius: 6px;
    font-size: 8pt;
    color: #64748B;
    text-align: center;
    page-break-inside: avoid;
    break-inside: avoid;
  }
`;
