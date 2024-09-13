import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioParaActivosComponent } from './cuestionario-para-activos.component';

describe('CuestionarioParaActivosComponent', () => {
  let component: CuestionarioParaActivosComponent;
  let fixture: ComponentFixture<CuestionarioParaActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioParaActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioParaActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
