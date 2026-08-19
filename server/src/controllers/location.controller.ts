import { Request, Response } from 'express';
import { searchLocations } from '../services/location.service';

export async function searchLocationsHandler(req: Request, res: Response): Promise<void> {
  try {
    const query = req.query.q as string || '';
    const locations = await searchLocations(query);
    res.json(locations);
  } catch (err: any) {
    console.error('❌ Location search error:', err);
    res.status(500).json({ error: 'Failed to search location' });
  }
}
