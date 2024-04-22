import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwalService } from 'src/app/core/services/swal.service';

// Models
import { DefaultList } from 'src/app/core/models/default-list.model';

// Interfaces
import { ContactTotals, ListContacts } from './interfaces/contacts.interface';

// Components
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { ContactsFilterModalComponent } from './components/contacts-filter-modal/contacts-filter-modal.component';
import { ContactsCreateModalComponent } from './components/contacts-create-modal/contacts-create-modal.component';
import { ContactsService } from '../../services/contacts.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleComponent,
    ContactsFilterModalComponent,
  ],
})
export class ContactsComponent extends DefaultList implements OnInit {
  totals: ContactTotals = {
    total: 11,
    active: 9,
    inactive: 2,
  };

  tableData: ListContacts = [];
  filterValues: any = {};

  constructor(
    private swal: SwalService,
    private modal: NgbModal,
    private service: ContactsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const query: any = {
      page: this.page,
      limit: this.pageSize,
      order: this.order,
      direction: this.orderDirection
    };

    const model = this.filterValues;

    for (const item in model) {
      if (model[item] !== '' && model[item] !== null) {
        query[item] = model[item];
      }
    }

    this.service
      .list(query)
      .pipe(
        finalize(() => {}),
        take(1)
      )
      .subscribe({
        next: (e) => {
          // if (e.length <= 0) {
          //   this.listEmpty = true;
          //   return;
          // }
          this.total = Number(e.contacts.meta.total);
          this.tableData = e.contacts.data;
          this.totals = {
            total: e.totalCount,
            active: e.activeCount,
            inactive: e.inactiveCount,
          };
        },
      });
  }

  filterChange(event: any): void {
    this.filterValues = event;
    this.search();
  }

  deleteItem(data: any): void {
    this.swal
      .deleteSwal(
        `Deletar contato`,
        `Você tem certeza que deseja Deletar o contato ${data.dsContato}?`
      )
      .then((result: any) => {
        if (result.isConfirmed) {
          this.service.delete(data).subscribe((response: any) => {
            this.search();
          });
        }
      });
  }

  activeItem(data: any): void {
    const action: string = `${data.st_ativo ? 'Desativar' : 'Ativar'}`;
    this.swal
      .deleteSwal(
        `${action} contato`,
        `Você tem certeza que deseja ${action} o contato ${data.dsContato}?`
      )
      .then((result: any) => {
        if (result.isConfirmed) {
          this.service.status(data).subscribe((response: any) => {
            this.search();
          });
        }
      });
  }

  openModal(model?: any): void {
    const modalRef = this.modal.open(ContactsCreateModalComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title',
    });

    if (model) {
      modalRef.componentInstance.model = model;
      modalRef.componentInstance.op = 'Edit';
    }

    modalRef.result
      .then((value) => {
        if (value === 'complete') {
          this.search();
        }
      })
      .catch((reason) => {});
  }

  setOrder(column: string): void {
    if (this.order === column) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.order = column;
      this.orderDirection = 'desc';
    }

    this.search();
  }
}
