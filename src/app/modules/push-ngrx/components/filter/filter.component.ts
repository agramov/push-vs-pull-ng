import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { IFilters } from 'src/app/model/app.model';
import { setFilters } from '../../store/dashboard.actions';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: [ './filter.component.scss' ],
})
export class FilterComponent 
{
    public filtersOptions = [
        {
            key: 'user',
            value: 'user',
        },

        {
            key: 'admin',
            value: 'admin',
        },

        {
            key: 'owner',
            value: 'owner',
        },
    ];

    private selectedFilters: { [ k:string ]: boolean } = {};

    constructor(private store: Store)
    {
    }

    public handleFilterClick(option: { key: string, value: string })
    {
        this.selectedFilters[option.key] = !this.selectedFilters[option.key];

        const filters: IFilters = {
            roles: Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key]),
        };

        this.store.dispatch(setFilters({ payload: filters }));
    }
}
