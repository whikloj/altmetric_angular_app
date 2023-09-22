import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { DoiRetrieverService } from '../doi-retriever.service';
import { AltmetricResult } from '../altmetric-result';
import { ResultService } from '../result.service';
import { FormStateService } from '../form-state.service';

@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
@Injectable()
export class SearchFormComponent {
  singleSearchForm = new FormGroup({
    doi: new FormControl('')
  });
  multiSearchForm = new FormGroup({

  });
  private queryService: DoiRetrieverService;
  private resultService: ResultService;
  currentFormState: boolean = true;
  errors: string[] = [];
  private currentFile: File | undefined;
  private currentText: string = "";
  private reader = new FileReader();

  constructor (private cq: DoiRetrieverService, private rs: ResultService, private fs: FormStateService) {
    this.queryService = cq;
    this.resultService = rs;
    fs.formState$.subscribe((state: boolean) => {
      this.currentFormState = state;
      this.resetErrors();
    });
  }
  resetRecords():void {
    this.resultService.resetRecords();
    this.resetErrors();
  }
  resetErrors(): void {
    this.errors = [];
  }
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
        this.queryService.getByDoi(doi).subscribe({
          next: (result: HttpResponse<AltmetricResult>|Error) => {
            console.log({'received:': result});
            if (!(result instanceof Error) && result.body !== null) {
              this.resultService.addRecords([result.body]);
            }
          },
          error: (err: Error) => this.errors.push(err.message)
        });
      } else {
        this.errors.push(`DOI (${doi}) is already in the list.`);
      }
    }
  }
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
