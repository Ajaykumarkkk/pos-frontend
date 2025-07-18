import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // Clone the request and add the token to headers
        const authReq = token
            ? req.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            })
            : req;

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // ⚠️ Token expired or unauthorized
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}
