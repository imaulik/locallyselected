import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/index';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginFormErrors: any;
    user: any = {};
    errors = '';
    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
        if (localStorage.getItem('token')) {
            const AuthUser = localStorage.getItem('token');
            if (AuthUser) {
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/login']);
            }
        }
        this.loginFormErrors = {
            email: {},
            password: {}
        };

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }


    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    aunthication() {
        this.authenticationService.login(this.user).subscribe(response => {
            const user = response;
            console.log(user);
            if (user && user['auth_code']) {
                localStorage.setItem('token', user['auth_code']);
                localStorage.setItem('currentUser', user['user_id']);
                this.router.navigate(['/dashboard']);
            }
        }, error => {
            this.errors = error.error;
        });
    }

}
