import { FarmerDTO, farmerRequiredFields } from '../../../dto/farmer.dto';
import { InvalidFieldsError } from '../../../errors/resourse-errors';
import { FarmerMapper } from '../../../mappers/farmer.mapper';
import { Farmer } from '../../../models/farmer.model';
import { FarmerRepository } from '../../../repositories/farmer.repository';
import { FarmerBaseService } from '../../../services/impl/farmer.base.service';
import { getFarmerDTOStub, getFarmerListStub, getFarmerStub } from '../../mocks/farmer.mock';

describe('FarmerBaseService', () => {
  let farmerBaseService: FarmerBaseService;
  let farmerRepository: jest.Mocked<FarmerRepository>;
  let farmerMapper: jest.Mocked<FarmerMapper>;

  beforeEach(() => {
    jest.clearAllMocks();

    farmerRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    farmerMapper = {
      fromEntity: jest.fn(),
      toEntity: jest.fn(),
      toUnpersistedFarmer: jest.fn(),
    };

    farmerBaseService = new FarmerBaseService(farmerRepository, farmerMapper);
  });

  describe('#create', () => {
    it('should create and return the new record given valid farmer DTO', async () => {
      const farmerDTO: FarmerDTO = getFarmerDTOStub();
      const createdFarmer: Farmer = getFarmerStub();
      const createdFarmerDTO: FarmerDTO = getFarmerDTOStub();

      farmerRepository.create.mockResolvedValueOnce(createdFarmer);
      farmerMapper.fromEntity.mockReturnValueOnce(createdFarmerDTO);

      const returnedFarmerDTO: FarmerDTO = await farmerBaseService.create(farmerDTO);

      expect(returnedFarmerDTO).toBe(createdFarmerDTO);
    });

    it('should throw invalid fields error given null farmer DTO', async () => {
      await expect(farmerBaseService.create(null)).rejects.toThrow(InvalidFieldsError);
    });

    it.each(farmerRequiredFields)(
      'should throw invalid fields error given farmer DTO with null `%p` field',
      async (requiredField: keyof FarmerDTO) => {
        const farmerDTO: FarmerDTO = {
          ...getFarmerDTOStub(),
          [requiredField]: null,
        };

        await expect(farmerBaseService.create(farmerDTO)).rejects.toThrow(InvalidFieldsError);
      }
    );
  });

  describe('#findAll', () => {
    it('should return all farmer records from repository', async () => {
      const farmerListStub: Farmer[] = getFarmerListStub();
      const farmerDTO: FarmerDTO = getFarmerDTOStub();

      farmerRepository.findAll.mockResolvedValueOnce(farmerListStub);
      farmerMapper.fromEntity.mockReturnValueOnce(farmerDTO);

      const returnedFarmers: FarmerDTO[] = await farmerBaseService.findAll();

      expect(returnedFarmers).toContain(farmerDTO);
      expect(returnedFarmers.length).toEqual(farmerListStub.length);
      expect(farmerMapper.fromEntity).toHaveBeenCalledTimes(farmerListStub.length);
    });
  });

  describe('#findOne', () => {
    it('should return farmer record from repository given valid ID', async () => {
      const validFarmerId = 1;
      const farmerDTO: FarmerDTO = getFarmerDTOStub();

      farmerMapper.fromEntity.mockReturnValueOnce(farmerDTO);

      expect(farmerBaseService.findOne(validFarmerId)).resolves.toEqual(farmerDTO);
    });

    it('should throw invalid fields error given null farmer ID', async () => {
      await expect(farmerBaseService.findOne(null)).rejects.toThrow(InvalidFieldsError);
    });
  });

  describe('#update', () => {
    it('should update and return the updated record given valid farmer DTO', async () => {
      const farmerDTO: FarmerDTO = getFarmerDTOStub();
      const updatedFarmer: Farmer = getFarmerStub();
      const updatedFarmerDTO: FarmerDTO = getFarmerDTOStub();

      farmerRepository.update.mockResolvedValueOnce(updatedFarmer);
      farmerMapper.fromEntity.mockReturnValueOnce(updatedFarmerDTO);

      const returnedFarmerDTO: FarmerDTO = await farmerBaseService.update(farmerDTO, farmerDTO.id);

      expect(returnedFarmerDTO).toBe(updatedFarmerDTO);
    });

    it('should throw invalid fields error given null farmer DTO', async () => {
      await expect(farmerBaseService.update(null, 1)).rejects.toThrow(InvalidFieldsError);
    });

    it('should throw invalid fields error given null farmer ID', async () => {
      const farmerDTO: FarmerDTO = getFarmerDTOStub();

      await expect(farmerBaseService.update(farmerDTO, null)).rejects.toThrow(InvalidFieldsError);
    });

    it.each(farmerRequiredFields)(
      'should throw invalid fields error given farmer DTO with null `%p` field',
      async (requiredField: keyof FarmerDTO) => {
        const farmerDTO: FarmerDTO = {
          ...getFarmerDTOStub(),
          [requiredField]: null,
        };

        await expect(farmerBaseService.update(farmerDTO, farmerDTO.id)).rejects.toThrow(
          InvalidFieldsError
        );
      }
    );
  });

  describe('#delete', () => {
    it('should delete farmer record from repository given valid ID', async () => {
      const validFarmerId = 1;

      expect(farmerBaseService.delete(validFarmerId)).resolves.not.toThrow();
    });

    it('should throw invalid fields error given null farmer ID', async () => {
      await expect(farmerBaseService.delete(null)).rejects.toThrow(InvalidFieldsError);
    });
  });
});
