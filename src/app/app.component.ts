import { Component, OnInit } from '@angular/core';
import { AuthService } from './Core/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AngularPrac';

  constructor(private authService: AuthService) { }

  user$ = this.authService.user;

}
