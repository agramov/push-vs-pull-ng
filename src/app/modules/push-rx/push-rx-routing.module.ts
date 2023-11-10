import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PushRxComponent } from './push-rx.component';

const routes: Routes = [
    {
        path: '',
        component: PushRxComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class PushSignalsRoutingModule { }
