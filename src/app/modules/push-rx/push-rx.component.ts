import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'app-push-rx',
    templateUrl: './push-rx.component.html',
    styleUrls: [ './push-rx.component.scss' ],
})
export class PushRxComponent
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
