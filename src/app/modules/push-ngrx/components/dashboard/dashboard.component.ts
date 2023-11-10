import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { setSearch } from '../../store/dashboard.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent
{
    constructor(
        public store: Store,
    )
    {
    }

    public onSearch(event: any)
    {
        this.store.dispatch(setSearch({ payload: event.target.value }));
    }
}
