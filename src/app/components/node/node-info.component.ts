import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../store/states/transaction';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../store/states/config';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';

/**
 *
 */
class TransactionDatabase {

    /**
     * Class level-declarations.
     */
    public transactionBehaviorSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

    /**
     *
     * @returns {Transaction[]}
     */
    get data(): Transaction[] {
        return this.transactionBehaviorSubject.value;
    }

    /**
     *
     * @param {Transaction[]} transactions
     */
    constructor(transactions: Transaction[]) {
        this.transactionBehaviorSubject.next(transactions);
    }
}

/**
 *
 */
class TransactionDataSource extends DataSource<any> {

    /**
     *
     * @param {TransactionDatabase} transactionDatabase
     */
    constructor(private transactionDatabase: TransactionDatabase) {
        super();
    }

    /**
     *
     * @returns {Observable<Transaction[]>}
     */
    connect(): Observable<Transaction[]> {
        return this.transactionDatabase.transactionBehaviorSubject;
    }

    /**
     *
     */
    disconnect() {
    }
}


@Component({
    selector: 'app-node-info',
    templateUrl: './node-info.component.html',
    styleUrls: ['./node-info.component.scss']
})
export class NodeInfoComponent implements OnInit, OnDestroy {

    /**
     * Class level declarations
     */
    @Input()
    public delegateIp: string;
    @Input()
    public transactions: Transaction [];
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;
    public dataSource: TransactionDataSource | null;

    /**
     *
     * @param appService
     * @param {Store<AppState>} store
     */
    constructor(@Inject('AppService') public appService: any, private store: Store<AppState>) {
        this.configState = this.store.select('config');
        this.configSubscription = this.configState.subscribe((config: Config) => {
            this.config = config;
        });
        this.dataSource = new TransactionDataSource(new TransactionDatabase(this.transactions));
    }

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }
}
