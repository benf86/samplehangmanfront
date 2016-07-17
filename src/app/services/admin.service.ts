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
        private config: ConfigService,
    ) {}

    currentGame : {};

    // check localstorage for game in progress
    isGameInProgress (): boolean {
        return false;
    };

    // return current game or new game if none saved
    getGame (): HangmanModel {
        if (!isGameInProgress()) {
            this.startNewGame()
            .subscribe(
                data => {
                    console.log(data);
                    currentGame = HangmanModel.create(data);
                }
            )
        }
    };

    // get new game from server
    startNewGame (): HangmanModel {
        return this.http.get(`${this.config.api.host}${this.config.api.path}`)
        .map(res => res.json())
    };

    // update current game
    updateCurrentGame (letter: string): HangmanModel {};
}
