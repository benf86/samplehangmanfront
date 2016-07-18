import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {ConfigService} from '../services/config.service';
import {AdminService} from '../services/admin.service';


@Component({
    selector: 'my-admin',
    templateUrl: '/app/templates/admin.component.html',
    styleUrls: ['./app/styles/styles.css']
})
export class AdminComponent implements OnInit {
    constructor (
        private adminService: AdminService,
        private config: ConfigService
    ) { }

    ngOnInit () {
    }
}
