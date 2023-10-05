import { Component, Injectable } from '@angular/core';
import { AltmetricResult, Result } from '../result';
import { AltmetricImages } from '../altmetric-images';
import { ResultService } from '../result.service';
import { TotalsComponent } from '../totals/totals.component';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['./results.component.css']
})
@Injectable()
export class ResultsComponent {
  resultsList: Result[] = [];
  exportLabels: string[];
  exportFields: string[][];
  resultService: ResultService;

  /**
   * Basic constructor
   * @constructor
   * @param {ResultService} rs - Service with the current results.
   */
  constructor(private rs: ResultService) {
    this.resultService = rs;
    this.exportFields = rs.exportFields;
    this.exportLabels = rs.exportLabels;
    rs.results$.subscribe((x: Result[]) => {
      this.resultsList = [...x];
    });
  }
  /**
   * Function to format the field output.
   */
  formatField(field: any, formatKey: string) {
    if (field !== null && typeof(field) !== 'undefined') {
      switch (formatKey) {
        case 'float':
          return this.resultService.roundToDecimal(field);
          break;
        case 'date':
          return new Date(parseInt(field.toString())*1000).toUTCString();
          break;
        default:
          return field;
          break;
      }
    } else {
      return "";
    }
  }
}
