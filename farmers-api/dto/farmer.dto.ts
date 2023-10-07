export interface FarmerDTO {
  id: number;
  companyName: string;
  tradingName: string;
  personIdentification: string;
  city: string;
  state: string;
  phoneNumber: string | null;
}

export const farmerRequiredFields: Array<keyof FarmerDTO> = [
  'companyName',
  'tradingName',
  'personIdentification',
  'city',
  'state',
];
