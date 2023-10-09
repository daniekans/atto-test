import { FarmerDTO, farmerRequiredFields } from '../../dto/farmer.dto';
import { InvalidFieldsError } from '../../errors/resourse-errors';
import { FarmerMapper } from '../../mappers/farmer.mapper';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.model';
import { FarmerRepository } from '../../repositories/farmer.repository';
import { FarmerService } from '../farmer.service';

export class FarmerBaseService implements FarmerService {
  constructor(
    private farmerRepository: FarmerRepository,
    private farmerMapper: FarmerMapper
  ) {}

  async create(farmerDTO: Partial<FarmerDTO> | null): Promise<FarmerDTO> {
    if (
      farmerDTO == null ||
      farmerRequiredFields.some(requiredField => farmerDTO[requiredField] == null)
    ) {
      throw new InvalidFieldsError();
    }

    const farmer: UnpersistedFarmer = this.farmerMapper.toUnpersistedFarmer(farmerDTO as FarmerDTO);
    const createdRecord: Farmer = await this.farmerRepository.create(farmer);

    return this.farmerMapper.fromEntity(createdRecord);
  }

  async findAll(): Promise<FarmerDTO[]> {
    const allFarmers: Farmer[] = await this.farmerRepository.findAll();

    return allFarmers.map(this.farmerMapper.fromEntity);
  }

  async findOne(id: number | null): Promise<FarmerDTO | null> {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    const recordFound: Farmer = await this.farmerRepository.findOne(id);

    return this.farmerMapper.fromEntity(recordFound);
  }

  async update(farmerDTO: Partial<FarmerDTO> | null, id: number | null): Promise<FarmerDTO> {
    if (
      id == null ||
      farmerDTO == null ||
      farmerRequiredFields.some(requiredField => farmerDTO[requiredField] == null)
    ) {
      throw new InvalidFieldsError();
    }

    const farmer: UnpersistedFarmer = this.farmerMapper.toUnpersistedFarmer(farmerDTO as FarmerDTO);
    const updatedFarmer: Farmer = await this.farmerRepository.update(farmer, id);

    return this.farmerMapper.fromEntity(updatedFarmer);
  }

  async delete(id: number | null): Promise<void> {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    await this.farmerRepository.delete(id);
  }
}
