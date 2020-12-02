import { TestBed } from '@angular/core/testing';

import { IndicadoresViolenciaService } from './indicadores-violencia.service';

describe('IndicadoresViolenciaService', () => {
  let service: IndicadoresViolenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadoresViolenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
