import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { LocalstorageService } from '../services/localstorage.service';
import { catchError } from 'rxjs/operators';
import { UserLogin } from '../interfaces/user-login';

@Injectable({
  providedIn: 'root',
})
export class InterceptorTokenService implements HttpInterceptor {
  constructor(private localstorageService: LocalstorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUserLogin: UserLogin =
      this.localstorageService.get('DATA_LOGIN');

    let reqClone = req;

    if (currentUserLogin.token !== undefined) {

      reqClone = req.clone({
        headers: req.headers.set('token', currentUserLogin.token),
      });

    }

    return next.handle(reqClone).pipe(catchError(this.manejarError));
  }

  manejarError(error: HttpErrorResponse) {
    console.log('Sucedió un error');
    console.log(error);
    return throwError('Error personalizado');
  }
}
