import { FarmerDTO } from '../dto/farmer.dto';

export interface FarmerService {
  create(farmer: FarmerDTO): Promise<FarmerDTO>;
  findAll(): Promise<FarmerDTO[]>;
  findOne(id: number): Promise<FarmerDTO | null>;
  update(farmer: FarmerDTO, id: number): Promise<FarmerDTO>;
  delete(id: number): Promise<void>;
}
