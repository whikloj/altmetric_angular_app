import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AltmetricResult } from './altmetric-result';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoiRetrieverService {
  readonly baseUrl = "https://api.altmetric.com/v1/doi/";
  client: HttpClient;
  constructor(private c: HttpClient) {
    this.client = c;
  }
  getByDoi(doi: string): Observable<HttpResponse<AltmetricResult> | Error> {
    return this.client.get<AltmetricResult>(`${this.baseUrl}${doi}`, {observe: 'response'}).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<Error> {
    let message = "";
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
      message = "An unexpected error occurred, details are in your browser's console. Please let the website admin know.";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      switch (error.status) {
        case 404:
          message = "Unable to find information on the requested DOI";
          break;
        case 429:
          message = "You have hit the limit for free requests. You will need to wait till tomorrow to continue.";
          break;
        default:
          message = "An unexpected error occurred, details are in your browser's console. Please let the website admin know.";
          break;
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(message));
  }
}
