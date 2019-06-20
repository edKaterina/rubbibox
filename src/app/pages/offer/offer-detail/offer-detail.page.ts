import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.page.html',
    styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {


    detailInfo =
        {
            uid: '123',
            name: '2-к квартира, 42 м², 5/5 э. Очень длинное название для объявления',
            price: '1 600 000 ₽',
            // не Больше 5 картинок
            arImg: [
                'https://21.img.avito.st/640x480/3323009121.jpg',
                'https://13.img.avito.st/640x480/5612505913.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/10/bez-imeni-3.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/09/20160903_143424.jpg',
                'http://kvartira154.ru/wp-content/uploads/2016/10/bez-imeni-131.jpg'
            ],
            dateCreate: 'Сегодня 11:33',
            category: 'Недвижимость',

            fields: {
                description: `Идеальная однокомнатная квартира для 1-2 человек, с отличным капитальным ремонтом. 
Квартира пустая, документы готовы, чистая продажа. Без долгов и обременений. Два взрослых собственника, сделка у нотариуса. Ключи в день сделки. 
Стены выровнены и покрыты венецианской штукатуркой. Полы выровнены, покрыты гидроизоляцией, на полу в комнате ламинат и керамогранит в коридоре и кухне. Натяжные потолки по всей квартире и встроенные светодиодные светильники. Полностью заменены батареи. Пластиковые окна на две стороны. Электрика полностью заменена на новую, с отдельным автоматом на каждый потребитель. Сантехника заменена, трубы заменены, есть вывод под стиральную машину. Приборы учёта после поверки. 
Установлены дорогие двери. 

Остаётся дорогой кухонный гарнитур с встроенной плитой и вытяжкой ( гарнитур на гарантии). Остаётся так же все оборудование в ванной и прихожей. Остаётся кондиционер с климат-контролем. 
Хороший обжитой район. В шаговой доступности школа, детский сад и площадки, магазины и банки. На стоянке много парковочных мест. 
Из минусов : нет балкона.`
            }
        };

    constructor() {
    }

    ngOnInit() {
    }

}
