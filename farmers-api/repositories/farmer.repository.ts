import { Farmer, UnpersistedFarmer } from '../models/farmer.model';
import { CrudRepository } from './crud.repository';

export interface FarmerRepository extends CrudRepository<Farmer, number> {
  create(farmer: UnpersistedFarmer): Promise<Farmer>;
  update(farmer: UnpersistedFarmer, id: number): Promise<Farmer>;
}
