import {Injectable} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ConfigService} from './config.service';
import {HangmanModel} from '../models/hangman.model';


@Injectable()
export class AdminService {
    constructor (
        private http: Http,
        private config: ConfigService
    ) {}
}
