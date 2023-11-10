import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from '../modules/push-ngrx/user.service';
import { fetchCurrentUserInfo, setCurrentUserInfo, updateCurrentUserInfo } from './app.actions';

@Injectable()
export class AppEffects
{
    public fetchUserInfo = createEffect(() =>
        this.actions$
            .pipe(
                ofType(fetchCurrentUserInfo),

                switchMap(() =>
                    this.userService.fetchCurrentUser(),
                ),

                map(response => setCurrentUserInfo({ payload: response.payload })),
            ),
    );

    public updateCurrentUser = createEffect(
        () =>
            this.actions$
                .pipe(
                    ofType(updateCurrentUserInfo),

                    switchMap((action) =>
                        this.userService.updateCurrentUser(action.payload),
                    ),

                    map(response => setCurrentUserInfo({ payload: response.payload })),
                    ),

    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store: Store,
    )
    {
        this.actions$.subscribe(action => console.log('Action', action));
        // this.store.subscribe(state => console.log('Store', state));
    }
}
