import {Injectable} from 'angular2/core';


@Injectable()
export class ConfigService {
    api = {
        host: 'http://localhost:8000',
        wsHost: 'ws://localhost:8000',
        RESTpath: '/rest',
        adminURL: '/ws'
    }
}
