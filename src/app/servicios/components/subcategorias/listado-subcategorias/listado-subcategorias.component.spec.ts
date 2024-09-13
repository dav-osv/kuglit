import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSubcategoriasComponent } from './listado-subcategorias.component';

describe('ListadoSubcategoriasComponent', () => {
  let component: ListadoSubcategoriasComponent;
  let fixture: ComponentFixture<ListadoSubcategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoSubcategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
