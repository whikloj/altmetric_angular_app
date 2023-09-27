import { Component, Injectable } from '@angular/core';
import { AltmetricResult } from '../altmetric-result';
import { AltmetricImages } from '../altmetric-images';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['./results.component.css']
})
@Injectable()
export class ResultsComponent {
  resultsList: AltmetricResult[] = [];
  exportLabels: string[];
  exportFields: string[][];
  resultService: ResultService;
  constructor(private rs: ResultService) {
    this.resultService = rs;
    this.exportFields = rs.exportFields;
    this.exportLabels = rs.exportLabels;
    rs.results$.subscribe((x: AltmetricResult[]) => {
//      console.log({"results component": x});
      this.resultsList = [...x];
    });
  }
  formatField(field: string | string[] | number | AltmetricImages | Date, formatKey: string) {
    switch (formatKey) {
      case 'date':
        return new Date(parseInt((<string>field))*1000).toUTCString();
        break;
      default:
        return field;
        break;
    }
  }
}
