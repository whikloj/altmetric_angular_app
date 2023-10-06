import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private readonly _formStateSource = new BehaviorSubject<boolean>(true);
  readonly formState$ = this._formStateSource.asObservable();
  constructor() { }
  private _setState(state: boolean): void {
    this._formStateSource.next(state);
  }
  getState(): boolean {
    return this._formStateSource.getValue();
  }
  toggleState(): void {
    const currentState = this.getState();
    //console.log({'currentState': (currentState ? 'true' : 'false')})
    this._setState(!currentState);
  }
}
