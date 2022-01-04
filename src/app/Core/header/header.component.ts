import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user$ = this.authService.user;
  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
