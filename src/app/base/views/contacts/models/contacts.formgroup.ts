import { Validators } from '@angular/forms';
import { ContactsModel } from './contacts.model';

// Models

export class ContactsFormGroup {
	static toFormGroup(model: ContactsModel) {
		return {
			id: [model.id, []],
			dsContato: [model.dsContato, [Validators.required, Validators.minLength(3)]],
      nrCelular: [model.nrCelular, [Validators.required]],
      dsEmail: [model.dsEmail, [Validators.required, Validators.email]],
      stAtivo: [model.stAtivo, []]
		}
	}
}
