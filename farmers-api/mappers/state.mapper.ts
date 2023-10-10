import { StateDTO } from '../dto/state.dto';
import { State } from '../models/state.model';
import { Mapper } from './mapper.interface';

export interface StateMapper extends Mapper<State, StateDTO> {}
