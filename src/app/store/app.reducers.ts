import { isDevMode } from '@angular/core';

import {
    MetaReducer,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';

import { IUser } from '../model/user.model';
import { setCurrentUserInfo } from './app.actions';

export interface State
{
    userInfo: IUser | null;
}

const initialState: State = {
    userInfo: null,
};

export const appReducer = createReducer(
    initialState,

    on(setCurrentUserInfo, (state, action) => ({
        ...state,
        userInfo: action.payload,
    })),
);

export const selectApp = (state: any): State => state.app;

export const selectUserInfo = createSelector(
    selectApp,
    (state: State) => state.userInfo,
);

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
