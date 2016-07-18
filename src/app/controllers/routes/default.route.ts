import {AdminComponent} from '../../components/admin.component';
import {HangmanComponent} from '../../components/hangman.component';


export var routes = [
    {
        path: '/admin',
        name: 'Admin',
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
