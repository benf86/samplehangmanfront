import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {ConfigService} from '../services/config.service';
import {HangmanService} from '../services/hangman.service';


@Component({
    selector: 'my-main',
    templateUrl: '/app/templates/hangman.component.html',
    styleUrls: ['./app/styles/styles.css']
})
export class HangmanComponent implements OnInit {
    constructor (
        private hangmanService: HangmanService,
        private config: ConfigService
    ) { }

    game = this.hangmanService.currentGame;

    ngOnInit () {
    }
}
