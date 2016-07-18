import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {NgIf, NgModel} from 'angular2/common';


import {ConfigService} from '../services/config.service';
import {HangmanService} from '../services/hangman.service';


@Component({
    selector: 'my-main',
    templateUrl: '/app/templates/hangman.component.html',
    styleUrls: ['./app/styles/styles.css'],
    directives: [NgModel, NgIf]
})
export class HangmanComponent implements OnInit {
    constructor (
        private hangmanService: HangmanService,
        private config: ConfigService
    ) { }

    game = this.hangmanService.currentState;

    ngOnInit () {
        console.log('Running oninit');

        this.hangmanService.getGame();
    }

    sendNextLetter (event) {
        if ('a' <= event.key.toLowerCase() <= 'z')
            console.log(event.key);
            this.hangmanService.updateCurrentGame(event.key, this.game);
    }
}
