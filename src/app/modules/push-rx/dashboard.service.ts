import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, ReplaySubject, filter, skip, switchMap, take, takeUntil, tap } from 'rxjs';

import { IFilters, IGridConfig, IPagination } from 'src/app/model/app.model';
import { UserService } from './user.service';

@Injectable()
export class DashboardService implements OnDestroy
{
    private pagination: IPagination = {
        page: 1,
        pageSize: 10,
    };

    private _gridConfig$ = new BehaviorSubject<IGridConfig>({
        isLoading: true,
        rows: [],
        pagination: this.pagination,
    });

    public gridConfig$ = this._gridConfig$.asObservable();

    private filters: IFilters = {};

    private search: string = '';

    private destroyed$ = new ReplaySubject<boolean>(1);

    constructor(private userService: UserService)
    {
        userService.userInfo$
            .pipe(
                filter(user => !!user),
                skip(1),
                takeUntil(this.destroyed$),
            )
            .subscribe(() =>
            {
                this.fetchFromServer();
            });
    }

    ngOnDestroy(): void
    {
        this.destroyed$.next(true);
        console.log('SERVICE DESTROYED');
    }

    public setPagination(pagination: Partial<IPagination>)
    {
        this.pagination = {
            ...this.pagination,
            ...pagination,
        };

        this.fetchFromServer(this.filters, this.search, this.pagination);
    }

    public setFilters(filters: IFilters)
    {
        this.filters = filters;
        this.fetchFromServer(this.filters, this.search, this.pagination);
    }
  
    public setSearch(search: string)
    {
        this.search = search;
        this.fetchFromServer(this.filters, this.search, this.pagination);
    }

    public fetchFromServer(filters: IFilters = this.filters, search: string = this.search, pagination: IPagination = this.pagination)
    {
        this._gridConfig$.pipe(
            take(1),
            tap((lastConfig) =>
            {
                this._gridConfig$.next({
                    ...lastConfig,
                    isLoading: true,
                });
            }),
            switchMap(() => this.userService.fetchUsersWithFilters(filters, search, pagination)),
        )
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    const serverResponse = actionResponse.payload;

                    this._gridConfig$.next({
                        rows: serverResponse.results,
                        pagination: {
                            page: serverResponse.page,
                            pageSize: serverResponse.pageSize,
                            total: serverResponse.total,
                        },
                        isLoading: false,
                    });
                }
            });
    }
}
