import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pull',
    },
    {
        path: 'pull',
        loadChildren: () => import('./modules/pull/pull.module').then(m => m.PullModule),
    },
    {
        path: 'push-signals',
        loadChildren: () => import('./modules/push-signals/push-signals.module').then(m => m.PushSignalsModule),
    },
    {
        path: 'push-rx',
        loadChildren: () => import('./modules/push-rx/push-rx.module').then(m => m.PushRxModule),
    },
    {
        path: 'push-ngrx',
        loadChildren: () => import('./modules/push-ngrx/push-ngrx.module').then(m => m.PushNgRxModule),
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule { }
