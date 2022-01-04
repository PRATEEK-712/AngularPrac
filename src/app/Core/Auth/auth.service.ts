import { IfStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, EmptyError, of, throwError } from "rxjs";
import { catchError, map, take, tap } from "rxjs/operators";
import { HttpHandlerService } from "src/app/Shared/httpHandler.service";
import { AppError } from "./error.model";
import { User } from "./user.model";
import { UserAuth } from "./userAuth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSub = new BehaviorSubject<UserAuth>(null);
    private user$ = this.userSub.asObservable();

    constructor(private httpHandler: HttpHandlerService, private router: Router) {
        if (localStorage.getItem('user')) {
            this.userSub.next(JSON.parse(localStorage.getItem('user')))
        }
    }

    get user() {
        return this.user$
    }

    login(user: User) {

        this.userSub.next(null);
        localStorage.removeItem('user');

        return this.httpHandler.post('authaccount/login', user).pipe(
            tap((response: any) => {
                if (response instanceof AppError) {
                    this.userSub.next(null);
                    localStorage.removeItem('user');
                } else {
                    this.setUser(response);
                }
            }),
            catchError(err => {
                return throwError(err)
            }),
        );
    }

    logout() {
        this.removeUser();
    }

    private removeUser() {
        this.userSub.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    private setUser(user) {
        let newUser = new UserAuth(user.Name, user.Email, user.Id, user.Token)
        if (user) {
            localStorage.setItem('user', JSON.stringify(newUser));
            this.userSub.next(newUser);
            this.router.navigate(['/home']);
        }
    }
}