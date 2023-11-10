import { Component } from '@angular/core';

import { IFilters } from 'src/app/model/app.model';
import { UserService } from '../../user.service';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent
{
    constructor(
        public service: DashboardService,
        public userService: UserService,
    )
    {
    }

    public handleFilterSelection(filters: IFilters)
    {
        this.service.setFilters(filters);
    }

    public onSearch(event: any)
    {
        this.service.setSearch(event.target.value);
    }
}
