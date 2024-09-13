import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BardaComponent } from './barda.component';

describe('BardaComponent', () => {
  let component: BardaComponent;
  let fixture: ComponentFixture<BardaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BardaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BardaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
