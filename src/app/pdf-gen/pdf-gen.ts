import { Component, ElementRef, OnInit } from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as d3 from 'd3';
import * as d3_save_pdf from 'd3-save-pdf';


import "../../assets/fonts/SourceHanSans-normal.js";
import "../../assets/fonts/SourceHanSans-bold.js";

@Component({
  selector: 'app-pdf-gen',
  imports: [],
  templateUrl: './pdf-gen.html',
  styleUrl: './pdf-gen.scss',
})
export class PdfGen implements OnInit {
  constructor(private element: ElementRef) { }
  arc = d3.arc()({
    innerRadius: 0,
    outerRadius: 50,
    startAngle: Math.PI * 0.25,
    endAngle: Math.PI * 1.75
  })
  updateSvg() {
    const svg = d3.select(this.element.nativeElement).select('svg');
    console.log(svg);
    svg.selectAll('path').nodes().forEach((d: d3.BaseType, i) => {
      d3.select(d)
        .attr('d', this.arc)
        .style('fill', '#2196F3')
        .style('stroke', '#1f19d2ff')
        .style('stroke-width', '2')
        .transition()
        .duration(1000)
        .attrTween('transform',()=>(t:number)=>`translate(${100*t},${100*t}) rotate(${t*360+i*45})`);
    })
    svg.selectAll('text').nodes().forEach((d: d3.BaseType,i) => {
      d3.select(d)
        .text('New text ')
        .style('font-size', 'x-large')
        .style('font-style', 'oblique')
        .style('font-weight', 'bold')
        .attr('x', 0  )
        .attr('y', 0  )
        .transition()
        .duration(1000)
        .attrTween('transform',()=>(t:number)=>`translate(${60+this.rotc(i)},${100+this.rots(i)})rotate(${t*360+i*45})`);
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.updateSvg();
    }, 500);
  }

  translatehack = (x = 0, y = 0) => `translate(${x},${y})`;
  pics = [0, 1, 2, 3, 4, 5, 6, 7] as Array<number>
  rotc=(a:number)=>a*Math.cos(Math.PI/4);
  rots=(a:number)=>a*Math.sin(Math.PI/4);
  newpfd() {
    console.log('generating pdf');
    var config = {
      filename: 'customFileName',
    }
    d3_save_pdf.embedRasterImages(d3.select('svg').node() as SVGAElement);
    d3_save_pdf.save(d3.select('svg').node() as SVGAElement, config);

    /* const doc = new jsPDF();
   
     // Capture the SVG from the DOM
     const svgElement = d3.select(this.element.nativeElement).select('svg');
     const svgString = new XMLSerializer().serializeToString(svgElement.node() as Node);
     const base64 = btoa(svgString);
     
     // Add SVG image to PDF
     doc.addImage(`data:image/svg+xml;base64,${base64}`, 'SVG', 10, 10, 190, 100);
     doc.save("svg.pdf");*/
  }
  /* async generatePDF() {
       this.updateSvg();
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
     }*/
}
