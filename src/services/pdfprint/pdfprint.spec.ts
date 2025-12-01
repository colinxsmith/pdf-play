import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pdfprint } from './pdfprint';

describe('pdfprint', () => {
  let component: pdfprint;
  let fixture: ComponentFixture<pdfprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pdfprint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pdfprint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
