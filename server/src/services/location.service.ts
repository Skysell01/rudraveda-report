import axios from 'axios';
import { LocationInput } from '../types/report';

const POPULAR_CITIES: LocationInput[] = [
  { name: 'New Delhi, India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Mumbai, Maharashtra, India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Bengaluru, Karnataka, India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Kolkata, West Bengal, India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Chennai, Tamil Nadu, India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Hyderabad, Telangana, India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad, Gujarat, India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Pune, Maharashtra, India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Jaipur, Rajasthan, India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi, Uttar Pradesh, India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
  { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { name: 'San Francisco, USA', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' },
  { name: 'Dubai, United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore' },
  { name: 'Toronto, Canada', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto' },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' }
];

export async function searchLocations(query: string): Promise<LocationInput[]> {
  if (!query || query.trim().length < 2) {
    return POPULAR_CITIES.slice(0, 6);
  }

  const cleanQuery = query.toLowerCase().trim();

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 8
      },
      headers: {
        'User-Agent': 'RudravedaAstrologyApp/1.0'
      },
      timeout: 3000
    });

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data.map((item: any) => ({
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        timezone: item.address?.country_code === 'in' ? 'Asia/Kolkata' : 'UTC'
      }));
    }
  } catch (err) {
    console.warn('⚠️ Nominatim geocoding lookup failed/timed out, using local fuzzy matching');
  }

  // Fallback to local matching
  const matched = POPULAR_CITIES.filter(c => c.name.toLowerCase().includes(cleanQuery));
  if (matched.length > 0) return matched;

  return POPULAR_CITIES.slice(0, 6);
}
