import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

export class CpfCnpjValidator implements Validator {
  static buildDigit(arr: number[]): number {
    const isCpf: boolean = arr.length < CPF_LENGTH;
    const digit: number =
      arr
        .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
        .reduce((total, current) => total + current) % CPF_LENGTH;

    if (digit < 2) {
      return 0;
    }

    return CPF_LENGTH - digit;
  }

  static validate(c: AbstractControl): ValidationErrors | null {
    const cpfCnpj = c.value.replace(/\D/g, '');

    if ([CPF_LENGTH, CNPJ_LENGTH].indexOf(cpfCnpj.length) < 0) {
      return { length: true };
    }

    if (/^([0-9])\1*$/.test(cpfCnpj)) {
      return { equalDigits: true };
    }

    const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));

    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
      return { digit: true };
    }

    return null;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return CpfCnpjValidator.validate(c);
  }
}
