import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { FileUpload } from '../../model/file-upload';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'rtp-form-upload',
  inputs: ['count', 'files'],
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  uploadFiles: { files: Array<string> } = { files: [] }; // загружаемые файлы
  count: number; // предельное количество файлов

  @Input()
  get files() {
    return this.uploadFiles.files;
  }

  @Output() filesChange = new EventEmitter();

  set files(value: Array<string>) {
    if (value) {
      this.uploadFiles = { files: value };
      this.filesChange.emit(this.uploadFiles.files);
    }
  }

  constructor(
    private uploadService: UploadFileService
    , public actionSheetController: ActionSheetController
  ) {
  }

  getFiles() {
    return this.uploadFiles.files;
  }

  ngOnInit() {
  }

  isLoadImage() {
    const curCount: number = this.uploadFiles.files.length;
    this.files = this.uploadFiles.files;
    return (curCount < this.count);
  }

  focus(e, el) {
    el.click();
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.upload(event.target.files.item(0));
    } else {
      alert('invalid format!');
    }
  }

  upload(file) {
    this.uploadService.pushFileToStorage(new FileUpload(file), this.uploadFiles);
  }

  removeFile(file: string) {
    const index = this.uploadFiles.files.indexOf(file);
    this.presentActionSheet(index);
  }

  async presentActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Удалить файл',
      buttons: [{
        text: 'Удалить',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.uploadFiles.files.splice(index, 1);
        }
      }, {
        text: 'Отмена',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }
}
