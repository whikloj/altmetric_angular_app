import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AltmetricResult } from './altmetric-result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly _resultSource = new BehaviorSubject<AltmetricResult[]>([]);
  readonly results$ = this._resultSource.asObservable();
  constructor() { }

  private _setResults(results: AltmetricResult[]): void {
    this._resultSource.next(results);
  }

  getRecords(): AltmetricResult[] {
    return this._resultSource.getValue();
  }

  addRecords(result: AltmetricResult[]): void {
    const records = [...this.getRecords()]
    console.log({'current': records, 'new': result});
    const new_records = records.concat(result);
    console.log({'setting with:': new_records});
    this._setResults(new_records);
  }
  checkForDuplicates(doi: string): boolean {
    console.log(`Check for duplicate to ${doi}`);
    return this.getRecords().map((r) => r.doi).includes(doi.toLowerCase());
  }
}
