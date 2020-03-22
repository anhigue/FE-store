import { TestBed } from '@angular/core/testing';

import { StateOrderService } from './state-order.service';

describe('StateOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateOrderService = TestBed.get(StateOrderService);
    expect(service).toBeTruthy();
  });
});
