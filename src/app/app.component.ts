import { Component } from '@angular/core';

import { ClarityIcons, boltIcon, cogIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, boltIcon, cogIcon);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent
{
    title = 'push-vs-pull-ng';
}
