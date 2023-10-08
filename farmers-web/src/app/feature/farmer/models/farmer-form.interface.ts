import { FormControl } from '@angular/forms';

export interface FarmerForm {
  companyName: FormControl<string>;
  tradingName: FormControl<string>;
  identification: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  phoneNumber: FormControl<string>;
}
