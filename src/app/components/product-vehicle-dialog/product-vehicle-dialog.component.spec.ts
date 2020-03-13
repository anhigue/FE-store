import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVehicleDialogComponent } from './product-vehicle-dialog.component';

describe('ProductVehicleDialogComponent', () => {
  let component: ProductVehicleDialogComponent;
  let fixture: ComponentFixture<ProductVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
