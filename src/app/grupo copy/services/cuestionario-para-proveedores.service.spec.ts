import { TestBed } from '@angular/core/testing';

import { CuestionarioParaProveedoresService } from './cuestionario-para-proveedores.service';

describe('CuestionarioParaProveedoresService', () => {
  let service: CuestionarioParaProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioParaProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
