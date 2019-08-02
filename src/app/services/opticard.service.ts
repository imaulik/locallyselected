import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';


@Injectable()
export class OpticardService {
    constructor(private http: HttpClient) {
    }

    getOpticards = (optacard) => {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/opticard/datatatble/get-all-cards', optacard);
    }
    getOpticardsTransaction = (optacard) => {
        return this.http.post<any>(AppConstants.SITE_URL + 'api/opticard/datatatble/get_all_cards_transactions', optacard);
    }

}
