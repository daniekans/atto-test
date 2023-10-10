import { Response } from 'express';
import { StatusCode } from 'status-code-enum';
import { StateService } from '../services/state.service';

export class StateController {
  constructor(private stateService: StateService) {}

  async findAll(res: Response): Promise<void> {
    try {
      res.send(await this.stateService.findAll());
    } catch (error) {
      res.status(StatusCode.ServerErrorInternal).send({
        message: 'An error ocurred while finding all state records.',
      });
    }
  }
}
