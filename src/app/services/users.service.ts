import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { User } from '../models/index';


@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getAllUser() {
        return this.http.get<any>(AppConstants.SITE_URL + 'user/get_all_users');
    }
    getUsers(user: User) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user/get_users', user);
    }
    changeUserStatus(id, status) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/change_UserStatus', { id: id, status_id: status });
    }
    getUserById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user/get_user', { id: id });
    }
    saveBusinessUser(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user/save_business_user', user);
    }
    CheckUserEmail(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user/checkemailuser', user);
    }
    CheckUserUsername(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user/checkusernameuser', user);
    }
    deleteUser(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/delete_user', { id: id });
    }
    getAllCountries() {
        return this.http.get<any>(AppConstants.SITE_URL + 'api/country/get_all_countries');
    }
    getAllCategoriesDT(categories) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/categories/datatable/get_all_categories', categories);
    }
    getAllCountryDT(country) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/country/datatable/get_all_country', country);
    }
    getAllJobDT(job) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/jobs/datatable/get_all_jobs', job);
    }
    getAllReviewDT(review) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/review/datatable/get_all_reviews', review);
    }
    getAllUserTransactionDT(user_transaction) {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/user_transaction/datatable/get_all_user_transactions', user_transaction);
    }



}
