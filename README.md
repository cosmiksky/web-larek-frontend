# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Базовые классы
 Api:
Класс Api предоставляет базовые методы для взаимодействия с серверным API. Класс Api предоставляет интерфейс для взаимодействия с сервером посредством выполнения HTTP-запросов.

constructor(baseUrl: string, options: RequestInit = {}) - cоздает новый экземпляр класса Api с указанным базовым URL и опциями запроса.

Методы:

- get (выполняет HTTP GET запрос по указанному URI и возвращает объект с данными ответа)
- post (выполняет HTTP POST запрос по указанному URI с переданными данными и методом запроса и возвращает объект с данными ответа)

 Component:
Абстрактный базовый класс, который предназначен для разработки компонентов пользовательского интерфейса. Он предоставляет средства для управления элементами DOM и поведением компонента.
constructor(container: HTMLElement) - принимает контейнерный элемент, в который компонент будет размещен.
Методы:
- toggleClass (переключает класс для элемента)
- setText (устанавливает текстовое содержимое для элемента)
- setImage (устанавливает изображения и альтернативный текст)
- setDisabled (меняет статус блокировки для элемента)
- setHidden (скрывает элемент)
- setVisible (отображает элемент)
- render (возвращает корневой DOM-элемент)

 EventEmitter:
Класс EventEmitter обеспечивает функционал для взаимодействия компонентов приложения через обмен данными и сообщениями с помощью событий. Он позволяет устанавливать обработчики событий, генерировать события и прослушивать все события или события с определенными именами.
Методы:
- on (устанавливает обработчик на событие)
- off (удаляет обработчик с события)
- emit (инициирует событие с данными)
- onAll (устанавливает обработчик для всех событий)
- offAll (удаляет все обработчики событий)
- trigger (создает триггер, который генерирует событие при вызове)
Класс EventEmitter воплощает в себе паттерн "Observer", что позволяет компонентам подписываться на события и уведомлять их о возникновении этих событий.

 Model:
Класс Model является основным классом, который используется для формирования моделей данных и управления данными в приложении.
Методы:
- emitChanges (cообщает всем подписчикам о изменениях в модели)

##Описание компонентов
Класс larekApi представляет собой компонент, который взаимодействует с определенным сервером API и наследует свойства от класса Api.

Класс Page extends Component<IPage> - класс, который расширяет функциональность ларька путем добавления ленты и добавления слушателя на элемент корзины, является подклассом Component.

Класс Card extends Component<ICard> - класс, который наследуется от класса Component и используется для создания карточек.

Класс Modal extends Component<IModal> - класс, который отображает модальное окно, является наследником класса Component.

Класс Basket extends Component<IBasket> - класс является подклассом Component и предназначен для отображения корзины и содержащихся в ней товаров.

Класс Form представляет собой компонент, который отображает основную форму.

Класс ContactForm extends Form<IContactForm> представляет собой компонент, который отображает форму для ввода контактной информации при оформлении заказа и является наследником класса Component.

Класс DeliveryForm extends Form<IDeliveryForm> представляет собой компонент, который отображает форму для доставки при оформлении заказа и является наследником класса Component.

Класс SuccessOrder - это класс, который представляет успешный заказ и наследуется от Component.

Класс StateApp описывает общее состояние приложения. Интерфейс IAppState определяет структуру этого состояния. AppState наследуется от Model, что позволяет использовать функциональность базовой модели для управления событиями и обновлением данных.

## Типы данных
```
//Интерфейс описывающий страницу
interface IPage 
counter:number // счетчик товаров в корзине
catalog:HTMLElement[] // массив карточек товаров

//Интерфейс описывающий карточки товара
interface ICard
id: string // идентификатор товара в магазине
title: string // название товара
image: string // ссылка на картинку товара
description: string // описание товара
selected: boolean // показывает добавлен ли товар в корзину
category: string // категория товара
price: number | null // цена товара

//Интерфейс описывающий информацию о заказе
interface IOrder
payment:string // способ оплаты
total:number // сумма заказа
address:string // адрес доставки
phone:string // мобильный номер
email:string // электронный адрес покупателя
items:string[] // массив идентификаторов купленных товаров

//Интерфейс формы адреса и способа оплаты
interface IDeliveryForm
payment:string // способ оплаты
address:string // адрес доставки

//Интерфейс контактов покупателя
interface IContactForm
email:string // электронная почта 
phone:string // телефон 

//Интерфейс описывающий статус приложения
interface IStateApp
catalog:ICard[] // каталог товаров
order:IOrder|null // заказ
basket:ICards[] // корзина
setCatalog(items: ICards[]): void // устанавливает каталог товаров
addBasket(product:ICards): void // добавляет в корзину товар
removeBasket(product: ICards): void // удаляет из корзины товар
getResultBasket(): number // получает общую сумму заказа
```
