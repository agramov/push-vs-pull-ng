import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullComponent } from './pull.component';

const routes: Routes = [
    {
        path: '',
        component: PullComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class PullRoutingModule { }
