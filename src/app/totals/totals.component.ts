import { Component } from '@angular/core';
import { ResultService } from '../result.service';
import { AltmetricResult, Result } from '../result';

@Component({
  selector: 'app-totals',
  templateUrl: 'totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {
    totalCount: number = 0;
    altmetricCount: number = 0;
    totalAttention: number = 0;
    avgAttention: number = 0;
    private resultService: ResultService;

    /**
     * Basic constructor
     * @constructor
     * @param {ResultService} rs - The service providing the current results.
     */
    constructor(private rs: ResultService) {
      this.resultService = rs;
      rs.results$.subscribe((x: Result[]) => {
        const count = x.length;
        let score = 0;
        let altmetric_count = 0;
        x.map(x => x.altmetric_details).filter((r) => typeof(r) !== 'undefined').forEach(r => {
          score += r.score;
          altmetric_count += 1;
        });
        this.altmetricCount = altmetric_count;
        this.totalAttention = this.resultService.roundToDecimal(score);
        this.totalCount = count;
        if (this.totalCount > 0) {
          this.avgAttention = this.resultService.roundToDecimal(score / altmetric_count);
        } else {
          this.avgAttention = 0;
        }
      });
    }
    /**
     * Button action to return exported data.
     */
    doExport() {
      const csvContent = this.resultService.exportAsCsv();
      const encodedData = encodeURI(csvContent);
      return encodedData;
    }
}
