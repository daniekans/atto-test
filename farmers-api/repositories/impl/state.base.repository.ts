import { State } from '../../models/state.model';
import { StateRepository } from '../state.repository';

export class StateBaseRepository implements StateRepository {
  async findAll(): Promise<State[]> {
    return State.findAll();
  }
}
