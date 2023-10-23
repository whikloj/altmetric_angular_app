import { Component } from '@angular/core';
import { ResultService } from '../result.service';
import { Result } from '../result';

/**
 * This component is used to display the totals for the current results.
 */
@Component({
  selector: 'app-totals',
  templateUrl: 'totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {
    // The total number of results.
    totalCount: number = 0;
    // The total number of results with altmetric data.
    altmetricCount: number = 0;
    // The total attention score for all altmetric results.
    totalAttention: number = 0;
    // The average attention score for all altmetric results.
    avgAttention: number = 0;
    // The result service.
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
     * @returns {string} The exported data.
     */
    doExport(): string {
      const csvContent = this.resultService.exportAsCsv();
      const encodedData = encodeURI(csvContent);
      return encodedData;
    }
}
