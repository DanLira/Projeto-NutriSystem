import { AuthService } from './../guards/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
    loginForm: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({     // {5}
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  fazerLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }

}
