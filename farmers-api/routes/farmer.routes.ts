import { Express, Request, Response, Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import { FarmerBaseMapper } from '../mappers/impl/farmer.base.mapper';
import { FarmerBaseRepository } from '../repositories/impl/farmer.base.repository';
import { FarmerBaseService } from '../services/impl/farmer.base.service';

export const setUpFarmerRoutes = (app: Express) => {
  const mapper = new FarmerBaseMapper();
  const repository = new FarmerBaseRepository();
  const service = new FarmerBaseService(repository, mapper);
  const controller = new FarmerController(service);
  const router: Router = Router();

  router.post('/', (req: Request, res: Response) => controller.create(req, res));
  router.get('/', (_, res: Response) => controller.findAll(res));
  router.get('/:id', (req: Request, res: Response) => controller.find(req, res));
  router.put('/:id', (req: Request, res: Response) => controller.update(req, res));
  router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

  app.use('/api/farmers', router);
};
