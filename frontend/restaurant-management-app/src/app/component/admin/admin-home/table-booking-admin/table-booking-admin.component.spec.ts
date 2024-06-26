import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingAdminComponent } from './table-booking-admin.component';

describe('TableBookingAdminComponent', () => {
  let component: TableBookingAdminComponent;
  let fixture: ComponentFixture<TableBookingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBookingAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableBookingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
