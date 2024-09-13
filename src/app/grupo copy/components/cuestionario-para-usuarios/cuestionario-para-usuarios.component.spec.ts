import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioParaUsuariosComponent } from './cuestionario-para-usuarios.component';

describe('CuestionarioParaUsuariosComponent', () => {
  let component: CuestionarioParaUsuariosComponent;
  let fixture: ComponentFixture<CuestionarioParaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioParaUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioParaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
