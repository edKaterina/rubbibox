import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-claim-modal',
  templateUrl: './claim-modal.component.html',
  styleUrls: ['./claim-modal.component.scss']
})
export class ClaimModalComponent implements OnInit {
  array = [
    'Werbung','Inhalt'
  ]
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  close(){
      this.modalController.dismiss();
  }
  claim(claim){
    this.modalController.dismiss({claim});

  }
}
