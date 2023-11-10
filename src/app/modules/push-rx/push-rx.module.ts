import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SubnavComponent } from 'src/app/subnav/subnav.component';
import { SharedModule } from '../shared/shared.module';
import { PushSignalsRoutingModule } from './push-rx-routing.module';
import { PushRxComponent } from './push-rx.component';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { DashboardService } from './dashboard.service';
import { FilterComponent } from './components/filter/filter.component';
import { UserService } from './user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    imports: [
        SharedModule,
        PushSignalsRoutingModule,
        SubnavComponent,
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],

    declarations: [
        PushRxComponent,
        UserGridComponent,
        FilterComponent,
        DashboardComponent,
    ],

    providers: [
        DashboardService,
        UserService,
    ],
})
export class PushRxModule { }
