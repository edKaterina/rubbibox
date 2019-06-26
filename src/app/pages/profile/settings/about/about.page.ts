import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  textAbout: string;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.db.object('setting/about').valueChanges().subscribe(value => {
      this.textAbout = value as string;
    });
  }

}
