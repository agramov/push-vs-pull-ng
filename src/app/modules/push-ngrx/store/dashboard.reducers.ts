import { isDevMode } from '@angular/core';

import {
    MetaReducer,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';

import { IFilters, IGridConfig, IPagination } from 'src/app/model/app.model';

import * as DashboardActions from './dashboard.actions';

export const stateKey = 'dashboard';

export interface State
{
    gridConfig: IGridConfig;
    filters: IFilters;
    search: string;

    pagination: IPagination;
}

const initialState: State = {
    gridConfig: {
        isLoading: true,
        rows: [],
        pagination: {
            page: 1,
            pageSize: 10,
        },
    },

    pagination: {
        page: 1,
        pageSize: 10,
    },

    filters: {},

    search: '',
};

export const dashboardReducer = createReducer(
    initialState,

    on(DashboardActions.fetchUsersWithFilters, (state) => ({
        ...state,
        gridConfig: {
            ...state.gridConfig,
            isLoading: true,
        },
    })),

    on(DashboardActions.setPagination, (state, { payload }) => ({
        ...state,
        pagination: {
            ...payload,
        },
    })),

    on(DashboardActions.setFilters, (state, { payload }) => ({
        ...state,
        filters: payload,
    })),

    on(DashboardActions.setSearch, (state, { payload }) => ({
        ...state,
        search: payload,
    })),

    on(DashboardActions.setUsersWithFilters, (state, action) => ({
        ...state,
        gridConfig: {
            rows: action.payload.results,
            pagination: {
                page: action.payload.page,
                pageSize: action.payload.pageSize,
                total: action.payload.total,
            },
            isLoading: false,
        },
    })),

    on(DashboardActions.resetState, () => ({
        ...initialState,
    })),
);

export const selectDashboard = (state: any): State => state[stateKey];

export const selectGridConfig = createSelector(
    selectDashboard,
    (state: State) => state.gridConfig,
);

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
