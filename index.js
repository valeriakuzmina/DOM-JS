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
    "currentParticipants": 8
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

const lessons = JSON.parse(dataJson);
console.log(lessons);

lessons.forEach((element) => {
  divElForLessons.insertAdjacentHTML(
    `beforeend`,
    `
  <div class="description-lesson">
  <p class="name"> Название: ${element.name}</p>
  <p class="time"> Время: ${element.time}</p>
  <p class="max-people">Макс.чел: ${element.maxParticipants}</p>
  <p class="
  recorded-people">Записано: ${element.currentParticipants}</p>
  <button class="
  sign-up">Записаться</button>
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
    const cancelButton = container.querySelector(".cancel");
    cancelButton.style.display = "inline-block";
  
});

//const lesson = lessons.find(item => item.id === id)
// const buttonSing = document.querySelectorAll(".sing-up");
// buttonSing.addEventListener("click", (e) => {
//   e.target.style.display = "none";
// });
