import { Validators } from '@angular/forms';

export class ContactsFilterFormGroup {
  static toFormGroup() {
    return {
      name: [, []],
      status: [, []],
    };
  }
}
