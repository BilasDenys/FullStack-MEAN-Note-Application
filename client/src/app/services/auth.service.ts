import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token;


  constructor(private http: HttpClient) {
  }

  login(user): Observable<any> {
    return this.http.post('/api/auth/login', user)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setLocalStorageKey('token', response.token);
        })
      );
  }

  register(user): Observable<any> {
    return this.http.post('/api/auth/register', user);
  }

  logOut(): void {
    this.setToken(null);
    this.clearLocalStorage();
  }

  isAuthenticate(): boolean {
    return !!this.token;
  }

  setToken(value: string): void {
    this.token = value;
  }

  getToken(): string {
    return this.token;
  }

  setLocalStorageKey(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }


}
