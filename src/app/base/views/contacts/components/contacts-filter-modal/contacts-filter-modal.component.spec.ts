import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsFilterModalComponent } from './contacts-filter-modal.component';

describe('ContactsFilterModalComponent', () => {
  let component: ContactsFilterModalComponent;
  let fixture: ComponentFixture<ContactsFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsFilterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
