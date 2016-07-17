import {AdminComponent} from '../../components/management.component';
import {HangmanComponent} from '../../components/hangman.component';


export var routes = [
    {
        path: '/admin',
        name: 'Management',
        component: AdminComponent,
        useAsDefault: false
    },
    {
        path: '/',
        name: 'Hangman',
        component: HangmanComponent,
        useAsDefault: true
    }
]
