import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'
import { of, throwError } from "rxjs";
import { AppError } from "../Core/Auth/error.model";

const baseUrl: string = 'http://restapi.adequateshop.com/api/';

@Injectable({
    providedIn: 'root'
})
export class HttpHandlerService {

    constructor(private http: HttpClient) { }

    get(apiEndpoint) {
        return this.http.get(`${baseUrl}${apiEndpoint}`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data
                } else {
                    return new AppError("An Internal Error Occurred");
                }
            }),
            catchError(this.handleError)
        )
    }

    post(apiEndpoint, body) {
        return this.http.post(`${baseUrl}${apiEndpoint}`, body).pipe(
            map((response: any) => {
                if (response.code == 0) {
                    return response.data
                } else {
                    return new AppError(response.message);
                }
            }),
            catchError(this.handleError)
        )
    }

    handleError(err) {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
            return throwError(err.message);
        } else {
            let error = new HttpErrorResponse({ error: err.message });
            return throwError(error);
        }

    }
}