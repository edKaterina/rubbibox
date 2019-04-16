import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CoreService } from './core.service';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { BalanceModel } from '../model/balance';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    private db: AngularFireDatabase,
    private coreService: CoreService,
    private authService: AuthService,
    private storage: Storage
  ) { }

  history(): AngularFireList<BalanceModel> {
    return this.db.list(`balance/${this.authService.getLogin()}/history`);
  }

  currentBalanceCache() {
    return this.storage.get('cache_balance');
  }

  currentBalance(): AngularFireObject<number> {
    const result: AngularFireObject<number> = this.db.object(`balance/${this.authService.getLogin()}/sum`);
    result.valueChanges().subscribe(balance => {
      this.storage.set('cache_balance', balance);
    });
    return result;
  }

}
