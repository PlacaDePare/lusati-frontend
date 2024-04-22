import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCreateModalComponent } from './contacts-create-modal.component';

describe('ContactsCreateModalComponent', () => {
  let component: ContactsCreateModalComponent;
  let fixture: ComponentFixture<ContactsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
