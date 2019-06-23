import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {Observable, Subscription} from 'rxjs';



@Component({
    selector: 'app-dialogs',
    templateUrl: './dialogs.page.html',
    styleUrls: ['./dialogs.page.scss'],
})
export class DialogsPage {

    // list: Observable<DialogModel[]>;
    // count = -1;
    // subscription: Subscription;

    constructor(
        // private authService: AuthService,
        // private userServise: UsersService,
        // private notivicationService: NotificationService
    ) {
    }

    // ionViewDidLeave() {
    //     this.list = null;
    //     this.subscription.unsubscribe();
    // }
    //
    //
    // ionViewDidEnter() {
    //     /*  this.userServise.getUserByID('84bcXoIr6hURwtFmcD0Bjaxr5KG2').valueChanges()
    //           .subscribe(value => {
    //               console.log(value);
    //           });*/
    //     this.authService.auth().then(login => {
    //         this.list = this.notivicationService.getNotify()
    //             .snapshotChanges()
    //             .pipe(
    //                 map(
    //                     actions => actions.map(
    //                         a => {
    //                             const id = a.payload.key;
    //                             const data = a.payload.val();
    //                             data.key = id;
    //                             if (data.key.indexOf('messages') > -1) {
    //                                 return {id, ...data};
    //
    //                             }
    //                         }
    //                     )
    //                 ),
    //                 switchMap((data: any) => {
    //                     const arr = data.map((message) => {
    //                         return this.userServise.getUserByID(message.user)
    //                             .pipe(
    //                                 first(),
    //                                 map((user) => {
    //                                     console.log(user);
    //                                     if (user) {
    //                                         if (!user.picture) {
    //                                             user.picture = ['https://bipbap.ru/wp-content/uploads/2017/08/16.jpg'];
    //                                         }
    //                                         message.userData = user ? user as UserModel : new UserModel();
    //                                     } else {
    //                                         message.userData = new UserModel();
    //                                     }
    //                                     return message;
    //                                 })
    //                             );
    //                     });
    //                     return combineLatest(...arr);
    //                 })
    //             );
    //
    //         this.subscription = this.list.subscribe(value2 => {
    //             console.log(value2);
    //             // this.count = value2.length;
    //         });
    //     });


        // console.log(this.list);
    // }

}
