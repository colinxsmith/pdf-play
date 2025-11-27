import { Component, ElementRef, Input } from '@angular/core';
import { PdfSave } from '../../services/pdfsave';


@Component({
  selector: 'app-pdvprint',
  standalone: true,
  templateUrl: './pdvprint.html',
  styleUrls: ['./pdvprint.scss'],
})
export class Pdvprint {
  @Input() divelement: HTMLDivElement | null = null;
  @Input() pdfname: string = 'document.pdf';
  constructor(private pdfsave: PdfSave, private element: ElementRef) { }
  async newpdf(): Promise<void> { 
    try {
      await this.pdfsave.exportToPdf(this.divelement, this.pdfname, 10, 300);
    } catch (error) {
      console.error('PDF export failed:', error);
    }
  }

}
