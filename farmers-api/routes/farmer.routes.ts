import { Express, Router } from 'express';
import {
  createFarmer,
  deleteFarmer,
  findAllFarmers,
  findFarmer,
  updateFarmer,
} from '../controllers/farmer.controller';

export const configFarmerRoutes = (app: Express) => {
  const router: Router = Router();

  router.post('/', createFarmer);
  router.get('/', findAllFarmers);
  router.get('/:id', findFarmer);
  router.put('/:id', updateFarmer);
  router.delete('/:id', deleteFarmer);

  app.use('/api/farmers', router);
};
