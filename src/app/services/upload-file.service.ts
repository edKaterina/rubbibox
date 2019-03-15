import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { FileUpload } from '../model/file-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private basePath = '/uploads';

  pushFileToStorage(fileUpload: FileUpload, uploadFiles: { files: Array<string> }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('Загружен файл');
          console.log(downloadURL);

          uploadFiles.files.push(downloadURL);
        });
      }
    );
  }
}
