const teamButtons = document.querySelectorAll('.team-nav-link')

if (window.innerWidth < 1024) {
  teamButtons.forEach(btn => {
  // вешаем на каждую кнопку обработчик события клик
    btn.addEventListener('click', () => {
      // Получаем предыдущую активную кнопку
      const prevActiveItem = document.querySelector('.team-member-box_active');
      // Получаем предыдущую активную вкладку
      const prevActiveButton = document.querySelector('.team-nav-link_active');
      
      // Проверяем есть или нет предыдущая активная кнопка
      if (prevActiveButton) {
        //Удаляем класс _active у предыдущей кнопки если она есть
        prevActiveButton.classList.remove('team-nav-link_active');
      }
      
      // Проверяем есть или нет предыдущая активная вкладка
      if (prevActiveItem) {
        // Удаляем класс _active у предыдущей вкладки если она есть
        prevActiveItem.classList.remove('team-member-box_active');
      }
      // получаем id новой активной вкладки, который мы перем из атрибута data-tab у кнопки
      const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;
      // получаем новую активную вкладку по id
      const nextActiveItem = document.querySelector(nextActiveItemId);
      
      // добавляем класс _active кнопке на которую нажали
      btn.classList.add('team-nav-link_active');
      // добавляем класс _active новой выбранной вкладке
      nextActiveItem.classList.add('team-member-box_active');
    });
  })
}

if (window.innerWidth < 1024) {
  // Получаем все элементы с классом 'team-popup'
  const popups = document.querySelectorAll('.team-popup');

  // Обходим каждый элемент и добавляем обработчик событий
  popups.forEach(popup => {
      popup.addEventListener('click', () => {
          // Проверяем, есть ли у элемента класс 'team-popup_opened'
          if (popup.classList.contains('team-popup_opened')) {
              // Если есть, то удаляем его
              popup.classList.remove('team-popup_opened');
          } else {
              // Если нет, то добавляем
              popup.classList.add('team-popup_opened');
          }
      });
  });
} else {
  const popups = document.querySelectorAll('.team-popup');

  // Обходим каждый элемент и добавляем обработчики событий
  popups.forEach(popup => {
      // Добавляем класс при наведении
      popup.addEventListener('mouseenter', () => {
          popup.classList.add('team-popup_opened');
      });
  
      // Удаляем класс при уходе курсора
      popup.addEventListener('mouseleave', () => {
          popup.classList.remove('team-popup_opened');
      });
  });
}