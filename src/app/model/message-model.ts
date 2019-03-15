export class MessageModel {
    key?:       string;
    dateCreate: string;  // Дата создания
    text:       string;  // Текст сообщения
    user:       string;  // код пользователя
    dateGroup:  string   // дата для отображения группировки в чате, присутствует если дата новая

    constructor() {
    }
}
