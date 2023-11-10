import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { IUser } from 'src/app/model/user.model';
import { IActionResponse, IFetchUsersWithFiltersApiResponse, IFilters, IPagination } from './model/app.model';

export class UserServiceBaseService {

    constructor(
        private httpClient: HttpClient,
    )
    {}

    public fetchUsersWithFilters(filters: IFilters, search: string, pagination: IPagination):
    Observable<IActionResponse<IFetchUsersWithFiltersApiResponse | any>>
    {
        return this.httpClient.post<IFetchUsersWithFiltersApiResponse>('http://localhost:3339/users', {
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

    protected fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
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
}
