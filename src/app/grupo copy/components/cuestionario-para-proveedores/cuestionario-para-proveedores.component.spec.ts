import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioParaProveedoresComponent } from './cuestionario-para-proveedores.component';

describe('CuestionarioParaProveedoresComponent', () => {
  let component: CuestionarioParaProveedoresComponent;
  let fixture: ComponentFixture<CuestionarioParaProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioParaProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioParaProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
