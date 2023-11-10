import { createAction, props } from '@ngrx/store';

import { IUser } from '../model/user.model';

export const setCurrentUserInfo = createAction(
    '[App] Set Current User Info',
    props<{ payload: IUser }>(),
);

export const updateCurrentUserInfo = createAction(
    '[App] Update Current User Info',
    props<{ payload: Partial<IUser> }>(),
);

export const fetchCurrentUserInfo = createAction(
    '[App] Fetch Current User Info',
);
