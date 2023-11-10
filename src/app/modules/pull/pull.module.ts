import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SubnavComponent } from 'src/app/subnav/subnav.component';
import { SharedModule } from '../shared/shared.module';
import { PullRoutingModule } from './pull-routing.module';
import { PullComponent } from './pull.component';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { DashboardService } from './dashboard.service';
import { FilterComponent } from './components/filter/filter.component';
import { UserService } from './user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    imports: [
        SharedModule,
        PullRoutingModule,
        SubnavComponent,
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],

    declarations: [
        PullComponent,
        UserGridComponent,
        FilterComponent,
        DashboardComponent,
    ],

    providers: [
        DashboardService,
        UserService,
    ],
})
export class PullModule { }
