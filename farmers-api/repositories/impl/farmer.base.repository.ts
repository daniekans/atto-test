import { NotFoundError } from '../../errors/resourse-errors';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.model';
import { FarmerRepository } from '../farmer.repository';

export class FarmerBaseRepository implements FarmerRepository {
  async create(farmer: UnpersistedFarmer): Promise<Farmer> {
    return Farmer.create(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return Farmer.findAll();
  }

  async findOne(id: number): Promise<Farmer> {
    const recordFound: Farmer | null = await Farmer.findByPk(id);

    if (recordFound == null) {
      throw new NotFoundError();
    }

    return recordFound;
  }

  async update(farmer: Farmer, id: number): Promise<Farmer> {
    const existingFarmer: Farmer = await this.findOne(id);

    return existingFarmer.update(farmer);
  }

  async delete(id: number): Promise<void> {
    const rowsAffected = await Farmer.destroy({ where: { id } });

    if (rowsAffected !== 1) {
      throw new NotFoundError();
    }
  }
}
