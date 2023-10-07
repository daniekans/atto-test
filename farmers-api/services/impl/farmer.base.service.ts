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

  async create(farmerDTO: FarmerDTO): Promise<FarmerDTO> {
    if (
      farmerDTO == null ||
      farmerRequiredFields.some(requiredField => farmerDTO[requiredField] == null)
    ) {
      throw new InvalidFieldsError();
    }

    const farmer: UnpersistedFarmer = this.farmerMapper.toUnpersistedFarmer(farmerDTO);
    const createdRecord: Farmer = await this.farmerRepository.create(farmer);

    return this.farmerMapper.fromEntity(createdRecord);
  }

  async findAll(): Promise<FarmerDTO[]> {
    const allFarmers: Farmer[] = await Farmer.findAll();

    return allFarmers.map(this.farmerMapper.fromEntity);
  }

  async findOne(id: number): Promise<FarmerDTO | null> {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    const recordFound: Farmer | null = await this.farmerRepository.findOne(id);

    return recordFound == null ? null : this.farmerMapper.fromEntity(recordFound);
  }

  async update(farmerDTO: FarmerDTO, id: number): Promise<void> {
    if (
      id == null ||
      farmerDTO == null ||
      farmerRequiredFields.some(requiredField => farmerDTO[requiredField] == null)
    ) {
      throw new InvalidFieldsError();
    }

    const farmer: UnpersistedFarmer = this.farmerMapper.toUnpersistedFarmer(farmerDTO);

    await this.farmerRepository.update(farmer, id);
  }

  async delete(id: number): Promise<void> {
    if (id == null) {
      throw new InvalidFieldsError();
    }

    await this.farmerRepository.delete(id);
  }
}
