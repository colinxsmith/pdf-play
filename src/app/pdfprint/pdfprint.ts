import { Component, ElementRef, Input } from '@angular/core';
import { PdfSave } from '../../services/pdfsave';


@Component({
  selector: 'app-pdfprint',
  standalone: true,
  templateUrl: './pdfprint.html',
  styleUrls: ['./pdfprint.scss'],
})
export class pdfprint {
  @Input() divelement: HTMLDivElement | null = null;
  @Input() pdfname: string = 'document.pdf';
  @Input() buttontext: string = 'Export to PDF';
  constructor(private pdfsave: PdfSave, private element: ElementRef) { }
  async newpdf(): Promise<void> { 
    try {
      await this.pdfsave.exportToPdf(this.divelement, this.pdfname, 10, 300);
    } catch (error) {
      console.error('PDF export failed:', error);
    }
  }

}
