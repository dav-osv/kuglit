import { TestBed } from '@angular/core/testing';

import { CuestionarioParaOrdenesService } from './cuestionario-para-ordenes.service';

describe('CuestionarioParaOrdenesService', () => {
  let service: CuestionarioParaOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioParaOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
