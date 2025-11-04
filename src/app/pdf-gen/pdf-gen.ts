import { Component } from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../../assets/fonts/SourceHanSans-normal.js";
import "../../assets/fonts/SourceHanSans-bold.js";

@Component({
  selector: 'app-pdf-gen',
  imports: [],
  templateUrl: './pdf-gen.html',
  styleUrl: './pdf-gen.scss',
})
export class PdfGen {
  async generatePDF() {
    const doc = new jsPDF();
    
  doc.setFont('SourceHanSans');
    doc.setFontSize(16);
    doc.text("My Angular PDF Generator", 10, 10);
    doc.setFontSize(12);
    doc.text("This is a comprehensive guide on generating PDFs with Angular.", 10, 20);
    const headers = [["Name", "Email", "Country"]];
    const data = [
      ["Colin Smith", "colin.smith@corfinancialgroup.com", "England"],
      ["スミス晶子", "akiko.smith@gmail.com", "Japan"],
    ];
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
      styles: {
      font: 'SourceHanSans',
      fontStyle: 'normal',
      overflow: 'linebreak', // Enable text wrapping
    },
    headStyles: {
      fontStyle: 'bold',
    },
    });
    doc.save("table.pdf");
  }
}
