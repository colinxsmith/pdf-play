import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    (svg.selectAll('g.innerg').nodes() as Array<SVGElement>).forEach((d, i, kk) => {
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
        .text('スミス晶子 in ts file')
        .style('font-size', 'x-large')
        .style('font-style', 'oblique')
        .style('font-weight', 'bold')
        .style('fill', this.colours(kk.length - i - 1))
        .transition()
        .duration(1000)
        .attrTween('x', () => (t: number) => `${-2 - 100 * t}`)
        .attrTween('y', () => (t: number) => `${112 - 100 * t}`);
    });
    (svg.selectAll('g.innerg').nodes() as Array<SVGElement>).forEach((d, i) => {
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
  colours = d3.scaleLinear<string>().range(['yellow', 'magenta']).domain([0, this.pics.length - 1]);

  async newpfd(): Promise<void> {
    const marginMM = 10;
    const targetDPI = 300;
    try {
      // Get the entire div element
      const divElement = d3.select(this.element.nativeElement).select('div.ourpage').node() as HTMLDivElement | null;
      if (!divElement) throw new Error('No .ourpage div found');

      // Capture div as canvas
      const canvas = await html2canvas(divElement, {
        scale: targetDPI / 96, // convert DPI to scale factor
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Get canvas dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspect = imgHeight / imgWidth;

      // Create PDF with appropriate size
      const doc = new jsPDF();
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const desiredW_MM = pageW - marginMM * 2;
      const desiredH_MM = desiredW_MM * aspect;

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', marginMM, marginMM, desiredW_MM, desiredH_MM);

      // If content is taller than one page, add additional pages
      let heightLeft = desiredH_MM - (pageH - marginMM * 2);
      let position = pageH - marginMM;
      while (heightLeft > 0) {
        doc.addPage();
        doc.addImage(imgData, 'PNG', marginMM, position, desiredW_MM, desiredH_MM);
        heightLeft -= (pageH - marginMM * 2);
        position = pageH - marginMM;
      }

      doc.save('pdf-play.pdf');
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
