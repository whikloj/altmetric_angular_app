import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { OpenAlexResult, AltmetricResult } from './result';

@Injectable({
  providedIn: 'root'
})
export class DoiRetrieverService {
  readonly altmetric_baseUrl: string = "https://api.altmetric.com/v1/doi/";
  readonly openalex_baseUrl: string = "https://api.openalex.org/works";

  client: HttpClient;

  /**
   * Basic constructor
   * @constructor
   * @param {HttpClient} c - Dependency Injected http client.
   */
  constructor(private c: HttpClient) {
    this.client = c;
  }

  /**
   * Perform queries for the provided DOI against Altmetric and OpenAlex.
   * @param {string} doi - The doi without base URI.
   */
  getRecordByDoi(doi: string): Observable<[HttpResponse<AltmetricResult>|HttpErrorResponse,HttpResponse<OpenAlexResult>|HttpErrorResponse]> {
    const params = new HttpParams()
      .set('filter', `doi:${doi}`);
    return forkJoin([
      this.client.get<AltmetricResult>(`${this.altmetric_baseUrl}${doi}`, {observe: 'response'})
        .pipe(catchError((err: HttpErrorResponse) => of(err))),
      this.client.get<OpenAlexResult>(this.openalex_baseUrl, {observe: 'response', params})
        .pipe(catchError((err: HttpErrorResponse) => of(err)))
    ]);
  }
}
