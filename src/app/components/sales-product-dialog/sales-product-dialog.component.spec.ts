import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductDialogComponent } from './sales-product-dialog.component';

describe('SalesProductDialogComponent', () => {
  let component: SalesProductDialogComponent;
  let fixture: ComponentFixture<SalesProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
