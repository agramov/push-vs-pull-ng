import { Component, EventEmitter, Output } from '@angular/core';
import { IFilters } from 'src/app/model/app.model';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: [ './filter.component.scss' ],
})
export class FilterComponent 
{
    @Output()
    public filterSelection = new EventEmitter<IFilters>();

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

    public handleFilterClick(option: { key: string, value: string })
    {
        console.log(option);

        this.selectedFilters[option.key] = !this.selectedFilters[option.key];

        this.filterSelection.emit({
            roles: Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key])
        });
    }
}
