import { Component, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { fetchCurrentUserInfo, updateCurrentUserInfo } from 'src/app/store/app.actions';
import { selectUserInfo } from 'src/app/store/app.reducers';
import { resetState } from './store/dashboard.actions';

@Component({
    selector: 'app-push-ngrx',
    templateUrl: './push-ngrx.component.html',
    styleUrls: [ './push-ngrx.component.scss' ],
})
export class PushNgRxComponent implements OnDestroy
{
    public currentUser$;

    constructor(
        public store: Store,
    )
    {
        this.currentUser$ = store.pipe(select(selectUserInfo));
        store.dispatch(fetchCurrentUserInfo());
    }

    changeName()
    {
        this.store.dispatch(updateCurrentUserInfo({ payload: { displayName: `${ Math.floor(Math.random() * 10) }` } }));
    }

    ngOnDestroy(): void
    {
        this.store.dispatch(resetState());
    }
}
