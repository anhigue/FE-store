import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockDialogComponent } from './product-stock-dialog.component';

describe('ProductStockDialogComponent', () => {
  let component: ProductStockDialogComponent;
  let fixture: ComponentFixture<ProductStockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
