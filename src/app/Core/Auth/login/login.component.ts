import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppError } from '../error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  password: AbstractControl;
  errorMessage$: Observable<any>;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5)]]
    })
    this.password = this.loginForm.get('password');
    this.loginForm.get('email').valueChanges.subscribe(changes => {
      if (this.loginForm.get('email').valid) {
        this.password.enable();
      } else {
        this.password.setValue('');
        this.password.markAsUntouched();
        this.password.disable();
      }
      if (changes == 'Prateek') {
        this.password.clearValidators();
        this.password.setValidators(Validators.minLength(8));
        this.password.updateValueAndValidity();
      }
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res instanceof AppError) {
        console.log(res);
        this.errorMessage$ = of(res.message);
      } else {
        this.errorMessage$ = null;
      }
    }, err => {
      this.errorMessage$ = of(err);
    })
  }

}
