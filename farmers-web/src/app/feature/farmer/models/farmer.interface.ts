export interface Farmer {
  id: number;
  companyName: string;
  tradingName: string;
  personIdentification: string;
  city: string;
  stateId: number;
  phoneNumber: string | null;
}

export type UnpersistedFarmer = Omit<Farmer, 'id'>;
