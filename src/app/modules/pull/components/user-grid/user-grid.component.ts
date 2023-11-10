import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IGridConfig } from 'src/app/model/app.model';

@Component({
    selector: 'app-user-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

    @if (config)
    {
        <clr-datagrid
            (clrDgRefresh)="gridChange.emit($event)"
            [clrDgLoading]="config.isLoading">

            <clr-dg-column>Name</clr-dg-column>
            <clr-dg-column>Email</clr-dg-column>
            <clr-dg-column>Birthdate</clr-dg-column>
            <clr-dg-column>Roles</clr-dg-column>

            @for (user of config.rows; track user.userId)
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
                    [clrDgPageSize]="config.pagination.pageSize"
                    [clrDgTotalItems]="config.pagination.total || 0">
                    <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">Users per page</clr-dg-page-size>
                </clr-dg-pagination>
            </clr-dg-footer>

        </clr-datagrid>
    }
    @else
    {
        <clr-spinner></clr-spinner>
    }
  `,
})
export class UserGridComponent
{
    @Input()
    public config?: IGridConfig;

    @Output()
    public gridChange = new EventEmitter();
}
