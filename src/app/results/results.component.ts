import { Component, Injectable } from '@angular/core';
import { Result } from '../result';
import { ResultService } from '../result.service';

/**
 * This component is used to display the current results.
 */
@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['./results.component.css']
})
@Injectable()
export class ResultsComponent {
  // The current list of results.
  resultsList: Result[] = [];
  // The list of fields to export.
  exportLabels: string[];
  // The list of labels for the fields to export.
  exportFields: string[][];
  // The result service.
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
   * @param {any} field - The field to format.
   * @param {string} formatKey - The format to apply.
   * @returns {any} The formatted field.
   */
  formatField(field: any, formatKey: string): any {
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

  /**
   * Function to use encodeURIComponent.
   * @param {string} t - The text to encode.
   * @returns {string} The encoded text.
   */
  encode(t: string): string {
    return encodeURIComponent(t);
  }
}
