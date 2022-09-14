/* eslint-disable prefer-rest-params */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Map.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BlogPosts from '../BlogPosts/BlogPosts';
import { getAllLocationsThunk } from '../../redux/actions/locationsAction';

const { ymaps } = window;

export default function Map() {
  const [pickedBaloon, setPickedBaloon] = useState(null);
  console.log(pickedBaloon);
  const [myMap, setMap] = useState(null);
  const locations = useSelector((state) => state.locations);
  //   console.log('locations', locations);
  const dispatch = useDispatch();
  const [currentCoords, setCurrentCoords] = useState(null);
  const [blogPostsState, setBlogPostsState] = React.useState({ right: false });
  //   console.log('cooooordsssss', currentCoords);
  //   const [locations, setLocations] = useState([]);

  const MyBalloonContentLayout = ymaps.templateLayoutFactory?.createClass(
    '<h3 class="popover-title">$[properties.balloonHeader]</h3>'
    + '<div class="popover-content">$[properties.balloonContent]</div>'
  );

  const MyBalloonLayout = ymaps.templateLayoutFactory?.createClass('<div class="popover top">'
        + '<a class="close" href="#">&times;</a>'
        + '<div class="arrow"></div>'
        + '<div class="popover-inner">'
          + '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]'
        + '</div>'
      + '</div>', {
    //   /**
    //   * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
    //   * @function
    //   * @name build
    //   */
    build() {
      this.constructor.superclass.build.call(this);

      this._element = this.getParentElement().querySelector('.popover');
      this._onCloseClick = this.onCloseClick.bind(this);

      this.applyElementOffset();

      this._element.querySelector('.close').addEventListener('click', this._onCloseClick);
    },

    //   /**
    //   * Удаляет содержимое макета из DOM.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
    //   * @function
    //   * @name clear
    //   */
    clear() {
      this._element.querySelector('.close').removeEventListener('click', this._onClickClick);

      this.constructor.superclass.clear.call(this);
    },

    //   /**
    //   * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
    //   * @function
    //   * @name onSublayoutSizeChange
    //   */
    onSublayoutSizeChange() {
      MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

      if (!this._isElement(this._element)) {
        return;
      }

      this.applyElementOffset();

      this.events.fire('shapechange');
    },

    //   /**
    //   * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
    //   * @function
    //   * @name applyElementOffset
    //   */
    applyElementOffset() {
      Object.assign(this._element.style, {
        left: `${-(this._element.offsetWidth / 2)}px`,
        top: `${-(this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight)}px`
      });
    },

    //   /**
    //   * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
    //   * @function
    //   * @name onCloseClick
    //   */
    onCloseClick(e) {
      e.preventDefault();

      this.events.fire('userclose');
    },

    //   /**
    //   * Используется для автопозиционирования (balloonAutoPan).
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
    //   * @function
    //   * @name getClientBounds
    //   * @returns {Number[][]}
    //   Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
    //   */
    getShape() {
      if (!this._isElement(this._element)) {
        return MyBalloonLayout.superclass.getShape.call(this);
      }

      const style = getComputedStyle(this._element);
      const position = {
        left: parseFloat(style.left),
        top: parseFloat(style.top)
      };

      return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
        [position.left, position.top], [
          position.left + this._element.offsetWidth,
          position.top + this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight
        ]
      ]));
    },

    //   /**
    //   * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
    //   * @function
    //   * @private
    //   * @name _isElement
    //   * @param {jQuery} [element] Элемент.
    //   * @returns {Boolean} Флаг наличия.
    //   */
    _isElement(element) {
      return element && element.querySelector('.arrow');
    }
  });

  useEffect(() => {
    dispatch(getAllLocationsThunk());
  }, []);

  const center = [55.7536760175035, 37.61988016065489];

  function init() {
    if (!myMap) {
      const m = new ymaps.Map('map', {
        center,
        zoom: 2
      }, {
        searchControlProvider: 'yandex#search'
      });

      setMap(m);

      return null;
    }

    // / /////////////////////////////////////////////////////////////////////////////////
    // Создание макета балуна на основе Twitter Bootstrap.

    // Создание вложенного макета содержимого балуна.

    // Создание метки с пользовательским макетом балуна.

    /// ///////////////////////////////////////////////////////////////

    /// ///////////////////////////////////////////////////////////////
    const myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      balloonHeader: 'Заголовок балуна',
      balloonContent: 'Контент балуна'
    }, {
      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
      balloonPanelMaxMapArea: 0
      // Не скрываем иконку при открытом балуне.
      // hideIconOnBalloonOpen: false,
      // И дополнительно смещаем балун, для открытия над иконкой.
      // balloonOffset: [3, -40]
    });

    myMap.geoObjects.add(myPlacemark);

    // / /////////////////////////////////////////////////////////////////////////////////
    document.querySelector('#set-balloon-header').addEventListener('click', () => {
      window.myPlacemark.properties.set(
        'balloonHeader',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
    });

    document.querySelector('#set-balloon-content').addEventListener('click', () => {
      window.myPlacemark.properties.set(
        'balloonContent',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
    });

    // document.querySelector('#yyy').addEventListener('click', () => {
    //   console.log('yyyyyyyyy');
    // });
    // / /////////////////////////////////////////////////////////////////////////////////

    // setMap(myMap);

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', (e) => {
      if (!myMap.balloon.isOpen()) {
        const coords = e.get('coords');
        setCurrentCoords(coords);
        setBlogPostsState({ ...blogPostsState, right: true });
        // toggleDrawer('right', true);
        // setBlogPostsState({ right: true });
        // console.log(blogPostsState);

        myMap.balloon.open(coords, {
          contentHeader: 'Событие!',
          contentBody: '<button id="yyy">sss</button'
                    + `<p>Координаты щелчка: ${[
                      coords[0].toPrecision(6),
                      coords[1].toPrecision(6)
                    ].join(', ')}</p>`,
          contentFooter: '<sup>Щелкните еще раз</sup>'
        });
      } else {
        myMap.balloon.close();
      }
    });

    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', (e) => {
      myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });

    // Скрываем хинт при открытии балуна.   // ВАЖНООООО
    myMap.events.add('balloonopen', (e) => {
      console.log('aaaa', e.get('coords'));
      myMap.hint.close();
    });
    return null;
  }

  const placemark = (place) => new ymaps.Placemark(place, {}, {

    iconLayout: 'default#image',
    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
    iconImageSize: [40, 40],
    iconImageOffset: [-19, -36]

  });

  /// ////////////////////////////////////////////////////////////////////////////////

  const myPolyline = new ymaps.Polyline([
  // Указываем координаты вершин ломаной.
    [55.80, 37.50],
    [55.80, 3.40],
    [5.70, 37.50],
    [5.70, 3.40]
  ], {
  // Описываем свойства геообъекта.
  // Содержимое балуна.
    balloonContent: 'Ломаная линия'
  }, {
  // Задаем опции геообъекта.
  // Отключаем кнопку закрытия балуна.
    balloonCloseButton: false,
    // Цвет линии.
    strokeColor: '#ff0000',
    // Ширина линии.
    strokeWidth: 4,
    // Коэффициент прозрачности.
    strokeOpacity: 0.5
  });

  // Добавляем линии на карту.
  myMap?.geoObjects
    .add(myPolyline);

  //   if (map) {
  //     const myGeocoder = ymaps.geocode('Южнобутовская 66');
  //     myGeocoder.then(
  //       (res) => {
  //         const place = placemark(res.geoObjects.get(0).geometry.getCoordinates());

  //         setMap((prev) => {
  //           prev.geoObjects.add(
  //             place
  //           );
  //           // prev[center] = place;
  //           return prev;
  //         });
  //       },
  //       (err) => {
  //         alert('Ошибка', err);
  //       }
  //     );
  //   }

  useEffect(() => {
    if (locations.length && myMap) {
      locations.forEach((x, index) => {
        const myPlacemark = new ymaps.Placemark([Number(x.coordX), Number(x.coordY)], {
          balloonHeader: `${x.name}`,
          balloonContent: { id: x.id }
        }, {
          balloonShadow: false,
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonPanelMaxMapArea: 0
          // Не скрываем иконку при открытом балуне.
          // hideIconOnBalloonOpen: false,
          // И дополнительно смещаем балун, для открытия над иконкой.
          // balloonOffset: [3, -40]
        });

        myPlacemark.events.add('balloonopen', (e) => {
          myPlacemark.properties.set('balloonContent', 'Идет загрузка данных...');
          ymaps.geocode(myPlacemark.geometry.getCoordinates(), {
            results: 1
          }).then((data) => setPickedBaloon(data.metaData.geocoder.request));
          // .then((res) => {
          //   const newContent = res.geoObjects.get(0)
          //     ? res.geoObjects.get(0).properties.get('name')
          //     : 'Не удалось определить адрес.';

          //   // Задаем новое содержимое балуна в соответствующее свойство метки.
          //   myPlacemark.properties.set('balloonContent', newContent);
          // });
        });

        myMap.geoObjects.add(myPlacemark);
      });
    }
  }, [locations, myMap]);

  useEffect(() => {
    ymaps.ready(init);
  }, [myMap]);

  return (
    <div>
      <div id="map" className="mapContainer">
        <button type="button" id="set-balloon-header" className="btn">Задать заголовок балуна</button>
        <button type="button" id="set-balloon-content" className="btn">Задать содержимое балуна</button>
        <BlogPosts
          blogPostsState={blogPostsState}
          setBlogPostsState={setBlogPostsState}
          currentCoords={currentCoords}
        />
      </div>
    </div>
  );
}
