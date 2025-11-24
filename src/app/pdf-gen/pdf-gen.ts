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
    svg.selectAll('g.innerg').nodes().forEach((d: any, i,kk:Array<any>) => {
      console.log(d);
      d3.select(d).select('path')
        .attr('d', this.arc)
        .style('fill', '#2196F3')
        .style('stroke', '#1f19d2ff')
        .style('stroke-width', '5')
        .style('fill', this.colours(i))
        .transition()
        .duration(1000)
        .attrTween('transform', () => (t: number) => `rotate(${-5 * 360 * t})`);
      d3.select(d).select('text')
        .text('New text in ts file')
        .style('font-size', 'x-large')
        .style('font-style', 'oblique')
        .style('font-weight', 'bold')
        .style('fill', this.colours(kk.length-i-1))
        .transition()
        .duration(1000)
        .attrTween('x', () => (t: number) => `${15 - 100 * t}`)
        .attrTween('y', () => (t: number) => `${104 - 100 * t}`);
    });
    d3.selectAll('g.innerg').nodes().forEach((d: d3.BaseType, i) => {
      d3.select(d)
        //  .attr('transform', `translate(100,100)`)
        .transition()
        .duration(1000)
        .attrTween('transform', () => (t: number) => `translate(${100 * t},${100 * t}) rotate(${45 * i + 5 * 360 * t})`);
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateSvg();
    }, 500);
  }

  translatehack = (x = 0, y = 0) => `translate(${x},${y})`;
  pics = [0, 1, 2, 3, 4, 5, 6] as Array<number>
  colours=d3.scaleLinear<string>().range(['yellow', 'magenta']).domain([0, this.pics.length - 1]);
 async newpfd(): Promise<void> {
    const marginMM = 10;            // page margin in mm
    const targetDPI = 150;         // choose 96 (screen), 150, 300 (print quality)
    try {
      const doc = new jsPDF();     // default unit is 'mm' unless changed
      const svgEl = d3.select(this.element.nativeElement).select('svg').node() as SVGSVGElement;
      if (!svgEl) throw new Error('No SVG found');

      // compute SVG source width/height (prefer viewBox, fallback to attributes)
      let svgW = svgEl.viewBox.baseVal && svgEl.viewBox.baseVal.width ? svgEl.viewBox.baseVal.width : 0;
      let svgH = svgEl.viewBox.baseVal && svgEl.viewBox.baseVal.height ? svgEl.viewBox.baseVal.height : 0;
      if (!svgW || !svgH) {
        const attrW = svgEl.getAttribute('width');
        const attrH = svgEl.getAttribute('height');
        svgW = svgW || (attrW ? parseFloat(attrW.toString()) : 800);
        svgH = svgH || (attrH ? parseFloat(attrH.toString()) : 600);
      }

      // desired PDF image size in mm
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const desiredW_MM = pageW - marginMM * 2;
      const aspect = svgH / svgW;
      const desiredH_MM = Math.min(desiredW_MM * aspect, pageH - marginMM * 2);

      // convert mm -> px for the canvas using DPI (px = dpi * inches; inches = mm / 25.4)
      const mmToPx = (mm: number) => Math.round((mm / 25.4) * targetDPI);
      // compute pixel size that preserves SVG aspect ratio
      const canvasPxW = mmToPx(desiredW_MM);
      const canvasPxH = Math.round(canvasPxW * aspect);

      // serialize and base64 encode safely (handles unicode)
      const svgString = new XMLSerializer().serializeToString(svgEl);
      const svgBase64 = window.btoa(unescape(encodeURIComponent(svgString)));
      const img = new Image();
      img.onload = () => {
        // draw into sized canvas
        const canvas = document.createElement('canvas');
        canvas.width = canvasPxW;
        canvas.height = canvasPxH;
        const ctx = canvas.getContext('2d')!;
        // optional: clear and set background if needed
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // get PNG data URL
        const imgData = canvas.toDataURL('image/png');

        // add to PDF: x, y and width/height in mm
        const xMM = marginMM;
        const yMM = marginMM;
        doc.addImage(imgData, 'PNG', xMM, yMM, desiredW_MM, desiredH_MM);

        // optional: add text or tables below image
        // doc.text('Generated', xMM, yMM + desiredH_MM + 10);

        doc.save('svg-export.pdf');
      };
      img.onerror = (e) => { throw new Error('SVG image load failed'); };
      img.src = `data:image/svg+xml;base64,${svgBase64}`;
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
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
