import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormUploadComponent } from '../../components/form-upload/form-upload.component';

const components = [
    FormUploadComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [components, TranslateModule]
})

export class CoreModule {
  constructor() {}
}
