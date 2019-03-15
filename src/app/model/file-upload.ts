export class FileUpload {
    key: string;
    name: string;   // имя файла
    url: string;    // путь к файлу
    file: File;     // сам файл

    constructor(file: File) {
        this.file = file;
    }
}
