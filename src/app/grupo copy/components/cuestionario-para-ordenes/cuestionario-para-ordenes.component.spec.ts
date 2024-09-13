import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioParaOrdenesComponent } from './cuestionario-para-ordenes.component';

describe('CuestionarioParaOrdenesComponent', () => {
  let component: CuestionarioParaOrdenesComponent;
  let fixture: ComponentFixture<CuestionarioParaOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioParaOrdenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioParaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
