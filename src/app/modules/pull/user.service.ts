import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { IUser } from 'src/app/model/user.model';
import { IActionResponse, IFilters, IPagination } from '../../model/app.model';

@Injectable()
export class UserService
{
    public userInfo?: IUser;

    constructor(
        private readonly httpClient: HttpClient,
    )
    {
        this.fetchCurrentUser()
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    this.userInfo = actionResponse.payload;
                }
                else
                {
                    console.error('Something went wrong...');
                }
            });
    }

    public fetchUsersWithFilters(filters: IFilters, search: string, pagination: IPagination): Observable<IActionResponse<any | any>>
    {
        return this.httpClient.post<any>('http://localhost:3339/users', {
            page: pagination.page,
            pageSize: pagination.pageSize,
            filters,
            search,
        })
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }

    private fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
    {
        return this.httpClient.get<IUser>('http://localhost:3339/user')
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }

    public updateCurrentUser(currentUser: Partial<IUser>): Observable<IActionResponse<IUser | any>>
    {
        return this.httpClient.put<IUser>('http://localhost:3339/user', currentUser)
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }
}
