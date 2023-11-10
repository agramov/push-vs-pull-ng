import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'app-user-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

        <clr-datagrid
            (clrDgRefresh)="handleGridChanged($event)"
            [clrDgLoading]="!!(service.gridConfig$ | async)?.isLoading">

            <clr-dg-column>Name</clr-dg-column>
            <clr-dg-column>Email</clr-dg-column>
            <clr-dg-column>Birthdate</clr-dg-column>
            <clr-dg-column>Roles</clr-dg-column>

            @for (user of (service.gridConfig$ | async)?.rows; track user.userId)
            {
                <clr-dg-row>
                    <clr-dg-cell>{{ user.displayName }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.email }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.birthdate | date }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.roles }}</clr-dg-cell>
                </clr-dg-row>
            }

            <clr-dg-footer>
                <clr-dg-pagination #pagination
                    [clrDgPageSize]="(service.gridConfig$ | async)?.pagination?.pageSize || 10"
                    [clrDgTotalItems]="(service.gridConfig$ | async)?.pagination?.total || 0">
                    <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">Users per page</clr-dg-page-size>
                </clr-dg-pagination>
            </clr-dg-footer>

        </clr-datagrid>
  `,
})
export class UserGridComponent
{
    constructor(public service: DashboardService)
    {
    }

    public handleGridChanged(event: any)
    {
        this.service.setPagination({
            page: event.page.current,
            pageSize: event.page.size,
        });
    }
}
