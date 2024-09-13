import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SLASComponent } from './slas.component';

describe('SLASComponent', () => {
  let component: SLASComponent;
  let fixture: ComponentFixture<SLASComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SLASComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SLASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
