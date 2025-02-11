import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGruposComponent } from './listado-grupos.component';

describe('ListadoGruposComponent', () => {
  let component: ListadoGruposComponent;
  let fixture: ComponentFixture<ListadoGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
