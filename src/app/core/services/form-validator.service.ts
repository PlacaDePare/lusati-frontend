import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class FormValidator {

	constructor(private formBuilder: FormBuilder) { }

	public validateAllFormFields(formGroup: any) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl && control.enabled) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup || control instanceof FormArray) {
				this.validateAllFormFields(control);
			}
		});
	}

	public isFieldValid(field: string, form: FormGroup) {
		if (!form.get(field)) {
			throw new Error('Não tem o formControlName ' + field);
		}
		return !form.get(field)!.valid && form.get(field)!.touched;
	}

  returnInvalidMessage(field:string, form:FormGroup){
    if(!this.isFieldValid(field,form)){
      return
    }
   return this.getFormControlErrors(form.get(field))
  }

  getFormControlErrors(formControl: any): string | null {
		if (!formControl) {
			return null;
		}
		const formErrors = formControl.errors;

		if (!formErrors) {
			return null;
		}
		if (formErrors['required']) {
			return 'Campo Obrigatório';
		}
    	if (formErrors['email']) {
			return 'Email no formato incorreto';
		}
		if (formErrors['pattern']&&formErrors['pattern'].requiredPattern==='/[!@#$%^&*()-=_+{};:,<.>?]/') {
			return 'O campo deve pelo menos um caractere especial' ;
		}
		if (formErrors['pattern']&&formErrors['pattern'].requiredPattern==='/[0-9]/') {
			return 'O campo deve pelo menos um número' ;
		}
		if (formErrors['pattern']&&formErrors['pattern'].requiredPattern==='/[A-Z]/') {
			return 'O campo deve pelo menos uma letra maiúscula' ;
		}
		if (formErrors['maxlength']) {

			return 'O Campo deve ter no máximo ' + formErrors['maxlength'].requiredLength + ' caractére(s)';
		}

		if (formErrors['minlength']) {

			return 'O Campo deve ter no mínimo ' + formErrors['minlength'].requiredLength + ' caractére(s)';
		}

		if (formErrors['incorrect']) {

			return 'Valor Inválido';
		}

		if (formErrors['invalidDate']) {
			return 'Data Inválida';
		}

		if (formErrors['max']) {
			return 'Valor deve ser menor do que ' + formErrors['max'].max;
		}

		if (formErrors['min']) {
			return 'Valor deve ser maior do que ' + formErrors['min'].min;
		}

   	 	if (formErrors['pattern']&&formErrors['pattern'].requiredPattern==="/^-?[0-9][^\\.]*$/") {
			return 'Somente números inteiros' ;
		}
		if (formErrors['passwordMismatch']) {
			return 'A confirmação de senha não confere';
		}
		//1-letra maiuscula, 1-numero 1caractere especial

		console.log(formErrors)

		return 'Erro desconhecido';
	}

	public isFormControlValid(formControl: FormControl) {

		if (!formControl) {
			throw new Error('Não tem o formControl' + formControl);
		}
		return formControl.valid;
	}

	public displayControlCss(formControl: FormControl): { 'is-invalid': boolean, 'is-valid': boolean } {
		if (!formControl) {
			throw new Error('Não tem o formControl' + formControl);
		}
		return {
			'is-invalid': !this.isFormControlValid(formControl),
			'is-valid': this.isFormControlValid(formControl)
		};
	}



	public displayFieldCss(field: string, form: FormGroup): { 'is-invalid': boolean, 'is-valid': boolean } {
		if (!form.get(field)) {
			throw new Error('Não tem o formControlName ' + field);
		}
		return {
			'is-invalid': this.isFieldValid(field, form),
			'is-valid': !this.isFieldValid(field, form) && form.get(field)!.touched
		};
	}
	public displayLabelCss(field: string, form: FormGroup): { 'has-error-label': boolean, 'has-valid-label': boolean } {
		return {
			'has-error-label': this.isFieldValid(field, form),
			'has-valid-label': !this.isFieldValid(field, form) && form.get(field)!.touched
		};
	}

	public createForm(model: any): FormGroup {
		return this.formBuilder.group(model);
	}

	public createFormGroup(form: any): FormGroup {
		return this.formBuilder.group(form);
	}

	public isAllFieldsValid(formGroup: any): boolean {
		for (const field of Object.keys(formGroup.controls)) {
			const control = formGroup.get(field);
			if (control.valid === false && control.enabled) {
				return false;
			}
		}
		return true;
	}

	public allFormIsValid(formArray: any): boolean {
		for (const form of formArray) {
			if (form.valid === false) {
				return false;
			}
		}
		return true;
	}

	public countFormErros(formGroup: any) {
		return Object.keys(formGroup.controls).filter(field => !formGroup.get(field).valid && formGroup.get(field).enabled).length;
	}

	public formPatchValue(field: any, form: any, value: any) {
		form.get(field).patchValue(value);
	}

	public controlsInvalidFieldsCounter(controls: AbstractControl[]) {
		return controls.filter(control => !control.valid && control.enabled).length;
	}

	public invalidFieldsCounter(form: any, fields: any[] = []) {
		return fields.filter(field => !form.get(field).valid && form.get(field).enabled).length;
	}

	public convertDatePickerToDate(control: AbstractControl) {
		if (control.value && control.value.day && control.value.month && control.value.year) {
			control.patchValue('wfijweofjo');
		}
	}

	getInvalidFields(form: FormGroup) {
		const erros: any = [];
		Object.keys(form.controls).forEach(field => {
			const control = form.get(field);
			if (control!.invalid) {
				erros.push(control);
			}
		});
		return erros;
	}
}
