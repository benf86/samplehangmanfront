import {Injectable} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Subject, Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


import {ConfigService} from './config.service';
import {HangmanModel} from '../models/hangman.model';


@Injectable()
export class AdminService {
    constructor (
        private http: Http,
        private config: ConfigService
    ) {}

    private socket: Subject<MessageEvent>;

    runAdmin (currentState) {
        this.socket = this.create(`${this.config.api.wsHost}${this.config.api.adminURL}`);
        this.socket
        .map(res => JSON.parse(res.data))
        .subscribe(data => {
            console.log(data);
            if (data.status === 200) {
                currentState.message = data.message
            } else if (Array.isArray(data)) {
                currentState.games = this.objectize(data);
            }
        });
    }

    private create(url): Subject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            }
        );
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };
        return Subject.create(observer, observable);
    }

    private objectize (gameArray) {
        return gameArray.map(e => {
            return HangmanModel.create(e);
        })
    }
}
