import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAuth = `${environment.urlAdminService}/autenticacion`;
  constructor(private http: HttpClient) {}

  login(userLogin: object): Observable<any> {
    const path = `${this.urlAuth}/login`;
    return this.http.post<any>(path, userLogin);
    // .pipe(map((resp) => resp['data']));
  }
}
