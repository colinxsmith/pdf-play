import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Pdvprint } from "../pdvprint/pdvprint";

@Component({
  selector: 'app-pdf-gen',
  standalone: true, // Add this line to make PdfGen a standalone component
  templateUrl: './pdf-gen.html',
  styleUrls: ['./pdf-gen.scss'],
  imports: [Pdvprint]
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
    // Use correct SVG type for d3 selection
    const svg = d3.select(this.element.nativeElement).select('svg') as d3.Selection<SVGSVGElement, unknown, null, undefined>;
    (svg.selectAll('g.innerg').nodes() as Array<SVGElement>).forEach((d, i, kk) => {
      console.log(d);
      d3.select(d).select('path')
        .attr('d', this.arc)
        .style('stroke', '#2196F3')
        .style('fill', this.colours(i))
        .transition()
        .duration(175)
        .styleTween('stroke-width', () => (t: number) => `${12 * t}`)
        .attrTween('transform', () => (t: number) => `rotate(${-5 * 360 * t})`);
      d3.select(d).select('text')
        .text('スミス晶子 in ts file')
        .style('font-size', 'x-large')
        .style('font-style', 'oblique')
        .style('font-weight', 'bold')
        .style('fill', this.colours(kk.length - i - 1))
        .transition()
        .duration(175)
        .attrTween('x', () => (t: number) => `${20 - 125 * t}`)
        .attrTween('y', () => (t: number) => `${145 - 125 * t}`);
    });
    (svg.selectAll('g.innerg').nodes() as Array<SVGElement>).forEach((d, i) => {
      d3.select(d)
        .transition()
        .duration(175)
        .attrTween('transform', () => (t: number) => `translate(${125 * t},${125 * t}) rotate(${45 * i + 5 * 360 * t})`);
    });
    this.printSelector = d3.select(this.element.nativeElement).select('div.ourpage').node() as HTMLDivElement | null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateSvg();
    }, 5);
  }

  translatehack = (x = 0, y = 0) => `translate(${x},${y})`;
  pics = [0, 1, 2, 3, 4, 5, 6, 7] as Array<number>;
  printSelector: HTMLDivElement | null = null;
  // Use d3.scaleLinear for color interpolation, but output type should be string
  colours = d3.scaleLinear<string>().range(['yellow', 'magenta']).domain([0, this.pics.length - 1]);


}
