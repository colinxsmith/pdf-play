import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdvprint } from './pdvprint';

describe('Pdvprint', () => {
  let component: Pdvprint;
  let fixture: ComponentFixture<Pdvprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pdvprint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pdvprint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
