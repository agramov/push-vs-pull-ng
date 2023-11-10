import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import { SubnavComponent } from 'src/app/subnav/subnav.component';
import { SharedModule } from '../shared/shared.module';
import { PushSignalsRoutingModule } from './push-ngrx-routing.module';
import { PushNgRxComponent } from './push-ngrx.component';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { FilterComponent } from './components/filter/filter.component';
import { UserService } from './user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardEffects } from './store/dashboard.effects';
import { dashboardReducer, stateKey } from './store/dashboard.reducers';

@NgModule({
    imports: [
        SharedModule,
        PushSignalsRoutingModule,
        SubnavComponent,
        StoreModule.forFeature(stateKey, dashboardReducer),
        EffectsModule.forFeature(DashboardEffects),
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],

    declarations: [
        PushNgRxComponent,
        UserGridComponent,
        FilterComponent,
        DashboardComponent,
    ],

    providers: [
        UserService,
    ],
})
export class PushNgRxModule { }
