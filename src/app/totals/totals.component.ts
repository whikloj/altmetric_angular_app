import { Component } from '@angular/core';
import { ResultService } from '../result.service';
import { AltmetricResult } from '../altmetric-result';

@Component({
  selector: 'app-totals',
  templateUrl: 'totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {
    totalCount: number = 0;
    totalAttention: number = 0;
    avgAttention: number = 0;
    private resultService: ResultService;
    constructor(private rs: ResultService) {
      this.resultService = rs;
      rs.results$.subscribe((x: AltmetricResult[]) => {
        const count = x.length;
        let score = 0;
        x.forEach(r => score += r.score);
        this.totalAttention = this.roundToDecimal(score);
        this.totalCount = count;
        if (this.totalCount > 0) {
          this.avgAttention = this.roundToDecimal(score / count);
        } else {
          this.avgAttention = 0;
        }
      });
    }
    roundToDecimal(num: number): number {
      let temp = num * 100;
      return Math.round(temp) / 100;
    }
    doExport() {
      const csvContent = this.resultService.exportAsCsv();
      const encodedData = encodeURI(csvContent);
      //window.open(encodedData);
      return encodedData;
      //this.saveContent(encodedData, 'altmetric_data.csv');
    }
    private saveContent = (fileContents: string, fileName: string) => {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = fileContents;
      link.click();
    }
}
