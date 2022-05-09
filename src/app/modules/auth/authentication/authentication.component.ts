import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]]
  });

  constructor(private readonly formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public signIn(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value)
        .subscribe((res: { jwt: string }) => {
          res.jwt.length > 0 ? this.router.navigateByUrl('cart') : ''
        })
    }
  }
}

