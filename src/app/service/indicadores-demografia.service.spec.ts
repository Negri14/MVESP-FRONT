import { TestBed } from '@angular/core/testing';

import { IndicadoresDemografiaService } from './indicadores-demografia.service';

describe('IndicadoresDemografiaService', () => {
  let service: IndicadoresDemografiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadoresDemografiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
