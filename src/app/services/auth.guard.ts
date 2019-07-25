import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public authServise: AuthService,
        private router: Router
    ) {
    }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.authServise.getCurrentUser()
                .then(user => {
                    return resolve(true);
                }, err => {
                    this.router.navigate(['/auth']);
                    return resolve(false);
                });
        });
    }
}
