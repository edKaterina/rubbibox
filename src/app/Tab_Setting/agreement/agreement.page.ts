import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

  textAgreement: string;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.db.object('setting/agreement').valueChanges().subscribe(value => {
      this.textAgreement = value as string;
    });
  }

}
