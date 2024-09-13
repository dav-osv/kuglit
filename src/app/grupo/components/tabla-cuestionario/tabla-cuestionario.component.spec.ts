import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCuestionarioComponent } from './tabla-cuestionario.component';

describe('TablaCuestionarioComponent', () => {
  let component: TablaCuestionarioComponent;
  let fixture: ComponentFixture<TablaCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCuestionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
