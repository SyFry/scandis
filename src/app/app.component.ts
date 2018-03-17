import {AfterViewInit, Component, DoCheck, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppState} from './app.state';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {AppService} from './app.service';
import {Router} from '@angular/router';
import {Config} from './store/states/config';
import {environment} from '../environments/environment';

/**
 * AppComponent
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {'(window:scroll)': '($event)'}
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {

    /**
     * Class level-declarations.
     */
    public headerClass = 'header';

    /**
     *
     * @param appService
     * @param {<AppState>} store
     * @param {} mdDialog
     * @param {} router
     */
    constructor(@Inject('AppService') public appService: any, private store: Store<AppState>, private mdDialog: MatDialog, private router: Router) {






    }

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    ngAfterViewInit() {
    }

    /**
     *
     */
    ngDoCheck() {
        if (typeof window !== 'undefined') {
            window.pageYOffset > 50 ? this.headerClass = 'header scrolled' : this.headerClass = 'header';
        }
    }
}
