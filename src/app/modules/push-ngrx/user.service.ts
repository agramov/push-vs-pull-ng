import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from 'src/app/model/user.model';
import { UserServiceBaseService } from 'src/app/user-service-base.service';
import { IActionResponse } from 'src/app/model/app.model';

@Injectable()
export class UserService extends UserServiceBaseService
{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(
        httpClient: HttpClient,
    )
    {
        super(httpClient);
    }

    public override updateCurrentUser(currentUser: Partial<IUser>): Observable<IActionResponse<IUser | any>>
    {
        return super.updateCurrentUser(currentUser);
    }

    public override fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
    {
        return super.fetchCurrentUser();
    }
}
