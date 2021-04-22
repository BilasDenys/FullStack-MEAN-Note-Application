import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  message;
  registerMessage;

  isLoading = false;

  sub: Subscription;
  sub2: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Login to system again.';
      }
      if (params.register) {
        this.registerMessage = 'User successfully created. You can Sign In to system.';
      }
    });
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    this.isLoading = true;
    this.form.disable();
    if (this.form.invalid) {
      return;
    }

    this.sub2 = this.auth.login(this.form.value).subscribe(
      () => {
        this.form.enable();
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.message = error.error.message;
        this.form.enable();
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.sub2) {
      this.sub2.unsubscribe();
    }

  }

}
