import { TestBed } from '@angular/core/testing';

import { PdfSave } from './pdfsave';

describe('PdfSave', () => {
  let service: PdfSave;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfSave);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
