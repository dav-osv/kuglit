import { TestBed } from '@angular/core/testing';

import { CuestionarioParaUsuariosService } from './cuestionario-para-usuarios.service';

describe('CuestionarioParaUsuariosService', () => {
  let service: CuestionarioParaUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioParaUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
