import { Farmer, UnpersistedFarmer } from '../../../models/farmer.interface';

export const getFarmerListStub: () => Farmer[] = () => [
  {
    id: 1,
    companyName: 'Company Name A',
    tradingName: 'Trading Name A',
    personIdentification: '91459083000137',
    city: 'Goiânia',
    stateId: 10,
    phoneNumber: '(83) 99247-2958',
  },
  {
    id: 2,
    companyName: 'Company Name B',
    tradingName: 'Trading Name B',
    personIdentification: '97871647296',
    city: 'Cuiabá',
    stateId: 20,
    phoneNumber: '(96) 98323-3422',
  },
  {
    id: 3,
    companyName: 'Company Name C',
    tradingName: 'Trading Name C',
    personIdentification: '69255079000106',
    city: 'Fortaleza',
    stateId: 30,
    phoneNumber: null,
  },
];

export const getFarmerStub: () => Farmer = () => ({
  id: 1,
  companyName: 'Company Name A',
  tradingName: 'Trading Name A',
  personIdentification: '91459083000137',
  city: 'Goiânia',
  stateId: 10,
  phoneNumber: '(83) 99247-2958',
});

export const getUnpersistedFarmerStub: () => UnpersistedFarmer = () => ({
  companyName: 'Company Name A',
  tradingName: 'Trading Name A',
  personIdentification: '91459083000137',
  city: 'Goiânia',
  stateId: 10,
  phoneNumber: '(83) 99247-2958',
});
