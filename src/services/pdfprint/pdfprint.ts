import { Component, Input } from '@angular/core';
import { PdfSave } from '../../services/pdfsave';


@Component({
  selector: 'app-pdfprint',
  standalone: true,
  templateUrl: './pdfprint.html',
  styleUrls: ['./pdfprint.scss'],
})
export class pdfprint {
  @Input() printarea: HTMLDivElement | null = null;
  @Input() pdfname: string = 'document.pdf';
  @Input() buttontext: string = 'Export to PDF';
  constructor(private pdfsave: PdfSave) { }
  async newpdf(): Promise<void> { 
    try {
      await this.pdfsave.exportToPdf(this.printarea, this.pdfname, 10, 300);
    } catch (error) {
      console.error('PDF export failed:', error);
    }
  }

}
