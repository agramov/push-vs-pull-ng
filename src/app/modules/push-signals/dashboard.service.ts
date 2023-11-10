import { Injectable, effect, signal } from '@angular/core';

import { IFilters, IGridConfig, IPagination } from 'src/app/model/app.model';
import { UserService } from './user.service';

@Injectable()
export class DashboardService
{
    private pagination: IPagination = {
        page: 1,
        pageSize: 10,
    };

    public gridConfig_ = signal<IGridConfig>({
        isLoading: true,
        rows: [],
        pagination: this.pagination,
    });

    private filters: IFilters = {};

    private search: string = '';

    constructor(private userService: UserService)
    {
        let isUserInfoInitialized = false;

        effect(() =>
        {
            //
            // Effects always emit at least once, here we filter out the initial 2 events
            //
            if (userService.userInfo_())
            {
                if (!isUserInfoInitialized)
                {
                    isUserInfoInitialized = true;
                }
                else
                {
                    this.fetchFromServer();
                }
            }
        }, {
            allowSignalWrites: true,
        });
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
        this.gridConfig_.update(config => ({
            ...config,
            isLoading: true,
        }));

        this.userService.fetchUsersWithFilters(filters, search, pagination)
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    const serverResponse = actionResponse.payload;

                    this.gridConfig_.set({
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
