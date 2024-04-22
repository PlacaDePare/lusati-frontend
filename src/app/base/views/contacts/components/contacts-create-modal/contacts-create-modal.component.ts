import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

// Models
import { ContactsModel } from '../../models/contacts.model';
import { DefaultRegister } from 'src/app/core/models/default-register.model';
import { ContactsFormGroup } from '../../models/contacts.formgroup';

// Providers
import { FormValidator } from 'src/app/core/services/form-validator.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import {
  ContactsService,
  SyncInterface,
} from 'src/app/base/services/contacts.service';
import { finalize, take } from 'rxjs';
import { GroupService } from 'src/app/base/services/groups.service';

@Component({
  selector: 'app-contacts-create-modal',
  templateUrl: './contacts-create-modal.component.html',
  styleUrls: ['./contacts-create-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class ContactsCreateModalComponent
  extends DefaultRegister
  implements OnInit
{
  @Input() model: ContactsModel = new ContactsModel();
  @Input() op: string = 'Register';
  userBox: Array<any> = [];

  typesBox: Array<any> = [];

  typesOn: boolean = false;
  addTypeValue: string | null = null;

  activeTab: number = 1;

  groups: any = [];

  // checkValues: Array<any> = [0, 0];

  constructor(
    public activeModal: NgbActiveModal,
    public formValidator: FormValidator,
    private overlay: OverlayService,
    private service: ContactsService,
    private groupService: GroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.operation = this.op;

    if (this.op === 'Edit') {
      this.getById();
    }

    this.initForm();
  }

  getById(): void {
    this.service
      .show(this.model.id)
      .pipe(
        finalize(() => {}),
        take(1)
      )
      .subscribe({
        next: (e) => {
          this.groupService.combo().subscribe((response) => {
            this.groups = response.map((item: any) => {
              return {
                ...item,
                active: e.gruposcontatos.some(
                  (group: any) => group.id === item.id
                ),
              };
            });
          });
        },
      });
  }

  initForm(): void {
    this.form = new FormBuilder().group(
      ContactsFormGroup.toFormGroup(this.model)
    );
  }

  save(): void {
    if (this.activeTab === 1) {
      if (this.form.invalid) {
        this.overlay.error(
          'Ops... Complete os campos obrigatórios antes de enviar!'
        );
        return;
      }

      const model = this.form.getRawValue();

      if (this.operation === 'Edit') {
        this.service.edit(model).subscribe((response: any) => {
          this.activeModal.close('complete');
        });
      } else {
        this.service.create(model).subscribe((response: any) => {
          this.activeModal.close('complete');
        });
      }
    } else {
      const filtered: Array<any> = this.groups.filter(
        (item: any) => item.active === true
      );

      const sync: SyncInterface = {
        contactId: this.model.id,
        groupIds: filtered.map((item) => {
          return item.id;
        }),
      };

      this.service.sync(sync).subscribe((response) => {
        this.activeModal.close('complete');
      });
    }
  }
}
