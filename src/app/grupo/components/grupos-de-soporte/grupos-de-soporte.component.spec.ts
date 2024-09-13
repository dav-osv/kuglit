import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposDeSoporteComponent } from './grupos-de-soporte.component';

describe('GruposDeSoporteComponent', () => {
  let component: GruposDeSoporteComponent;
  let fixture: ComponentFixture<GruposDeSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposDeSoporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposDeSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
