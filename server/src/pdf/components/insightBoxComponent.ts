export function renderInsightBox(title: string, content: string): string {
  return `
    <div class="insight-box">
      <div class="insight-title">💡 ${title}</div>
      <p style="margin: 0; color: #78350F; font-size: 9.5pt;">${content}</p>
    </div>
  `;
}
