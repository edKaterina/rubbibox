import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../../../services/auth.service";
import {map, switchMap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {Dialog} from "../../../interfaces/model/dialog";

@Injectable({
    providedIn: 'root'
})

export class DialogsService {

    public typeDialogsList = 'dialogslist';  // Диалоги мессенджера
    constructor(
        private db: AngularFireDatabase,
        private authService: AuthService,
        private userService: UserService
    ) {}

    add(from,to,data:Dialog){
        this.db.object(`${this.typeDialogsList}/${from}/${to}`).set(data);
        this.db.object(`${this.typeDialogsList}/${to}/${from}`).set(data);
    }

    get() {
        return this.db.list(this.typeDialogsList + '/' + this.authService.getLogin()).snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    let data = a.payload.val();
                    let key = a.payload.key;
                    return {key, ...data};
                })
            }),
            switchMap(dialogs => {
                const dialogs$:Array<Observable<any>> = dialogs.map((dialog:any) => {
                         return this.userService.getById(dialog.user).pipe(
                             map((user:any)=>{
                                 return {...dialog,user}
                             })
                         )
                     }
                 );
                 return combineLatest(dialogs$)
            })//,first()
        )
    }
}
