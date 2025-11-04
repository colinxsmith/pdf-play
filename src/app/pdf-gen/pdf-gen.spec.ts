import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGen } from './pdf-gen';

describe('PdfGen', () => {
  let component: PdfGen;
  let fixture: ComponentFixture<PdfGen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfGen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfGen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
