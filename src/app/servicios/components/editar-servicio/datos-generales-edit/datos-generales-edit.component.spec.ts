import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesEditComponent } from './datos-generales-edit.component';

describe('DatosGeneralesEditComponent', () => {
  let component: DatosGeneralesEditComponent;
  let fixture: ComponentFixture<DatosGeneralesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosGeneralesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
