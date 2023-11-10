import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IUser } from 'src/app/model/user.model';
import { UserServiceBaseService } from 'src/app/user-service-base.service';
import { IActionResponse } from 'src/app/model/app.model';

@Injectable()
export class UserService extends UserServiceBaseService
{
    private _userInfo$ = new BehaviorSubject<IUser | null>(null);

    public userInfo$ = this._userInfo$.asObservable();

    constructor(
        httpClient: HttpClient,
    )
    {
        super(httpClient);

        this.fetchCurrentUser()
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    this._userInfo$.next(actionResponse.payload);
                }
                else
                {
                    console.error('Something went wrong...');
                }
            });
    }

    public override updateCurrentUser(currentUser: Partial<IUser>): Observable<IActionResponse<IUser | any>>
    {
        return super.updateCurrentUser(currentUser)
            .pipe(

                tap((response) =>
                {
                    if (response.isSuccessful)
                    {
                        this._userInfo$.next(response.payload);
                    }
                }),
            );
    }

    protected override fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
    {
        return super.fetchCurrentUser()
            .pipe(
                tap((response) =>
                {
                    if (response.isSuccessful)
                    {
                        this._userInfo$.next(response.payload);
                    }
                }),
            );
    }


}
