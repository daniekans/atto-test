import { StateDTO } from '../../../dto/state.dto';
import { StateMapper } from '../../../mappers/state.mapper';
import { State } from '../../../models/state.model';
import { StateRepository } from '../../../repositories/state.repository';
import { StateBaseService } from '../../../services/impl/state.base.service';
import { getStateDTOStub, getStateListStub } from '../../mocks/state.mock';

describe('StateBaseService', () => {
  let stateBaseService: StateBaseService;
  let stateRepository: jest.Mocked<StateRepository>;
  let stateMapper: jest.Mocked<StateMapper>;

  beforeEach(() => {
    jest.clearAllMocks();

    stateRepository = {
      findAll: jest.fn(),
    };

    stateMapper = {
      fromEntity: jest.fn(),
      toEntity: jest.fn(),
    };

    stateBaseService = new StateBaseService(stateRepository, stateMapper);
  });

  describe('#findAll', () => {
    it('should return all state records from repository', async () => {
      const stateListStub: State[] = getStateListStub();
      const stateDTO: StateDTO = getStateDTOStub();

      stateRepository.findAll.mockResolvedValueOnce(stateListStub);
      stateMapper.fromEntity.mockReturnValueOnce(stateDTO);

      const returnedStates: StateDTO[] = await stateBaseService.findAll();

      expect(returnedStates).toContain(stateDTO);
      expect(returnedStates.length).toEqual(stateListStub.length);
      expect(stateMapper.fromEntity).toHaveBeenCalledTimes(stateListStub.length);
    });
  });
});
