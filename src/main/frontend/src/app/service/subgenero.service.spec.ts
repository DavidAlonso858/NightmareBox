import { TestBed } from '@angular/core/testing';

import { SubgeneroService } from './subgenero.service';

describe('SubgeneroService', () => {
  let service: SubgeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubgeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
