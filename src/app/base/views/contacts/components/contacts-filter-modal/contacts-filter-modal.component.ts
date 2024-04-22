import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

// Models
import { ContactsFilterFormGroup } from '../../models/contacts-filter.formgroup';

@Component({
  selector: 'app-contacts-filter-modal',
  templateUrl: './contacts-filter-modal.component.html',
  styleUrls: ['./contacts-filter-modal.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ right: -420, opacity: 1 }),
        animate('0.4s ease-out', style({ right: 0, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ right: 0, opacity: 1 }),
        animate('0.4s ease-in', style({ right: -420, opacity: 1 })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ContactsFilterModalComponent implements OnInit {
  @Input() filterOn: boolean = false;

  @Output() filterHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup = new FormGroup({});

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
        // clicked outside => close dropdown list
     this.closeFilter()
     }
  }

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = new FormBuilder().group(
      ContactsFilterFormGroup.toFormGroup()
    );
  }

  emmitFilter(): void {
    const model = this.filterForm.getRawValue();

    this.filterHandler.emit(model);
  }

  closeFilter(): void {
    this.filterOn = false;
    this.close.emit(false);
  }

  resetFilter(): void {
    this.filterForm.reset();

    this.emmitFilter();
  }
}
