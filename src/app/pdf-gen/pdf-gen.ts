import { Component, ElementRef ,OnInit} from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as d3 from 'd3';


import "../../assets/fonts/SourceHanSans-normal.js";
import "../../assets/fonts/SourceHanSans-bold.js";

@Component({
  selector: 'app-pdf-gen',
  imports: [],
  templateUrl: './pdf-gen.html',
  styleUrl: './pdf-gen.scss',
})
export class PdfGen implements OnInit {
  constructor(private element: ElementRef) {   }
  ngOnInit(): void {
    const svg = d3.select(this.element.nativeElement).select('svg')
    setTimeout(() => {
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(50)
      .startAngle(Math.PI * 0.25)
      .endAngle(Math.PI * 1.75);
    console.log(arc);
      svg.select('path')
        .attr('d', arc as any)
        .attr('transform', 'translate(100,100)')
        .style('fill', '#2196F3')
        .style('stroke', '#1f19d2ff')
        .style('stroke-width', '2');
    }, 0);
    svg.select('text')
        .style('font-size','x-large')
        .style('font-style','oblique')
        .style('font-weight','bold')
        .text('New text ');
  }
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
