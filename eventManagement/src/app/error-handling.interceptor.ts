import { catchError } from 'rxjs/operators' ;
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

 import { AlertifyService } from './alertify.service'

import { Observable, throwError } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private alertify: AlertifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("HTTP req check")
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error);
        this.alertify.error(error.error)

        // alert(error);
        return throwError(error.error);

    })
    );
  }
}
