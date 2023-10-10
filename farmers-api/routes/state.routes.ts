import { Express, Response, Router } from 'express';
import { StateController } from '../controllers/state.controller';
import { StateBaseMapper } from '../mappers/impl/state.base.mapper';
import { StateBaseRepository } from '../repositories/impl/state.base.repository';
import { StateBaseService } from '../services/impl/state.base.service';

export const setUpStateRoutes = (app: Express) => {
  const mapper = new StateBaseMapper();
  const repository = new StateBaseRepository();
  const service = new StateBaseService(repository, mapper);
  const controller = new StateController(service);
  const router: Router = Router();

  router.get('/', (_, res: Response) => controller.findAll(res));

  app.use('/api/states', router);
};
