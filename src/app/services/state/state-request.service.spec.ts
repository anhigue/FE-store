import { TestBed } from '@angular/core/testing';

import { StateRequestService } from './state-request.service';

describe('StateRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateRequestService = TestBed.get(StateRequestService);
    expect(service).toBeTruthy();
  });
});
