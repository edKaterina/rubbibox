import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadComponent } from 'src/app/components/form-upload/form-upload.component';
import { SortNotifyPipe } from 'src/app/pipe/sort-notify.pipe';
import { FormsModule } from '@angular/forms';
import { ResponsesListComponent } from 'src/app/components/responses-list/responses-list.component';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';
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
