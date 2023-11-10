import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';

import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './store/app.reducers';
import { AppEffects } from './store/app.effects';
import { UserService } from './modules/push-ngrx/user.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ClarityModule,
        AppRoutingModule,
        StoreModule.forRoot({ app: appReducer }),
        EffectsModule.forRoot([ AppEffects ]),
        StoreDevtoolsModule.instrument(),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    providers: [ UserService ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
