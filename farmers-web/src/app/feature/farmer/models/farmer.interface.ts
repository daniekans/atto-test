export interface Farmer {
  id: number;
  companyName: string;
  tradingName: string;
  personIdentification: string;
  city: string;
  state: string;
  phoneNumber: string | null;
}

export type UnpersistedFarmer = Omit<Farmer, 'id'>;
