import { StateDTO } from '../../dto/state.dto';
import { StateMapper } from '../../mappers/state.mapper';
import { State } from '../../models/state.model';
import { StateRepository } from '../../repositories/state.repository';
import { StateService } from '../state.service';

export class StateBaseService implements StateService {
  constructor(
    private stateRepository: StateRepository,
    private stateMapper: StateMapper
  ) {}

  async findAll(): Promise<StateDTO[]> {
    const allStates: State[] = await this.stateRepository.findAll();

    return allStates.map(this.stateMapper.fromEntity);
  }
}
