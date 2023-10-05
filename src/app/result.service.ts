import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { OpenAlexResult, AltmetricResult, Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly _resultSource = new BehaviorSubject<Result[]>([]);
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

  /**
   * Replace the observable's value with a new one.
   * @param {Result[]} results - The new results.
   */
  private _setResults(results: Result[]): void {
    this._resultSource.next(results);
  }

  /**
   * Get the current observable values.
   */
  getRecords(): Result[] {
    return this._resultSource.getValue();
  }

  /**
   * Get a result with a specified ID.
   * @param {number} id - The number to filter on.
   */
  getRecordById(id: number): Result | undefined {
    return this.getRecords().find((x) => x.ids.includes(id.toString()));
  }

  /**
   * Get a result with a specified DOI.
   * @param {string} id - The DOI to filter on.
   */
  getRecordByDoi(doi: string): Result | undefined {
    return this.getRecords().find((x) => x.dois.includes(doi));
  }

  /**
   * Add a new result to the current state.
   * @param {AltmetricResult | OpenAlexResult} result - The new result
   */
  private _addUpdateRecord(result: AltmetricResult | OpenAlexResult, isAltmetric: boolean): void {
    const records = [...this.getRecords()];
    const searchDoi = result.doi.replace('https://doi.org/', "").toLowerCase();
    const index = records.findIndex((e) => e.dois.includes(searchDoi));
    console.log({'addUpdateRecords': records, 'index': index});
    if (index > -1) {
      if (isAltmetric) {
        records[index].setFromAltmetric(<AltmetricResult>result);
      } else {
        records[index].setFromOpenAlex(<OpenAlexResult>result);
      }
    } else {
      const tmpR = new Result();
      if (isAltmetric) {
        tmpR.setFromAltmetric(<AltmetricResult>result);
      } else {
        tmpR.setFromOpenAlex(<OpenAlexResult>result);
      }
      records.push(tmpR);
    }
    this._setResults(records);
  }

  /**
   * Add a new Result with this AltmetricResult or update an existing Result with this information.
   * @param {AltmetricResult} result - The altmetric result to add/update.
   */
  addAltmetricRecords(result: AltmetricResult): void {
    this._addUpdateRecord(result, true);
  }

  /**
   * Add a new Result with this OpenAlexResult or update an existing Result with this information.
   * @param {OpenAlexResult} result - The openalex result to add/update.
   */
  addOpenAlexRecord(result: OpenAlexResult): void {
    this._addUpdateRecord(result, false);
  }

  /**
   * Check for an existing record with this DOI.
   * @param {string} doi - The doi to look for.
   */
  checkForDuplicates(doi: string): boolean {
    //console.log(`Check for duplicate to ${doi}`);
    return (this.getRecords().find((r) => r.dois.includes(doi.toLowerCase())) instanceof Result);
  }

  /**
   * Remove all records.
   */
  resetRecords(): void {
    this._setResults([]);
  }

  /**
   * Convert the AltmetricResult data to an array to export.
   * @param {AltmetricResult} alt - The result to convert.
   */
  private _altmetricToCsv(alt: AltmetricResult): string[] {
    let returnValue = [];
    // console.log({'altmetric record': alt});
    for (let f of this.exportFields) {
      // console.log({'f': f});
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

  /**
   * Return a UTF-8 encoded data URI with the CSV export data.
   */
  exportAsCsv() {
    const final = [
      [...this.exportLabels],
    ];
    this.getRecords().map((e) => e.altmetric_details)
      .filter((r) => typeof(r) !== 'undefined').forEach((e) => final.push(this._altmetricToCsv(e)));
    return "data:text/csv;charset=utf-8,"
      + final.map(e => e.join(",")).join("\n");
  }

  /**
   * Round a float to 2 decimal places.
   * @param {number} num - The number to round.
   */
  roundToDecimal(num: number): number {
    const temp = num * 100;
    return Math.round(temp) / 100;
  }
}
