import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Headers, Response, HTTP_PROVIDERS} from 'angular2/http';

import {routes} from '../controllers/routes/default.route';
import {ConfigService} from '../services/config.service';
import {HangmanService} from '../services/hangman.service';
import {AdminService} from '../services/admin.service';


@Component({
    selector: 'my-app',
    templateUrl: '/app/templates/app.component.html',
    styleUrls: ['./app/styles/styles.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, HangmanService, AdminService]
})
@RouteConfig(routes)
export class AppComponent {
    constructor(
        private http = Http,
        private config = ConfigService,
        private hangmanService = HangmanService,
        private adminService = AdminService
    ) { }
}
