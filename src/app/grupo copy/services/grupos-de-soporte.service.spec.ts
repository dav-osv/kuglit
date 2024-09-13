import { TestBed } from '@angular/core/testing';

import { GruposDeSoporteService } from './grupos-de-soporte.service';

describe('GruposDeSoporteService', () => {
  let service: GruposDeSoporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposDeSoporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
