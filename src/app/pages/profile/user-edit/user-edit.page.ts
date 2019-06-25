import {Platform} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../../../interfaces/model/user";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-people-edit',
    templateUrl: './user-edit.page.html',
    styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

    user: User = new User('', {});

    constructor(
        private router: Router,
        public platform: Platform,
        public userService: UserService,
        public authService: AuthService
    ) {
        this.userService.getById(this.authService.getLogin()).subscribe(res => {
            this.user = res;
        })
    }

    ngOnInit() {
    }

    editUser(user) {
        this.userService.edit(user).then(() => {
            this.router.navigate(['/system/profile']);
        });
    }
}
