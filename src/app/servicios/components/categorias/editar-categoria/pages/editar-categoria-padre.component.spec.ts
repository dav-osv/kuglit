import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaPadreComponent } from './editar-categoria-padre.component';

describe('EditarCategoriaPadreComponent', () => {
  let component: EditarCategoriaPadreComponent;
  let fixture: ComponentFixture<EditarCategoriaPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
