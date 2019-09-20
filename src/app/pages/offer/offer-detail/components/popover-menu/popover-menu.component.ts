import { Component, OnInit, Input } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})
export class PopoverMenuComponent implements OnInit {
@Input() link;
  constructor(
    private clipboard: Clipboard,
    private popoverController:PopoverController
    ) { }

  ngOnInit() {
  }
copy(){
this.clipboard.copy(this.link).then(()=>{
  this.popoverController.dismiss();
});
}
claim(){
this.popoverController.dismiss({claim:true});
}
}
