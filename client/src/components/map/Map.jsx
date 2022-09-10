import React, { useEffect, useState } from 'react';
import './Map.css';

const { ymaps } = window;

export default function Map() {
//   const center = [55.7536760175035, 37.61988016065489];
  const center = [20, 20];

  //   const [map, setMap] = useState(null);

  function init() {
    const myMap = new ymaps.Map('map', {
      center,
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });

    // setMap(myMap);

    // const clickHandler ()=>c

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', (e) => {
      if (!myMap.balloon.isOpen()) {
        const coords = e.get('coords');
        console.log(coords);
        myMap.balloon.open(coords, {
          contentHeader: 'Событие!',
          contentBody: '<button onClick={clickHandler}>sss</button'
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

    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', (e) => {
      myMap.hint.close();
    });
  }

  const placemark = (place) => new ymaps.Placemark(place, {}, {

    iconLayout: 'default#image',
    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
    iconImageSize: [40, 40],
    iconImageOffset: [-19, -36]

  });

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
    ymaps.ready(init);
  }, []);

  return (
    <div>
      <div id="map" className="mapContainer">
        {/* <NavLink to="/map"><BlogPosts /></NavLink> */}
      </div>
    </div>
  );
}
