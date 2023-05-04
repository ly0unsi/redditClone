import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequest } from './SignupRequest';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupRequest: SignupRequest;
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.signupRequest = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  signup() {
    this.signupRequest.username = this.signupForm.get('userName').value;
    this.signupRequest.email = this.signupForm.get('email').value;
    this.signupRequest.password = this.signupForm.get('password').value;
    this.authService.signup(this.signupRequest).subscribe(
      () => {
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      },
      () => {
        this.toaster.error('Registration  Failed!');
      }
    );
  }
}
