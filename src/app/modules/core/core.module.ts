import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadComponent } from './../../components/form-upload/form-upload.component';
import { SortNotifyPipe } from './../../pipe/sort-notify.pipe';
import { FormsModule } from '@angular/forms';
import { ResponsesListComponent } from './../../components/responses-list/responses-list.component';
import { UserDetailComponent } from './../../components/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserDetailComponent, FormUploadComponent, SortNotifyPipe, ResponsesListComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  exports: [UserDetailComponent, FormUploadComponent, SortNotifyPipe, ResponsesListComponent]
})

export class CoreModule {
  constructor(
  ) {
  }

}
