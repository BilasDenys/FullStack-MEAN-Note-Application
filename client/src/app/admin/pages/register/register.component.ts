import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  sub: Subscription;
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.minLength(2)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  submit(): void {
    this.isLoading = true;
    this.form.disable();
    if (this.form.invalid) {
      return;
    }

    this.sub = this.auth.register(this.form.value).subscribe(
      () => {
        this.form.reset();
        this.form.enable();
        this.isLoading = false;
        this.router.navigate(['/admin/login'], {
          queryParams: {
            register: true
          }
        });
      }, (error) => {
        this.isLoading = false;
        this.form.enable();
      }
    );
  }

}
