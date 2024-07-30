import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";
import { OpenAlexResult } from "../result";

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
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx,
      {
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
      }
    );
  }
}
