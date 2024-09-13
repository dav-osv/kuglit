import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioLiberacionesComponent } from './calendario-liberaciones.component';

describe('CalendarioLiberacionesComponent', () => {
  let component: CalendarioLiberacionesComponent;
  let fixture: ComponentFixture<CalendarioLiberacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioLiberacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioLiberacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
