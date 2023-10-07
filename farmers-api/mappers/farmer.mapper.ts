import { FarmerDTO } from '../dto/farmer.dto';
import { Farmer, UnpersistedFarmer } from '../models/farmer.model';
import { Mapper } from './mapper.interface';

export interface FarmerMapper extends Mapper<Farmer, FarmerDTO> {
  toUnpersistedFarmer(dto: FarmerDTO): UnpersistedFarmer;
}
