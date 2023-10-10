import { StateDTO } from '../../dto/state.dto';
import { State } from '../../models/state.model';

export const getStateListStub: () => State[] = () =>
  [
    {
      id: 1,
      code: 'GO',
      name: 'Goiás',
    },
    {
      id: 2,
      code: 'MT',
      name: 'Mato Grosso',
    },
    {
      id: 3,
      code: 'CE',
      name: 'Ceará',
    },
  ] as State[];

export const getStateDTOStub: () => StateDTO = () => ({
  id: 1,
  code: 'GO',
  name: 'Goiás',
});
