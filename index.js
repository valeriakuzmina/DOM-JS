// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

const dataJson = `[
  {
    "id": 1,
    "name": "Йога",
    "time": "10:00 - 11:00",
    "maxParticipants": 15,
    "currentParticipants": 15
  },
  {
    "id": 2,
    "name": "Пилатес",
    "time": "11:30 - 12:30",
    "maxParticipants": 10,
    "currentParticipants": 5
  },
  {
    "id": 3,
    "name": "Кроссфит",
    "time": "13:00 - 14:00",
    "maxParticipants": 20,
    "currentParticipants": 15
  },
  {
    "id": 4,
    "name": "Танцы",
    "time": "14:30 - 15:30",
    "maxParticipants": 12,
    "currentParticipants": 10
  },
  {
    "id": 5,
    "name": "Бокс",
    "time": "16:00 - 17:00",
    "maxParticipants": 8,
    "currentParticipants": 6
  }
]`;

const key = "user";

const divElForLessons = document.querySelector(".container-lessons");

const lessons = JSON.parse(localStorage.getItem(key));
console.log(lessons);

lessons.forEach((element) => {
  divElForLessons.insertAdjacentHTML(
    `beforeend`,
    `
  <div class="description-lesson" data-id= "${element.id}">
  <p class="name"> Название: ${element.name}</p>
  <p class="time"> Время: ${element.time}</p>
  <p class="max-people">Макс.чел: ${element.maxParticipants}</p>
  <p class="
  recorded-people">Записано: ${element.currentParticipants}</p>
  <button class="
  sing-up">Записаться</button>
  <button class="
  cancel">Отменить запись</button>
  </div>
  `
  );
});

const buttonCancel = divElForLessons.querySelectorAll(".cancel");
buttonCancel.forEach((element) => {
  element.style.display = "none";
});

divElForLessons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("sing-up")) {
    return;
  }

  const container = e.target.closest(".description-lesson");

  // Находим кнопку "Отменить запись" и показываем её
  const cancelButton = container.querySelector(".cancel");

  // Получаем id урока из атрибута data-id контейнера
  const lessonId = lessons.find(
    (item) => item.id === +container.getAttribute("data-id")
  );

  if (lessonId.currentParticipants < lessonId.maxParticipants) {
    // Обновляем количество участников урока
    lessonId.currentParticipants++;

    // Обновляем отображение количества записанных людей
    const recordedPeople = container.querySelector(".recorded-people");
    recordedPeople.innerHTML = `Записано: ${lessonId.currentParticipants}`;

    // Отображаем кнопку "Отменить запись"
    cancelButton.style.display = "inline-block";

    // Скрываем кнопку "Записаться"
    e.target.style.display = "none";
  } else {
    const pEL = document.createElement("p");
    pEL.innerHTML = "Запись недоступна";
    pEL.classList.add("unavailable");
    container.appendChild(pEL);
    e.target.style.display = "none";
    setTimeout(() => {
      e.target.style.display = "block";
      pEL.style.display = "none";
    }, 3000);
  }

  localStorage.setItem(key, JSON.stringify(lessons));
});

divElForLessons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cancel")) {
    return;
  }
  const container = e.target.closest(".description-lesson");
  const signUpButton = container.querySelector(".sign-up");

  const lessonId = lessons.find(
    (item) => item.id === +container.getAttribute("data-id")
  );

  // Уменьшаем количество участников и обновляем отображение
  if (lessonId.currentParticipants > 0) {
    lessonId.currentParticipants--;
  localStorage.setItem(key, JSON.stringify(lessons));

  }
  const recordedPeople = container.querySelector(".recorded-people");
  recordedPeople.innerHTML = `Записано: ${lessonId.currentParticipants}`;
  const singButton = container.querySelector(".sing-up");

  singButton.style.display = "inline-block";
  e.target.style.display = "none";
  
});
