import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { State } from 'src/app/feature/state/models/state.model';
import { StateService } from 'src/app/feature/state/services/state.service';
import { CpfCnpjValidator } from 'src/app/shared/validators/cpf-cnpj.validator';
import { FarmerForm } from '../../models/farmer-form.interface';
import { Farmer, UnpersistedFarmer } from '../../models/farmer.interface';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-form-dialog',
  templateUrl: './farmer-form-dialog.component.html',
  styleUrls: ['./farmer-form-dialog.component.scss'],
})
export class FarmerFormDialogComponent implements OnInit {
  formGroup!: FormGroup<FarmerForm>;
  allStates$: Observable<State[]> | undefined;
  isEditMode = false;
  hasDuplicatedIdentificationError = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FarmerFormDialogComponent>,
    private farmerService: FarmerService,
    private stateService: StateService,
    @Inject(MAT_DIALOG_DATA) private farmer?: Farmer
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.farmer != null;
    this.allStates$ = this.stateService.findAllStates();
    this.buildForm(this.farmer);
  }

  buildForm(farmer?: Farmer): void {
    this.formGroup = this.fb.nonNullable.group({
      companyName: [farmer?.companyName ?? '', [Validators.required]],
      tradingName: [farmer?.tradingName ?? '', [Validators.required]],
      identification: [
        farmer?.personIdentification ?? '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          CpfCnpjValidator.validate,
          this.validateDuplicatedPersonIdentification.bind(this),
        ],
      ],
      city: [farmer?.city ?? '', [Validators.required, Validators.maxLength(50)]],
      stateId: [{ value: farmer?.stateId ?? null, disabled: false }, [Validators.required]],
      phoneNumber: [farmer?.phoneNumber ?? ''],
    });
  }

  onIdentificationFieldChanged(): void {
    this.hasDuplicatedIdentificationError = false;
  }

  onSubmit(): void {
    this.closeAndReturnFarmerData();
  }

  validateDuplicatedPersonIdentification(field: AbstractControl): { duplicated: boolean } | null {
    if (
      (this.farmer == null || this.farmer.personIdentification !== field.value) &&
      this.farmerService.hasAnyFarmerWithIdentification(field.value)
    ) {
      return { duplicated: true };
    }

    return null;
  }

  closeAndReturnFarmerData(): void {
    const formValue = this.formGroup.getRawValue();

    if (formValue.stateId == null) {
      return;
    }

    const submitedFarmer: UnpersistedFarmer = {
      companyName: formValue.companyName,
      tradingName: formValue.tradingName,
      personIdentification: formValue.identification,
      city: formValue.city,
      stateId: formValue.stateId,
      phoneNumber: formValue.phoneNumber,
    };

    if (this.farmer) {
      (submitedFarmer as Farmer).id = this.farmer.id;
    }

    this.dialogRef.close(submitedFarmer);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
