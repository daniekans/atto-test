import { InvalidFieldsError, NotFoundError } from '../errors/resourse-errors';
import db from '../models';
import { Farmer, farmerRequiredFields } from '../models/farmer.model';

export class FarmerService {
  async create(farmer: Farmer): Promise<Farmer> {
    if (farmer == null || farmerRequiredFields.some(requiredField => requiredField == null)) {
      throw new InvalidFieldsError();
    }

    return db.farmers.create(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return Farmer.findAll();
  }

  async findOne(id: number): Promise<Farmer | null> {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    const recordFound: Farmer | null = await Farmer.findByPk(id);

    if (recordFound == null) {
      throw new NotFoundError();
    }

    return recordFound;
  }

  async update(farmer: Farmer, id: number): Promise<void> {
    if (
      id == null ||
      farmer == null ||
      farmerRequiredFields.some(requiredField => requiredField == null)
    ) {
      throw new InvalidFieldsError();
    }

    const [rowsAffected]: [number] = await Farmer.update(farmer, { where: { id } });

    if (rowsAffected !== 1) {
      throw new NotFoundError();
    }
  }

  async delete(id: number) {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    const rowsAffected = await Farmer.destroy({ where: { id } });

    if (rowsAffected !== 1) {
      throw new NotFoundError();
    }
  }
}
