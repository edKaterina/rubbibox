export class NotifyModel {
    key?:       string;
    dateCreate: string;  // Дата создания
    subject:    string;  // тема уведомления
    text:       string;  // Текст уведомления
    user:       string;  // код пользователя
    active:     boolean; // true - новое уведомление
    isRead:     boolean; // true - уведомление прочитано
    url:        string;  // страница для перехода из уведомления
    constructor() {
    }
}
