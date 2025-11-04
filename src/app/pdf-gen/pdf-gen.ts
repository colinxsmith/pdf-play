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
  async generatePDF() {
    const doc = new jsPDF();
    //The following is supposed to handle Japanese fonts, but it's not working yet.
  /*  const fontPath = 'assets/fonts/ms-pgothic-regular.ttf';
    const fontResponse = await fetch(fontPath);
    const fontData = await fontResponse.arrayBuffer();

       // Convert ArrayBuffer to base64
    function arrayBufferToBase64(buffer: ArrayBuffer): string {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }
    const fontBase64 = arrayBufferToBase64(fontData);

    doc.addFileToVFS("ms-pgothic-regular.ttf", fontBase64);
    doc.addFont("ms-pgothic-regular.ttf", "ms pgothic", "normal");

    // Set the font for Japanese text
    doc.setFont("ms pgothic", "normal");*/
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
    });
    doc.save("table.pdf");
  }
}
