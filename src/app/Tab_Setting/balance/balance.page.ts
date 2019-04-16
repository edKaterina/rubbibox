import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';
import { BalanceModel } from 'src/app/model/balance';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  historyList: Observable<BalanceModel[]>;
  count = 0;
  currentBalance = 0;

  constructor(
    private balanceService: BalanceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.balanceService.currentBalanceCache().then(balance => {
      if (balance) {
        this.currentBalance = balance;
      }
    });
    this.authService.state.subscribe(authData => {
      this.balanceService.currentBalance().valueChanges().subscribe(balance => {
        if (balance) {
          this.currentBalance = balance;
        }
      });
      this.historyList = this.balanceService.history().valueChanges();
      this.historyList.subscribe(value =>{
        this.count = value.length;
      });
    });
  }

  add() {

  }

}
