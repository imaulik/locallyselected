import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
    DropzoneModule,
    DropzoneComponent,
    DropzoneDirective,
    DropzoneConfigInterface,
    DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { UsersService, LoaderService } from './../../services/index';
import Swal from 'sweetalert2';

@Component({
    templateUrl: 'user-edit.component.html',
})
export class UserEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;


    userForm: FormGroup;
    userFormErrors: any;
    errors = '';
    user: any = {};
    roles = [];
    user_status = [];
    countries = [];
    categories = [];
    action;
    dtInstance: any = {};
    cancleUser;
    img_name = '';
    timeout;
    sub;
    IMAGE_URL;
    dropzone: any;
    file: {};
    apiErrors = {};
    emailAlready: boolean = false;
    usernameAlready: boolean = false;
    emailPattern = '^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})+$';

    selectedCountryCode = null;
    private id;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public usersService: UsersService
    ) {

        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.userFormErrors = {
            email: {},
            password: {},
            username: {},
            areacode: {},
            password_confirmation: {},
        };

    }

    ngOnInit() {

        this.userForm = this.formBuilder.group({
            company_name: [''],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            username: ['', Validators.required],
            country_pref: [''],
            website_url: [''],
            address1: [''],
            city: [''],
            state: [''],
            country: [''],
            phone: [''],
            areacode: ['', Validators.required],
            categories: [''],
            password_confirmation: ['', [Validators.required, confirmPassword]],
        });

        this.userForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.user = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.getById();
        } else {
            this.action = 'Add';
            this.getAllData();
        }
    }

     getById = async() => {
        this.loaderService.display(true);
        const allData = await this.usersService.getAllCountries().toPromise();
        if (allData['success']) {
            this.countries = allData['countries'];
            this.categories = allData['categories'];
        }
        this.action = 'Edit';
        const response = await this.usersService.getUserById(this.id).toPromise();
        if (response['success']) {
            this.user = response['data']['data'];
            this.user['password'] = '**********';
            this.user['password_confirmation'] = '**********';
            this.updatePrefix(this.user['country']);
            this.loaderService.display(false);
        } else {
            this.loaderService.display(false);
        }
        this.loaderService.display(false);
    }


    onFormValuesChanged() {
        for (const field in this.userFormErrors) {
            if (!this.userFormErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.userFormErrors[field] = {};
            // Get the control
            const control = this.userForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.userFormErrors[field] = control.errors;
            }
        }
    }


    SaveUser() {
        this.loaderService.display(true);
        this.usersService.saveBusinessUser(this.user).subscribe(response => {
            this.loaderService.display(false);
            if (response.success) {
                this.router.navigate(['users']);
            }
        }, error => {
            if (error['errors']) {
                this.apiErrors = error['errors'];
            }
            if (this.apiErrors['opta_card']) {
                this.SwaLToastError(this.apiErrors['opta_card'][0]);
            }
            if (this.apiErrors['gift_card']) {
                this.SwaLToastError(this.apiErrors['gift_card'][0]);
            }
            if (this.apiErrors['address1']) {
                this.SwaLToastError(this.apiErrors['address1'][0]);
            }
            if (this.apiErrors['city']) {
                this.SwaLToastError(this.apiErrors['city'][0]);
            }
            if (this.apiErrors['phone']) {
                this.SwaLToastError(this.apiErrors['phone'][0]);
            }
            if (this.apiErrors['state']) {
                this.SwaLToastError(this.apiErrors['state'][0]);
            }
            if (this.apiErrors['company_name']) {
                this.SwaLToastError(this.apiErrors['company_name'][0]);
            }
            if (this.apiErrors['username']) {
                this.SwaLToastError(this.apiErrors['username'][0]);
            }
            this.loaderService.display(false);
        });
    }

    SwaLToastError(title) {
        Swal({
            type: 'error',
            toast: true,
            title: title,
            position: 'top-end'
        });
    }

    CheckEmailRegistered() {
        this.usersService.CheckUserEmail(this.user).subscribe(response => {
            this.emailAlready = false;
        }, error => {
            this.emailAlready = true;
        });
    }

    CheckUsernameRegistered() {
        this.usersService.CheckUserUsername(this.user).subscribe(response => {
            this.usernameAlready = false;
        }, error => {
            this.usernameAlready = true;
        });
    }

    onUploadSuccess($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.user['profile_image'] = this.img_name;
    }

    onUploadError($event) {
        // console.log($event);
    }

    onUploadadd($event) {
        // console.log($event);
    }

    Uploadpreview($event) {
        // console.log($event);
    }

    onUploadRemoved($event) {
        //        console.log($event);
    }

    cancel() {
        this.router.navigate(['/users']);
    }

    updatePrefix(value) {
        this.countries.forEach((country) => {
            if (country.code === value) {
                this.selectedCountryCode = value;
            }
        });
    }

    getAllData() {
        this.usersService.getAllCountries().subscribe(response => {
            this.loaderService.display(true);
            if (response.success) {
                this.countries = response.countries;
                this.categories = response.categories;
                this.loaderService.display(false);
            } else {
                this.loaderService.display(false);
            }
        }, error => {
            this.loaderService.display(false);
        });
    }
}

function confirmPassword(control: AbstractControl): any {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('password_confirmation');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true
        };
    }
}
