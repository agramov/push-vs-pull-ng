import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'app-pull',
    templateUrl: './pull.component.html',
    styleUrls: [ './pull.component.scss' ],
})
export class PullComponent
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
