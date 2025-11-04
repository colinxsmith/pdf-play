import { Component } from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-pdf-gen',
  imports: [],
  templateUrl: './pdf-gen.html',
  styleUrl: './pdf-gen.scss',
})
export class PdfGen {
  generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("My Angular PDF Generator", 10, 10);
    doc.setFontSize(12);
    doc.text("This is a comprehensive guide on generating PDFs with Angular.", 10, 20);
    const headers = [["Name", "Email", "Country"]];
    const data = [
      ["David", "david@example.com", "Sweden"],
      ["Castille", "castille@example.com", "Spain"],
    ];
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });
    doc.save("table.pdf");
  }
}
