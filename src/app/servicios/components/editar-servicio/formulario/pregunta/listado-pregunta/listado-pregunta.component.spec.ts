import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPreguntaComponent } from './listado-pregunta.component';

describe('ListadoPreguntaComponent', () => {
  let component: ListadoPreguntaComponent;
  let fixture: ComponentFixture<ListadoPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
