import { Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import { InvalidFieldsError, NotFoundError } from '../errors/resourse-errors';
import { FarmerService } from '../services/farmer.service';

export class FarmerController {
  constructor(private farmerService: FarmerService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCode.SuccessCreated).send(await this.farmerService.create(req.body));
    } catch (error) {
      if (error instanceof InvalidFieldsError) {
        res.status(StatusCode.ClientErrorBadRequest).send({
          message: 'Invalid request body.',
        });
      } else {
        res.status(StatusCode.ServerErrorInternal).send({
          message: 'An error ocurred while creating farmer record.',
        });
      }
    }
  }

  async findAll(res: Response): Promise<void> {
    try {
      res.send(await this.farmerService.findAll());
    } catch (error) {
      res.status(StatusCode.ServerErrorInternal).send({
        message: 'An error ocurred while finding all farmer records.',
      });
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.farmerService.findOne(Number(req.params['id'])));
    } catch (error) {
      if (error instanceof InvalidFieldsError) {
        res.status(StatusCode.ClientErrorBadRequest).send({
          message: 'Invalid farmer ID.',
        });
      } else if (error instanceof NotFoundError) {
        res.status(StatusCode.ClientErrorNotFound).send({
          message: 'Farmer with given ID could not be found.',
        });
      } else {
        res.status(StatusCode.ServerErrorInternal).send({
          message: 'An error ocurred while finding farmer record.',
        });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      res
        .status(StatusCode.SuccessNoContent)
        .send(await this.farmerService.update(req.body, Number(req.params['id'])));
    } catch (error) {
      if (error instanceof InvalidFieldsError) {
        res.status(StatusCode.ClientErrorBadRequest).send({
          message: 'Invalid request body and/or farmer ID.',
        });
      } else if (error instanceof NotFoundError) {
        res.status(StatusCode.ClientErrorNotFound).send({
          message: 'Farmer with given ID could not be found.',
        });
      } else {
        res.status(StatusCode.ServerErrorInternal).send({
          message: 'An error ocurred while updating farmer record.',
        });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.farmerService.delete(Number(req.params['id']));

      res.status(StatusCode.SuccessNoContent).send();
    } catch (error) {
      if (error instanceof InvalidFieldsError) {
        res.status(StatusCode.ClientErrorBadRequest).send({
          message: 'Invalid farmer ID.',
        });
      } else if (error instanceof NotFoundError) {
        res.status(StatusCode.ClientErrorNotFound).send({
          message: 'Farmer with given ID could not be found.',
        });
      } else {
        res.status(StatusCode.ServerErrorInternal).send({
          message: 'An error ocurred while deleting farmer record.',
        });
      }
    }
  }
}
