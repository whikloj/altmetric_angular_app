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
    private resultService: ResultService;
    constructor(private rs: ResultService) {
      this.resultService = rs;
      rs.results$.subscribe((x: AltmetricResult[]) => {
        const count = x.length;
        let score = 0;
        x.forEach(r => score += r.score);
        this.totalAttention = score;
        this.totalCount = count;
      });
    }
}
