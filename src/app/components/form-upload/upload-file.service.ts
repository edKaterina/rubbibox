import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  private basePath = '/uploads';

  saveBase64ToStorage(imageData: string): Subject<any> {
    const status = new Subject();
    const base64Image = 'data:image/jpeg;base64,' + imageData;

    const uploadTask = firebase.storage().ref().child(`${this.basePath}/image${Date.now()}.jpg`)
      .putString(base64Image, firebase.storage.StringFormat.DATA_URL);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    }, (error) => {
    },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          status.next(downloadURL);
        });
      }
    );
    return status;
  }
}
