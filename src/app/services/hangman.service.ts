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
        currentGame: null,
        nextLetter: ''
    };

    // check localstorage for game in progress
    checkGameInProgress (): boolean {
        let currentState = localStorage.getItem('hangman');

        if (!!currentState) {
            this.currentState.currentGame = HangmanModel.create(JSON.parse(currentState));
        }
        return !!currentState;
    };

    // return current game or new game if none saved
    loadGame (uuid: string = ''): void {
        if (!this.checkGameInProgress() && uuid === '') {
            this.startNewGame()
            .subscribe(data => {
                    this.prepLocal(data);
                }
            )
        } else if (uuid !== '') {
            this.getGame(uuid)
            .subscribe(data => {
                this.prepLocal(data);
            });
        }
    };

    // delete current game
    reset (): void {
        console.log(localStorage.clear);

        localStorage.clear();
    }

    // get game in progress from server
    getGame (uuid): any {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.config.api.host}${this.config.api.RESTpath}/games/${uuid}`, options)
        .map(res => res.json());
    }

    // get new game from server
    startNewGame (): any {
        let body = JSON.stringify({});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.config.api.host}${this.config.api.RESTpath}/games`, body, options)
        .map(res => res.json());
    };

    // update current game
    updateCurrentGame (letter: string, game: any): any {
        let body = JSON.stringify({ letter });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.config.api.host}${this.config.api.RESTpath}/games/${game.currentGame.get('uuid')}`, body, options)
        .map(res => res.json())
        .subscribe(data => {
            localStorage.setItem('hangman', JSON.stringify(data));
            this.currentState.currentGame = HangmanModel.create(data);
            this.currentState.nextLetter = '';
        });
    };

    // prepare local environment
    prepLocal (data: any) {
        this.currentState.currentGame = HangmanModel.create(data);
        this.currentState.nextLetter = '';
        localStorage.setItem('hangman', JSON.stringify(data));
    }
}
