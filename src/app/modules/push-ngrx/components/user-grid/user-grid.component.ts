import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { selectGridConfig } from '../../store/dashboard.reducers';
import { setPagination } from '../../store/dashboard.actions';
import { distinctUntilChanged, tap } from 'rxjs';
import { isEqual } from 'lodash';

@Component({
    selector: 'app-user-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

        <clr-datagrid
            (clrDgRefresh)="handleGridChanged($event)"
            [clrDgLoading]="!!(gridConfig$ | async)?.isLoading">

            <clr-dg-column>Name</clr-dg-column>
            <clr-dg-column>Email</clr-dg-column>
            <clr-dg-column>Birthdate</clr-dg-column>
            <clr-dg-column>Roles</clr-dg-column>

            @for (user of (gridConfig$ | async)?.rows; track user.userId)
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
                    [clrDgPageSize]="(gridConfig$ | async)?.pagination?.pageSize || 10"
                    [clrDgTotalItems]="(gridConfig$ | async)?.pagination?.total || 0">
                    <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">Users per page</clr-dg-page-size>
                </clr-dg-pagination>
            </clr-dg-footer>

        </clr-datagrid>
  `,
})
export class UserGridComponent
{
    public gridConfig$;

    constructor(public store: Store)
    {
        this.gridConfig$ = store.pipe(
            select(selectGridConfig),
            distinctUntilChanged((a,b) =>
        {
            return isEqual(a,b);

        }),
        // tap(val => console.log('va', val))
        );
    }

    public handleGridChanged(event: any)
    {
        if (event.page.current > 0)
        {
            this.store.dispatch(setPagination({
                payload: {
                    page: event.page.current,
                    pageSize: event.page.size,
                },
            }));
        }
    }
}
