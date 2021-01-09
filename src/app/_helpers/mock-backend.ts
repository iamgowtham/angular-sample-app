import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(100))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(request);
            }    
        }

        function authenticate() {
            const { username, password } = body;
            const user = {'username': username, 'token': 'fake-jwt-token'};
            return ok({
                username: user.username,
                token: 'fake-jwt-token'
            })
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

    }
}

export const mockBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockBackendInterceptor,
    multi: true
};