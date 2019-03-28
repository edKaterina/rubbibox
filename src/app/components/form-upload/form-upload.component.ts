import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'rtp-form-upload',
  inputs: ['count', 'files'],
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent {

  count: number; // предельное количество файлов
  isLoadingImage: boolean;
  photoFiles: Array<string>;
  isAllowDownload: boolean; // разрешено загружать еще файлы

  options: CameraOptions = {
    quality: 85,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 800,
    targetHeight: 800
  };

  @Input()
  get files() {
    return this.photoFiles;
  }

  @Output() filesChange = new EventEmitter();

  set files(value: Array<string>) {
    if (value) {
      this.photoFiles = value;
      this.filesChange.emit(this.photoFiles);

      this.changeAllowDownload();
    }
  }

  constructor(
    private uploadService: UploadFileService,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private alertController: AlertController,
    private photoViewer: PhotoViewer
  ) {
    this.photoFiles = [];
  }

  changeAllowDownload(isPreload?: boolean) {
    this.isAllowDownload = (this.photoFiles.length < (isPreload ? this.count - 1 : this.count));
  }

  async removeFile(file: string) {
    const index = this.photoFiles.indexOf(file);

    const alert = await this.alertController.create({
      header: 'Выберите действие',
      buttons: [{
        text: 'На весь экран',
        handler: () => {
          this.photoViewer.show(file);
        }
      }, {
        text: 'Удалить',
        role: 'destructive',
        handler: () => {
          this.photoFiles.splice(index, 1);
          this.changeAllowDownload();
        }
      }, {
        text: 'Отмена',
        role: 'cancel',
        handler: () => {

        }
      }]
    });

    await alert.present();
  }

  selectImage(source: number) {
    this.changeAllowDownload(true);
    this.options.sourceType = source;
    this.options.allowEdit = (source === this.camera.PictureSourceType.PHOTOLIBRARY);
    this.camera.getPicture(this.options).then((imageData) => {
      this.isLoadingImage = true;
      this.uploadService.saveBase64ToStorage(imageData).subscribe(uploadURLImage => {
        this.photoFiles.push(uploadURLImage);
        this.files = this.photoFiles;
        this.isLoadingImage = false;
        this.changeAllowDownload();
      });
    });
  }

  async choiceSourceImage() {
    const alert = await this.alertController.create({
      header: 'Источник фото',
      buttons: [{
        text: 'Камера',
        handler: () => {
          this.selectImage(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Альбом',
        handler: () => {
          this.selectImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Отмена',
        role: 'cancel',
        handler: () => {

        }
      }]
    });

    await alert.present();
  }
}
