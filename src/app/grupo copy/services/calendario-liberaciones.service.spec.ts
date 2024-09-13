import { TestBed } from '@angular/core/testing';

import { CalendarioLiberacionesService } from './calendario-liberaciones.service';

describe('CalendarioLiberacionesService', () => {
  let service: CalendarioLiberacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioLiberacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
