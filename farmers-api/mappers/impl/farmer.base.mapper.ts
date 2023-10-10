import { FarmerDTO } from '../../dto/farmer.dto';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.model';
import { FarmerMapper } from '../farmer.mapper';

export class FarmerBaseMapper implements FarmerMapper {
  toEntity(dto: FarmerDTO): Farmer {
    return Farmer.build({
      id: dto.id,
      companyName: dto.companyName,
      tradingName: dto.tradingName,
      personIdentification: dto.personIdentification,
      city: dto.city,
      stateId: dto.stateId,
      phoneNumber: dto.phoneNumber ?? null,
    });
  }

  fromEntity(entity: Farmer): FarmerDTO {
    return {
      id: entity.id,
      companyName: entity.companyName,
      tradingName: entity.tradingName,
      personIdentification: entity.personIdentification,
      city: entity.city,
      stateId: entity.stateId,
      phoneNumber: entity.phoneNumber ?? null,
    };
  }

  toUnpersistedFarmer(dto: FarmerDTO): UnpersistedFarmer {
    return {
      companyName: dto.companyName,
      tradingName: dto.tradingName,
      personIdentification: dto.personIdentification,
      city: dto.city,
      stateId: dto.stateId,
      phoneNumber: dto.phoneNumber ?? null,
    };
  }
}
