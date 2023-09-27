import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AltmetricResult } from './altmetric-result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly _resultSource = new BehaviorSubject<AltmetricResult[]>([]);
  readonly results$ = this._resultSource.asObservable();

  readonly exportFields: string[][] = [
    ['title', 'string'],
    ['doi', 'string'],
    ['score', 'number'],
    ['cited_by_fbwalls_count', 'number'],
    ['cited_by_feeds_count', 'number'],
    ['cited_by_gplus_count', 'number'],
    ['cited_by_msm_count', 'number'],
    ['cited_by_rdts_count', 'number'],
    ['cited_by_qna_count', 'number'],
    ['cited_by_tweeters_count', 'number'],
    ['cited_by_wikipedia_count', 'number'],
    ['cited_by_policies_count', 'number'],
    ['cited_by_patents_count', 'number'],
    ['cited_by_videos_count', 'number'],
    ['cited_by_accounts_count', 'number'],
    ['cited_by_posts_count', 'number'],
    ['details_url', 'url'],
  ];
  readonly exportLabels: string[] = [
    'Title',
    'DOI',
    'Current Altmetric Attention Score',
    'Number of walls that have mentioned the output on Facebook',
    'Number of blogs that have mentioned the publication',
    'Number of accounts that have shared on Google+',
    'Number of news sources that have mentioned the publication',
    'Number of Redditors that have posted about this publication',
    'Number of forum and Stack Exchange based sites accounts that have mentioned this publication',
    'Number of twitter accounts that have tweeted this publication',
    'Number of wikipedia pages that have cited this publication',
    'Number of policies that have mentioned this publication',
    'Number of patents that have mentioned this publication',
    'Number of Youtube channels',
    'The number of unique sources referencing the research output',
    'The total number of individual posts for the requested research output',
    'Details URL'
  ];

  constructor() { }

  private _setResults(results: AltmetricResult[]): void {
    this._resultSource.next(results);
  }

  getRecords(): AltmetricResult[] {
    return this._resultSource.getValue();
  }

  getRecordById(id: number): AltmetricResult | undefined {
    return this.getRecords().find((x) => x.altmetric_id == id);
  }

  addRecords(result: AltmetricResult[]): void {
    const records = [...this.getRecords()]
    //console.log({'current': records, 'new': result});
    const new_records = records.concat(result);
    //console.log({'setting with:': new_records});
    this._setResults(new_records);
  }
  checkForDuplicates(doi: string): boolean {
    //console.log(`Check for duplicate to ${doi}`);
    return this.getRecords().map((r) => r.doi).includes(doi.toLowerCase());
  }
  resetRecords(): void {
    this._setResults([]);
  }
  private _altmetricToCsv(alt: AltmetricResult): string[] {
    let returnValue = [];
    console.log({'altmetric record': alt});
    for (let f of this.exportFields) {
      console.log({'f': f});
      let fieldValue = "";
      if (typeof alt[f[0]] !== 'undefined') {
        if (f[1] === 'string') {
          fieldValue = '"' + alt[f[0]] + '"';
        } else if (f[1] === 'date') {
          fieldValue = new Date(parseInt(<string>alt[f[0]]) * 1000).toUTCString() + "";
        } else {
          fieldValue = alt[f[0]] + "";
        }
      }
      returnValue.push(fieldValue);
    }
    return returnValue;
  }
  exportAsCsv() {
    const final = [
      [...this.exportLabels],
    ];
    this.getRecords().forEach((e) => final.push(this._altmetricToCsv(e)));
    return "data:text/csv;charset=utf-8,"
      + final.map(e => e.join(",")).join("\n");
  }
}
