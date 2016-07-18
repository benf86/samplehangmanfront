import {Injectable} from 'angular2/core';
import {Http, Headers, Response, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ConfigService} from './config.service';
import {HangmanModel} from '../models/hangman.model';


@Injectable()
export class HangmanService {
    constructor (
        private http: Http,
        private config: ConfigService
    ) {}

    currentState = {
        currentGame: null
    };

    // check localstorage for game in progress
    checkGameInProgress (): boolean {
        return false;
    };

    // return current game or new game if none saved
    getGame (): void {
        if (!this.checkGameInProgress()) {
            this.startNewGame()
            .subscribe(
                data => {
                    console.log('>>>', data);
                    this.currentState.currentGame = HangmanModel.create(data);
                    this.currentState.nextLetter = '';
                    console.log(this.currentState);
                }
            )
        }
    };

    // get new game from server
    startNewGame (): any {
        let body = JSON.stringify({});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.config.api.host}${this.config.api.RESTpath}/games`, body, options)
        .map(res => res.json())
    };

    // update current game
    updateCurrentGame (letter: string, game: any): any {
        let body = JSON.stringify({ letter });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(game);

        return this.http.put(`${this.config.api.host}${this.config.api.RESTpath}/games/${game.currentGame.get('uuid')}`, body, options)
        .map(res => res.json())
        .subscribe(data => {
            this.currentState.currentGame = HangmanModel.create(data);
            this.currentState.nextLetter = '';
        });
    };
}
