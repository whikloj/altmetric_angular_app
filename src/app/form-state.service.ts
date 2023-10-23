import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is used to toggle the state of the form.
 */
@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  // A subject to store the state of the form and give access to retrieve it without subscribing.
  private readonly _formStateSource = new BehaviorSubject<boolean>(true);
  // Expose the observable$ part of the _formStateSource subject (read only stream)
  readonly formState$ = this._formStateSource.asObservable();
  /**
   * This method is used to set the state of the form.
   * @param {boolean} state The state of the form.
   */
  private _setState(state: boolean): void {
    this._formStateSource.next(state);
  }
  /**
   * @returns {boolean} The current state of the form.
   */
  getState(): boolean {
    return this._formStateSource.getValue();
  }
  /**
   * This method is used to toggle the state of the form.
   */
  toggleState(): void {
    const currentState = this.getState();
    //console.log({'currentState': (currentState ? 'true' : 'false')})
    this._setState(!currentState);
  }
  /**
   * Basic constructor
   */
  constructor() { }
}
