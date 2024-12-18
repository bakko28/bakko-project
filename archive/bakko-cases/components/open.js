console.log('onload')

const selectedCase = JSON.parse(localStorage.getItem('selectedCase'));

function loadCase(selectedCase) {
    const caseInfoBox = document.querySelector('.case-info');
    caseInfoBox.innerHTML = ''; // Очистка перед добавлением нового содержимого
    
    const caseInfoCard = document.createElement('div');
    caseInfoCard.classList.add('card-case');
    caseInfoCard.id = `${selectedCase.case_id}`;
    caseInfoCard.innerHTML = `
        <p class="case-name">${selectedCase.case_name}</p>
        <img src="../${selectedCase.image}" alt="" class="case-image">
        <button class="open-case-button-anim" id="${selectedCase.case_id}"><img src="../img/svg/Lock_Open.svg" alt="">open ${selectedCase.price} ₽</button>`;

    caseInfoBox.appendChild(caseInfoCard);

    loadItems(selectedCase.items);

    const openCaseButton = document.querySelector('.open-case-button-anim');
    if (openCaseButton) {
        openCaseButton.addEventListener('click', () => {
            openCase(selectedCase.items);
        });
    } else {
        console.log('Элемент openCaseButton - не найден');
    }
}

function loadItems(selectedCase) {
    caseItemsBox = document.querySelector('.case-inventory');
    console.log(selectedCase)

    selectedCase.sort((a, b) => b.price - a.price);
    selectedCase.forEach(items => {
        const caseItemCard = document.createElement('div');
        caseItemCard.classList.add('card');
        caseItemCard.id = `${items.id}`;
        caseItemCard.innerHTML = `
            <div class="radial" style="background-color: ${items.color};"></div>
            <img src="../${items.image}" alt="">
            <p class="price-weapon">${items.price} ₽</p>
            <div class="textbox">
                <p class="weapon">${items.weapon}</p>
                <p class="item-name">${items.name}</p>
            </div>
            <div class="line" style="background-color: ${items.color};"></div>
        `;

        caseItemsBox.appendChild(caseItemCard);
    });
}

function openCase(caseItems) {
    const cardCase = document.querySelector('.card-case');
    if (!cardCase) {
        console.error("Элемент '.card-case' не найден");
        return;
    }
    cardCase.style.display = "none";

    const caseInfoBox = document.querySelector('.case-info');
    const openCaseAnimation = document.createElement('div');
    openCaseAnimation.classList.add('open-case-box');

    const winnerElement = document.createElement('div');
    winnerElement.classList.add('winner-item');

    caseInfoBox.appendChild(winnerElement)
    caseInfoBox.appendChild(openCaseAnimation);
    loadAnimation(caseItems);
}

function loadAnimation(array) {
    let num = Math.floor(generateRandomNum(80, 100));
    console.log("Количество повторений:", num);

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(generateRandomNum(1, array.length)) - 1;
        const randomImage = array[randomIndex];
        const caseInfoBox = document.querySelector('.case-info .open-case-box');
        const imgElement = document.createElement('img');
        imgElement.src = `../${randomImage.image}`;
        imgElement.id = randomImage.id

        let animationStep = (num - 11) * 150;
        updateAnimationValue(animationStep - 89);
        console.log(-animationStep)
        caseInfoBox.appendChild(imgElement);
    }

    const caseInfoBox = document.querySelector('.case-info .open-case-box');
    const images = caseInfoBox.querySelectorAll('img'); // Получаем все добавленные <img>

    if (images.length >= 10) {
        const tenFromEnd = images[images.length - 10];
        console.log(tenFromEnd)
        localStorage.setItem('findElId', tenFromEnd.id)
        tenFromEnd.classList.add('winner')
        console.log("10-й элемент с конца:", {
            src: tenFromEnd.src,
            id: tenFromEnd.id,
        });
    } else {
        console.log("Недостаточно изображений для получения 7-го с конца.");
    }

    setTimeout(() => {
        let findElId = localStorage.getItem('findElId')
        console.log(array)
        const findEl = array.find(item => item.id === findElId)
        localStorage.setItem('winnerElement', JSON.stringify(findEl))
        console.log(findEl)
        document.querySelector('.open-case-box').style.display = 'none';
        const caseInfo = document.querySelector('.case-info');
        const winnerCard = document.createElement('div');
        winnerCard.classList.add('winner-card')
        winnerCard.innerHTML = `
            <div class="radial" style="background-color: ${findEl.color};"></div>
            <img src="../${findEl.image}" alt="">
            <p class="price-weapon">${findEl.price} ₽</p>
            <div class="textbox">
                <p class="weapon">${findEl.weapon}</p>
                <p class="item-name">${findEl.name}</p>
            </div>
            <div class="line" style="background-color: ${findEl.color};"></div>
            <div class="button-box">
                <button class="sell-button">Продать</button>
                <button class="refresh-button">Ещё раз</button>
            </div>
        `

        caseInfo.appendChild(winnerCard);

        
        const refreshButton = document.querySelector('.refresh-button');

        if (!refreshButton) {
            console.log('Элемент не найден на странице - refresh-button')
        } else {
            refreshButton.addEventListener('click', () => {
                addInventory(JSON.parse(localStorage.getItem('winnerElement')));
                document.querySelector('.winner-card').style.display = 'none';
                document.querySelector('.winner-item').style.display = "none";
                loadCase(selectedCase);
            })
        }
    }, 11000);
}

const inventory = [];

function addInventory(item) {
    inventory.push(item);
    localStorage.setItem('inventoryBox', JSON.stringify(inventory)); // Правильное сохранение в localStorage
}

function updateAnimationValue(value) {
    const styleSheet = document.styleSheets[0];
    const animationName = 'roll';

    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === animationName) {
            styleSheet.deleteRule(i);
            break;
        }
    }

    const keyframes = `
        @keyframes ${animationName} {
            0% {
                left: 0px;
            }
            100% {
                left: -${value}px;
            }
        }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

function generateRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function refreshOpenCase() {
    console.log('refresh - start')
}

loadCase(selectedCase)