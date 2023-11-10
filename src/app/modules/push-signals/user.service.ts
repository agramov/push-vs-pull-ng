import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { IUser } from 'src/app/model/user.model';
import { UserServiceBaseService } from 'src/app/user-service-base.service';
import { IActionResponse } from 'src/app/model/app.model';

@Injectable()
export class UserService extends UserServiceBaseService
{
    public userInfo_ = signal<IUser | null>(null);

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
                    this.userInfo_.set(actionResponse.payload);
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
                        this.userInfo_.set(response.payload);
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
                        this.userInfo_.set(response.payload);
                    }
                }),
            );
    }


}
