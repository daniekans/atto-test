import { Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import { InvalidFieldsError, NotFoundError } from '../errors/resourse-errors';
import { FarmerService } from '../services/farmer.service';

const farmerService = new FarmerService();

export async function createFarmer(req: Request, res: Response) {
  try {
    res.status(StatusCode.SuccessCreated).send(await farmerService.create(req.body));
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

export async function findAllFarmers(_req: Request, res: Response) {
  try {
    res.send(await farmerService.findAll());
  } catch (error) {
    res.status(StatusCode.ServerErrorInternal).send({
      message: 'An error ocurred while finding all farmer records.',
    });
  }
}

export async function findFarmer(req: Request, res: Response) {
  try {
    res.send(await farmerService.findOne(Number(req.params['id'])));
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

export async function updateFarmer(req: Request, res: Response) {
  try {
    await farmerService.update(req.body, Number(req.params['id']));

    res.status(StatusCode.SuccessNoContent).send();
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

export async function deleteFarmer(req: Request, res: Response) {
  try {
    await farmerService.delete(Number(req.params['id']));

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
