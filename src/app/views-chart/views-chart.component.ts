import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { OpenAlexCitedByCounts, OpenAlexResult } from "../result";

@Component({
  selector: 'app-views-chart',
  template: '<canvas #chart></canvas>',
  styleUrls: ['./views-chart.component.css']
})
export class ViewsChartComponent {
  @ViewChild('chart') 
  private chartRef!: ElementRef;
  private chart!: Chart;
  @Input()
  data!: OpenAlexResult;

  constructor() {}

  ngAfterViewInit() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.data!.counts_by_year.map(e => e.year),
	       datasets: [
          {
            label: "Citations",
            data: this.data!.counts_by_year.map(e => e.cited_by_count),
            backgroundColor: '#c231ce',
            showLine: true,
            borderColor: '#c231ce'
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        responsive: true,
      }
    });
  }
}
