import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DoiRetrieverService } from '../doi-retriever.service';
import { AltmetricResult, OpenAlexResult } from '../result';
import { ResultService } from '../result.service';
import { FormStateService } from '../form-state.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
@Injectable()
export class SearchFormComponent {
  private queryService: DoiRetrieverService;
  private resultService: ResultService;
  currentFormState: boolean = true;
  errors: string[] = [];
  private currentFile: File | undefined;
  private currentText: string = "";
  private reader = new FileReader();

  /**
   * Basic constructor
   * @constructor
   * @param {DoiRetrieverService} cq - Service to perform DOI queries against the APIs.
   * @param {ResultService} rs - Service that stores/returns the current list of results.
   * @param {FormStateService} fs - Service to provide the current state of the form.
   */
  constructor (private cq: DoiRetrieverService, private rs: ResultService, private fs: FormStateService) {
    this.queryService = cq;
    this.resultService = rs;
    fs.formState$.subscribe((state: boolean) => {
      this.currentFormState = state;
      this.resetErrors();
    });
  }

  /**
   * Clear all results.
   */
  resetRecords():void {
    this.resultService.resetRecords();
    this.resetErrors();
  }

  /**
   * Clear all errors.
   */
  resetErrors(): void {
    this.errors = [];
  }

  /**
   * Perform a search for a single DOI.
   * @param {HTMLInputElement} theText - The input box with the doi.
   */
  doSingleSearch(theText: HTMLInputElement | undefined): void {
    this.resetErrors();
    if (theText != undefined) {
      const doi: string = theText.value.trim();
      if (doi.length > 0) {
        console.log(`Doing single search with ${doi}`);
        this.doQuery(doi);
        theText.value = '';
      }
    }
  }
  private doQuery(doi: string): void {
    if (doi.length > 0) {
      if (! this.resultService.checkForDuplicates(doi)) {

        this.queryService.getRecordByDoi(doi).subscribe((results) => {

            const alt_result = results[0];
            let alt_error = false;

            console.log({'altmetric received:': alt_result});
            if (!(alt_result instanceof HttpErrorResponse) && (alt_result.body !== null)) {
              this.resultService.addAltmetricRecords(alt_result.body);
            } else {
              alt_error = true;
            }

            const alex_result = results[1];
            console.log({'open alex received': alex_result});
            if (!(alex_result instanceof HttpErrorResponse) && (alex_result.body !== null && alex_result.body instanceof Object)) {
              const pop = alex_result.body?.['results'];
              if (pop instanceof Array && pop.length > 0) {
                this.resultService.addOpenAlexRecord(pop.pop());
                return;
              }
            }
            if (alt_error) {
              // Not found in either search.
              this.errors.push(`DOI (${doi}) not found in Altmetric and OpenAlex`);
            }
          });

      } else {
        this.errors.push(`DOI (${doi}) is already in the list.`);
      }
    }
  }

  /**
   * Upload and load the text file contents.
   * @param {HTMLInputElement} theFile - The file element.
   */
  uploadFile(theFile: HTMLInputElement | undefined): void {
    this.resetErrors();
    console.log({'theFile': theFile});
    if (theFile !== undefined && theFile.files !== null) {
      const uploadFile = theFile.files[0];
      console.log({'upload exact file': uploadFile});
      if (uploadFile !== undefined) {
        this.reader.onload = (e) => {
          if (e.target !== null && e.target.result !== null) {
            const text: string = (<string>e.target.result);
            console.log(`text is ${text}`);
            const temp: string[] = text.split('\n');
            const splitDois: string[] = temp.filter((w) => w.length > 0).map(w => w.trim());
            splitDois.forEach((doi: string) => this.doQuery(doi));
          }
        };
        this.reader.readAsText(uploadFile);
        if (this.reader.error) {
          window.alert("Problem reading file!");
        }
      }
    }
  }
}
