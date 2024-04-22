import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

export interface IBoxDefault {
  id: number;
  text: string
}

export class DefaultRegister {

	// Vars
	operation: string = 'Register';
	readonly: boolean = true;
  form: FormGroup = new FormGroup({});
  id: any;
	// Masks

	// Subjects
	protected unsubscribe: Subject<any> = new Subject();

  // Box
  defaultFilter: any = {
    page: 1,
    pageSize: 100,
  };

  disableSave: boolean = false;

	constructor() {

	}

  readonly cnpjMask: string = '00.000.000/0000-00';
  readonly phoneMask: string = '(00) 00000-0000'

  operationChange(name: string): string {
    switch(name) {
      case 'Register':
        return 'Cadastrar';
      case 'Edit':
        return 'Editar';
      default:
        return name;
    }
  }

	getActualRoute(url: string) {

		// Achou Cadastrar
		if (url.indexOf('register') != -1) {
			this.operation = 'Register';
			return 'Register';
		}

		// Achou Editar
		if (url.indexOf('edit') != -1) {
			this.operation = 'Edit';
			return 'Edit';
		}

		if (url.indexOf('view') != -1) {
			this.operation = 'View';
			return 'View';
		}


    return null;
	}

	patchFormValue(form: FormGroup, control: string, value: any) {

		form.patchValue({ [control]: value });
	}
}
