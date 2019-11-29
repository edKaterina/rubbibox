import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-claim-modal',
  templateUrl: './claim-modal.component.html',
  styleUrls: ['./claim-modal.component.scss']
})
export class ClaimModalComponent implements OnInit {
  array = [
    'Werbung', 'Inhalt'
  ];
  constructor(
    private modalController: ModalController,
    private core: CoreService
  ) { }

  ngOnInit() {
  }
  close() {
      this.modalController.dismiss();
  }
  claim(claim) {
    this.core.presentToast('claim_send');
    this.modalController.dismiss({claim});

  }
}
