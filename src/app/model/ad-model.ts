import { AdFields, TypeField } from './ad-fields';

export class AdModel {
    key?: string;
    dateCreate: string; // Дата создания
    category: string;   // Категория объявлений
    job: string;        // Объявление
    user: string;       // код пользователя

    constructor() {
    }

    // дополнительные кастомизированные поля
    public static getFileds(category: string): Array<AdFields> {
        if (category === 'Тестовая категория') {
            return [
                {
                    name: 'job',
                    label: 'Заголовок',
                    type: TypeField.input,
                    placeholder: 'Коротко о квартире',
                    required: true
                },
                {
                    name: 'description',
                    label: 'Описание',
                    type: TypeField.textarea,
                    rows: 6,
                    placeholder: 'Подробнее о квартире',
                    required: true
                },
                {
                    name: 'area',
                    label: 'Площадь',
                    type: TypeField.input,
                    placeholder: 'Общая площадь'
                },
                {
                    name: 'date',
                    label: 'Дата',
                    type: TypeField.input,
                    placeholder: 'Дата',
                    typeInput: 'date'
                },
                {
                    name: 'options',
                    label: 'Опции (чекбоксы)',
                    type: TypeField.select,
                    placeholder: 'выберите несколько',
                    multiple: true,
                    values: ['1', '2', '3']
                },
                {
                    name: 'select',
                    label: 'Выбор из списка',
                    type: TypeField.select,
                    placeholder: 'выберите из списка',
                    values: ['1', '2', '3']
                }
            ];
        } else {
            return [
                {
                    name: 'job',
                    label: 'Описание',
                    type: TypeField.textarea,
                    rows: 6,
                    placeholder: 'Опишите подробно задачу',
                    required: true
                }
            ];
        }
    }
}
