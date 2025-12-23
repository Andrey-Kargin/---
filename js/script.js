const burger = document.querySelector('.burger');
const headerNav = document.querySelector('.header__nav');
const headerNavLink = document.querySelector('.header__nav-link');

// document.addEventListener("DOMContentLoaded", () => {
//   // Находим все элементы с классом filter-column
//   const filterColumns = document.querySelectorAll(".filter-column");

//   filterColumns.forEach((column) => {
//     // Добавляем обработчик события на клик для каждой filter-column
//     column.addEventListener("click", (event) => {
//       // Проверяем, что клик произошел по элементу label
//       const label = event.target.closest("label");
//       if (label) {
//         // Удаляем класс filter-picked у всех label внутри текущего столбца
//         const labels = column.querySelectorAll("label");
//         labels.forEach((lbl) => lbl.classList.remove("filter-picked"));

//         // Добавляем класс filter-picked к нажатому label
//         label.classList.add("filter-picked");
//       }
//     });
//   });
// });

if (window.innerWidth < 767) {
  burger.onclick = function() {
    burger.classList.toggle('burger_opened');
    headerNav.classList.toggle('header__nav_opened');
  }

  headerNavLink.onclick = () => {
    burger.classList.remove('burger_opened');
    headerNav.classList.remove('header__nav_opened');
  }
}

const popup = document.querySelector('.popup');
const headerBtn = document.querySelectorAll('.header__btn');
const closePopup = document.querySelector('.close-popup')

headerBtn.forEach((e) => e.addEventListener('click', () => {
  popup.classList.add('popup_opened');
}));

closePopup.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

const filterMain = document.querySelector('.projects__filter .desc');
const filterBox = document.querySelector('.projects__filter');
const filterBtn = document.querySelector('.filter-btn');
const filterColumns = document.querySelectorAll('.filter-column');
const clearFilter = document.querySelector('.projects__list1');

const filterLabel = document.querySelectorAll('.filter-column label');

clearFilter.addEventListener('click', () => {
  filterLabel.forEach((e) => {
    e.classList.remove("filter-picked");
  })
})

filterMain.addEventListener('click', () => {
  filterMain.classList.toggle('filter_opened');
  filterBox .classList.toggle('projects__filter_opened') // Переключаем основной класс

  filterColumns.forEach((filterColumn) => {
    const isOpened = filterColumn.classList.contains('filter-column_opened');

    if (!isOpened) {
      // Открытие
      filterColumn.style.display = 'flex'; // Устанавливаем display
      const height = filterColumn.scrollHeight + 'px'; // Вычисляем полную высоту
      filterColumn.style.height = height; // Устанавливаем высоту для анимации
      filterColumn.classList.add('filter-column_opened');

      setTimeout(() => {
        filterColumn.style.height = ''; // Сбрасываем height после анимации
      }, 300); // Должно совпадать с transition-duration в CSS
    } else {
      // Закрытие
      filterColumn.style.height = filterColumn.scrollHeight + 'px'; // Фиксируем текущую высоту
      setTimeout(() => {
        filterColumn.style.height = '0'; // Сжимаем элемент
      }, 10); // Небольшая задержка для плавного перехода

      filterColumn.addEventListener('transitionend', () => {
        filterColumn.style.display = 'none'; // Скрываем после завершения анимации
      }, { once: true });

      filterColumn.classList.remove('filter-column_opened');
    }
  });
});

// Для мобильных устройств (<767px)
if (window.innerWidth < 767) {
  filterMain.addEventListener('click', () => {
    filterBtn.classList.toggle('filter-btn_active'); // Переключение состояния кнопки
  });

 // Клик на filterBtn
 filterBtn.addEventListener('click', () => {
  // Убираем активный класс с кнопки
  filterBtn.classList.remove('filter-btn_active');

  // Закрываем filterMain
  filterMain.classList.remove('filter_opened');

  // Закрываем все filterColumns
  filterColumns.forEach((filterColumn) => {
    if (filterColumn.classList.contains('filter-column_opened')) {
      filterColumn.style.height = filterColumn.scrollHeight + 'px'; // Фиксируем текущую высоту
      setTimeout(() => {
        filterColumn.style.height = '0'; // Плавно сжимаем элемент
      }, 10);

      filterColumn.addEventListener(
        'transitionend',
        () => {
          filterColumn.style.display = 'none'; // Прячем после завершения анимации
        },
        { once: true }
      );

      filterColumn.classList.remove('filter-column_opened');
    }
  });
});
}

const listMain = document.querySelector('.list');

listMain.addEventListener('click', () => {
    document.querySelectorAll('.projects__container').forEach((e) => e.classList.toggle('projects__container_opened'));
    
    // Меняем текст в зависимости от текущего состояния
    if (listMain.innerHTML.includes('список')) {
        listMain.innerHTML = 'таблица <span>(23)</span>';
        listMain.classList.add('list_opened');
    } else {
        listMain.innerHTML = 'список <span>(23)</span>';
        listMain.classList.remove('list_opened');
    }
});

