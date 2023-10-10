import { StateDTO } from '../dto/state.dto';

export interface StateService {
  findAll(): Promise<StateDTO[]>;
}
