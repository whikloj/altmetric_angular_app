import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAlexConfigService {
  private readonly _openAlexConfigSource = new BehaviorSubject<string>("");
  readonly config$ = this._openAlexConfigSource.asObservable();

  private _setConfig(config: string): void {
    this._openAlexConfigSource.next(config);
  }
  getConfig(): string {
    return this._openAlexConfigSource.getValue();
  }
  setConfig(new_email: string): void {
    this._setConfig(new_email);
  }
}
