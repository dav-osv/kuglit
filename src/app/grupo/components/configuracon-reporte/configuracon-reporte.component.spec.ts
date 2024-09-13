import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguraconReporteComponent } from './configuracon-reporte.component';

describe('ConfiguraconReporteComponent', () => {
  let component: ConfiguraconReporteComponent;
  let fixture: ComponentFixture<ConfiguraconReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguraconReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguraconReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
