import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsDialogComponent } from './subs-dialog.component';

describe('SubsDialogComponent', () => {
  let component: SubsDialogComponent;
  let fixture: ComponentFixture<SubsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
