import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRequestComponent } from './state-request.component';

describe('StateRequestComponent', () => {
  let component: StateRequestComponent;
  let fixture: ComponentFixture<StateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
