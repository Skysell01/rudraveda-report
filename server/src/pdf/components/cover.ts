import { CustomerDetails, ReportType } from '../../types/report';

export function renderCoverPage(
  title: string,
  subtitle: string,
  customer: CustomerDetails,
  generatedDate: string
): string {
  return `
    <div class="cover-container">
      <div class="cover-header">
        <div class="cover-brand">🔮 Rudraveda Astrological Sciences</div>
        <h1 class="cover-title">${title}</h1>
        <p class="cover-subtitle">${subtitle}</p>
      </div>

      <div class="cover-center-art">
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 4" />
          <circle cx="100" cy="100" r="75" stroke="#F59E0B" stroke-width="1" />
          <!-- Star of David / Yantra -->
          <polygon points="100,30 160,135 40,135" stroke="#F59E0B" stroke-width="1.5" fill="none" />
          <polygon points="100,170 160,65 40,65" stroke="#F59E0B" stroke-width="1.5" fill="none" />
          <circle cx="100" cy="100" r="15" fill="#F59E0B" opacity="0.3" />
          <circle cx="100" cy="100" r="5" fill="#F59E0B" />
        </svg>
      </div>

      <div class="cover-details-card">
        <div class="cover-detail-item">
          <label>Prepared For</label>
          <value>${customer.name}</value>
        </div>
        <div class="cover-detail-item">
          <label>Gender</label>
          <value>${customer.gender.toUpperCase()}</value>
        </div>
        <div class="cover-detail-item">
          <label>Date & Time of Birth</label>
          <value>${customer.dob} @ ${customer.tob}</value>
        </div>
        <div class="cover-detail-item">
          <label>Birth Location</label>
          <value>${customer.location.name}</value>
        </div>
        <div class="cover-detail-item">
          <label>Coordinates</label>
          <value>${customer.location.latitude.toFixed(4)}° N, ${customer.location.longitude.toFixed(4)}° E</value>
        </div>
        <div class="cover-detail-item">
          <label>Generation Date</label>
          <value>${generatedDate}</value>
        </div>
      </div>

      <div class="cover-footer">
        CONFIDENTIAL VEDIC HOROSCOPE • ZERO PERSISTENCE SECURE REPORT • RUDRAVEDA ASTROLOGY ENGINE
      </div>
    </div>
  `;
}
