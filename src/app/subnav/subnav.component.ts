import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    selector: 'app-subnav',
    templateUrl: './subnav.component.html',
    styleUrl: './subnav.component.scss',
})
export class SubnavComponent
{

}
