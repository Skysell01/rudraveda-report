import { Router } from 'express';
import { searchLocationsHandler } from '../controllers/location.controller';

const router = Router();

router.get('/search', searchLocationsHandler);

export default router;
