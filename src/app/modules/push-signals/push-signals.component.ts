import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'app-push-signals',
    templateUrl: './push-signals.component.html',
    styleUrls: [ './push-signals.component.scss' ],
})
export class PushSignalsComponent
{

    constructor(
        public userService: UserService,
    )
    {
    }

    changeName()
    {
        this.userService.updateCurrentUser({ displayName: `${ Math.floor(Math.random() * 10)}` })
            .subscribe();
    }
}
