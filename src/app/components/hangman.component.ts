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
    gameToLoadUuid = '';

    ngOnInit () {
        console.log('Running oninit');
        this.hangmanService.loadGame();
    }

    sendNextLetter (event) {
        this.hangmanService.updateCurrentGame(event.key, this.game);
    }

    loadGame (uuid) {
        if (!uuid) this.hangmanService.reset();
        this.hangmanService.loadGame(uuid);
    }
}
