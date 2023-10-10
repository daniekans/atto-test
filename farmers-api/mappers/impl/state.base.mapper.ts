import { StateDTO } from '../../dto/state.dto';
import { State } from '../../models/state.model';
import { StateMapper } from '../state.mapper';

export class StateBaseMapper implements StateMapper {
  toEntity(dto: StateDTO): State {
    return State.build({
      id: dto.id,
      code: dto.code,
      name: dto.name,
    });
  }

  fromEntity(entity: State): StateDTO {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
    };
  }
}
