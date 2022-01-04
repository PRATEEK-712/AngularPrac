import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (!req.url.includes('auth')) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
                })
            });

            return next.handle(authReq).pipe(
                tap((res: HttpEvent<any>) => {
                    if (res instanceof HttpResponse) {
                        console.log(res);
                    }
                }
                ), finalize(() => { res => console.log(res) }))
        } else {
            return next.handle(req).pipe(
                tap((res: HttpEvent<any>) => {
                    if (res instanceof HttpResponse) {
                        console.log(res);
                    }
                }
                ), finalize(() => { res => console.log(res) }))
        }
    }
}