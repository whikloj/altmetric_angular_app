import { Component, Injectable } from '@angular/core';
import { AltmetricResult } from '../altmetric-result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['./results.component.css']
})
@Injectable()
export class ResultsComponent {
  resultsList: AltmetricResult[] = [];
  resultService: ResultService;
  constructor(private rs: ResultService) {
    this.resultService = rs;
    rs.results$.subscribe((x: AltmetricResult[]) => {
      console.log({"results component": x});
      this.resultsList = [...x];
    });
  }
}
