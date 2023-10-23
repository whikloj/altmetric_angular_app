import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is used to store the user's email address for OpenAlex queries.
 */
@Injectable({
  providedIn: 'root'
})
export class OpenAlexConfigService {
  // A subject to store the user's email address and retrieve it without subscribing.
  private readonly _openAlexConfigSource = new BehaviorSubject<string>("");
  // Expose the observable$ part of the _openAlexConfigSource subject (read only stream)
  readonly config$ = this._openAlexConfigSource.asObservable();

  /**
   * Set the subject to the user's email address.
   * @param {string} new_email The user's email address.
   */
  setConfig(new_email: string): void {
    this._openAlexConfigSource.next(new_email);
  }

  /**
   * @returns {string} The user's email address.
   */
  getConfig(): string {
    return this._openAlexConfigSource.getValue();
  }
}
