import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductDialogComponent } from './order-product-dialog.component';

describe('OrderProductDialogComponent', () => {
  let component: OrderProductDialogComponent;
  let fixture: ComponentFixture<OrderProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
