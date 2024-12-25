// Цвета и шансы их выпадения
const colors = [
    { name: 'gray', chance: 1/2 },   // 2x
    { name: 'blue', chance: 1/3 },  // 3x
    { name: 'pink', chance: 1/5 },  // 5x
    { name: 'green', chance: 1/7 }, // 7x
    { name: 'gold', chance: 1/14 }  // 14x
  ];

  const carouselTrack = document.getElementById('carousel-track');

  // Функция выбора цвета на основе шансов
  function getRandomColor() {
    const totalWeight = colors.reduce((sum, color) => sum + color.chance, 0);
    const randomNum = Math.random() * totalWeight;
    let runningSum = 0;

    for (const color of colors) {
      runningSum += color.chance;
      if (randomNum <= runningSum) {
        return color.name;
      }
    }
  }

  // Генерация списка цветов для прокрутки
  function generateCarouselItems() {
    const items = [];
    for (let i = 0; i < 20; i++) { // Добавляем несколько элементов для прокрутки
      const color = getRandomColor();
      const item = document.createElement('div');
      item.className = `carousel-item ${color}`;
      item.textContent = color.toUpperCase();
      items.push(item);
    }
    return items;
  }

  // Запуск анимации прокрутки
  function startRoll() {
    // Очистить текущий трек
    carouselTrack.innerHTML = '';

    // Сгенерировать новые элементы
    const items = generateCarouselItems();
    items.forEach(item => carouselTrack.appendChild(item));

    // Добавить конечный элемент, который будет "выпадением"
    const finalColor = getRandomColor();
    const finalItem = document.createElement('div');
    finalItem.className = `carousel-item ${finalColor}`;
    finalItem.textContent = finalColor.toUpperCase();
    items.push(finalItem);
    carouselTrack.appendChild(finalItem);

    // Анимация прокрутки
    const totalItems = items.length;
    const itemWidth = 110; // ширина элемента + отступы
    const duration = 4000; // общее время анимации в миллисекундах
    const keyframes = totalItems - 3; // сколько элементов "прокрутить"

    let startTime;
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const offset = progress * keyframes * itemWidth;

      carouselTrack.style.transform = `translateX(-${offset}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }