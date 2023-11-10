import { createAction, props } from '@ngrx/store';

import { IFetchUsersWithFiltersApiResponse, IFilters, IPagination } from 'src/app/model/app.model';

export const fetchUsersWithFilters = createAction(
    '[Dashboard] Fetch users with filters',
);

export const setUsersWithFilters = createAction(
    '[Dashboard] Set Fetch users with filters API response',
    props<{ payload: IFetchUsersWithFiltersApiResponse }>(),
);

export const setFilters = createAction(
    '[Dashboard] Set Filters',
    props<{ payload: IFilters }>(),
);

export const setPagination = createAction(
    '[Dashboard] Set Pagination',
    props<{ payload: IPagination }>(),
);

export const setSearch = createAction(
    '[Dashboard] Set Search',
    props<{ payload: string }>(),
);

export const resetState = createAction(
    '[Dashboard] Reset',
);
