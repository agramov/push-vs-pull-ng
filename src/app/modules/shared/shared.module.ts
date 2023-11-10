import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        HttpClientModule,
    ],
    exports: [
        CommonModule,
        ClarityModule,
        HttpClientModule,
    ],
})
export class SharedModule { }
