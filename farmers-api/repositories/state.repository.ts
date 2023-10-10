import { State } from '../models/state.model';

export interface StateRepository {
  findAll(): Promise<State[]>;
}
