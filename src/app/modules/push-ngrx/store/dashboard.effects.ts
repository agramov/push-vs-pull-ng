import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { distinctUntilChanged, map, skip, switchMap, take } from 'rxjs';

import { isEqual } from 'lodash';

import { selectUserInfo } from 'src/app/store/app.reducers';
import { UserService } from '../user.service';
import * as DashboardActions from './dashboard.actions';
import { selectDashboard } from './dashboard.reducers';

@Injectable()
export class DashboardEffects
{
    public setFilters = createEffect(() =>
        this.actions$
            .pipe(
                ofType(
                    DashboardActions.setFilters,
                    DashboardActions.setPagination,
                    DashboardActions.setSearch,
                ),

                distinctUntilChanged(isEqual),

                map((action) =>
                    DashboardActions.fetchUsersWithFilters(),
                ),
            ));

    public monitorForCurrentUserChanges = createEffect(() =>
        this.store
            .pipe(
                select(selectUserInfo),

                //
                // Skip initial null value and first set value for triggering updates
                //
                skip(2),

                map(() =>
                    DashboardActions.fetchUsersWithFilters(),
                ),
            ),
    );

    public fetchUsersWithFilters = createEffect(() =>
        this.actions$
            .pipe(
                ofType(DashboardActions.fetchUsersWithFilters),

                switchMap(() =>
                    this.store.pipe(
                        select(selectDashboard),
                        take(1),
                    ),
                ),

                switchMap(({ filters, pagination, search }) =>
                    this.userService.fetchUsersWithFilters(filters, search, pagination),
                ),

                map(response => DashboardActions.setUsersWithFilters({ payload: response.payload })),
            ));

    constructor(
        private store: Store,
        private actions$: Actions,
        private userService: UserService,
    )
    {}
}
