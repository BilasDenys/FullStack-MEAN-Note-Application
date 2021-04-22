import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  private toggleValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setToggleValue(value): void {
    this.toggleValue.next(value);
  }

  get ToggleValue(): Observable<boolean> {
    return this.toggleValue.asObservable();
  }
}
