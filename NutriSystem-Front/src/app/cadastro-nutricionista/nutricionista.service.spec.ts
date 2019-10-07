import { TestBed } from '@angular/core/testing';

import { NutricionistaService } from './nutricionista.service';

describe('NutricionistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutricionistaService = TestBed.get(NutricionistaService);
    expect(service).toBeTruthy();
  });
});
