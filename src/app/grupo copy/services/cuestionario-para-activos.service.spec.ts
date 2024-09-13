import { TestBed } from '@angular/core/testing';

import { CuestionarioParaActivosService } from './cuestionario-para-activos.service';

describe('CuestionarioParaActivosService', () => {
  let service: CuestionarioParaActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioParaActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
