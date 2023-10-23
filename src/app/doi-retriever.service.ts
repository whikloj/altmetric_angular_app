import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { OpenAlexResult, AltmetricResult } from './result';
import { OpenAlexConfigService } from './open-alex-config.service';

/**
 * This service is used to retrieve records from Altmetric and OpenAlex.
 */
@Injectable({
  providedIn: 'root'
})
export class DoiRetrieverService {
  // The base URL for the Altmetric API.
  readonly altmetric_baseUrl: string = "https://api.altmetric.com/v1/doi/";
  // The base URL for the OpenAlex API.
  readonly openalex_baseUrl: string = "https://api.openalex.org/works";
  // The http client.
  client: HttpClient;
  // The user's email address.
  openalex_email: string = "";

  /**
   * Basic constructor
   * @constructor
   * @param {HttpClient} c - Dependency Injected http client.
   * @param {OpenAlexConfigService} oas - Dependency Injected OpenAlex config service, storing the user's email.
   */
  constructor(private c: HttpClient, private oas: OpenAlexConfigService) {
    this.client = c;
    oas.config$.subscribe((email: string) => {
      this.openalex_email = email.trim();
      console.log(`doi-retriever got email ${this.openalex_email}`);
    });
  }

  /**
   * Perform queries for the provided DOI against Altmetric and OpenAlex.
   * @param {string} doi - The doi without base URI.
   */
  getRecordByDoi(doi: string): Observable<[HttpResponse<AltmetricResult>|HttpErrorResponse,HttpResponse<OpenAlexResult>|HttpErrorResponse]> {
    const params = new HttpParams()
      .set('filter', `doi:${doi}`);
    if (this.openalex_email.trim().length > 0) {
      params.set('mailto', this.openalex_email);
    }
    return forkJoin([
      this.client.get<AltmetricResult>(`${this.altmetric_baseUrl}${doi}`, {observe: 'response'})
        .pipe(catchError((err: HttpErrorResponse) => of(err))),
      this.client.get<OpenAlexResult>(this.openalex_baseUrl, {observe: 'response', params})
        .pipe(catchError((err: HttpErrorResponse) => of(err)))
    ]);
  }
}
