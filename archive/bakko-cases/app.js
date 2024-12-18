const cases = [
    {case_name: 'Оружейный кейс no.1', case_id: 'weapon-case-num1', price: 3499, count_item: 24, image: 'img/cases/middle-60b0b63893abc 1.png', },
    {case_name: 'Операция Хищные воды', case_id: 'operation-raptor-waters', price: 79, count_item: 41, image: 'img/cases/middle-60b0b63893abc 11.png'},
    {case_name: 'Грёзы и кошмары', case_id: 'dreams-and-nightmares', price: 119, count_item: 39, image: 'img/cases/middle-61f7cc05ddb0d.png'},
    {case_name: 'Recoil Case', case_id: 'recoil-case', price: 130, count_item: 31, image: 'img/cases/middle-62cdbc31a4448.png'},
    {case_name: 'Kilowatt Case', case_id: 'kilowatt-case', price: 115, count_item: 25, image: 'img/cases/middle-663a05b91a972.png',
        items: [
            {weapon: 'Zeus x27', name: 'Олимп', price: 613, image: 'img/items/zeus-olymp.png', quality: 'classified', color: '#C246D6', id: 'zeus-olymp'},
            {weapon: 'AWP', name: 'Хромовая пушка', price: 2188, image: 'img/items/awp-chrome-gun.png', quality: 'secret', color: '#991F20', id: 'awp-chrome-gun'},
            {weapon: 'MAC-10', name: 'Световой короб', price: 8, image: 'img/items/light-box.png', quality: 'army', color: '#4B69FF', id: 'light-box'},
            {weapon: 'SSG-08', name: 'Катастрофа', price: 7, image: 'img/items/disaster.png', quality: 'army', color: '#4B69FF', id: 'disaster'},
            {weapon: 'Glock-18', name: 'Блок-18', price: 92, image: 'img/items/block-18.png', quality: 'forbidden', color: '#8847FF', id: 'block-18'},
            {weapon: 'MP7', name: 'Улыбочка', price: 92, image: 'img/items/smile.png', quality: 'forbidden', color: '#8847FF', id: 'smile'},
            {weapon: 'Dual Berettas', name: 'Убежище', price: 7, image: 'img/items/sanctuary.png', quality: 'army', color: '#4B69FF', id: 'sanctuary'},
            {weapon: 'Sawed-Off', name: 'Аналоговый ввод', price: 83, image: 'img/items/analog-input.png', quality: 'forbidden', color: '#8847FF', id: 'analog-input'},
            {weapon: 'Nova', name: 'Печаль тьмы', price: 7, image: 'img/items/seal-of-darkness.png', quality: 'army', color: '#4B69FF', id: 'seal-of-darkness'},
            {weapon: 'M4A1-S', name: 'Черный лотос', price: 1060, image: 'img/items/black-lotus.png', quality: 'classified', color: '#C246D6', id: 'black-lotus'},
            {weapon: 'USP-S', name: 'Зубоскал', price: 699, image: 'img/items/tooter.png', quality: 'classified', color: '#C246D6', id: 'tooter'},
            {weapon: 'Tec-9', name: 'Шлак', price: 7, image: 'img/items/slag.png', quality: 'army', color: '#4B69FF', id: 'slag'},
            {weapon: 'UMP-45', name: 'Мотор', price: 7, image: 'img/items/motor.png', quality: 'army', color: '#4B69FF', id: 'motor'},
            {weapon: 'XM1014', name: 'Ирэдзуми', price: 6, image: 'img/items/irezumi.png', quality: 'army', color: '#4B69FF', id: 'irezumi'},
            {weapon: 'M4A4', name: 'Мастер травли', price: 85, image: 'img/items/a-master-bully.png', quality: 'forbidden', color: '#8847FF', id: 'a-master-bully'},
            {weapon: 'Five-SeveN', name: 'Гибрид', price: 81, image: 'img/items/hybrid.png', quality: 'forbidden', color: '#8847FF', id: 'hybrid'},
            {weapon: 'AK-47', name: 'Наследство', price: 7700, image: 'img/items/inheritance.png', quality: 'secret', color: '#991F20', id: 'inheritance'},
        ]
    },
    {case_name: 'Хромированный кейс no.3', case_id: 'chrome-case-num3', price: 50, count_item: 38, image: 'img/cases/middle-60b4f8e4dbc84.png'},
    {case_name: 'Кейс Спектр', case_id: 'spectrum-case', price: 85, count_item: 38, image: 'img/cases/middle-60b4fa7a260dc.png'},
    {case_name: 'Кейс Разлом', case_id: 'rift-case', price: 109, count_item: 30, image: 'img/cases/middle-60b4fbabcd626.png'},
    {case_name: 'Кейс ESPORTS 2013', case_id: 'case-esports-2013', price: 749, count_item: 23, image: 'img/cases/middle-60b4e9875d9ea.png'},
    {case_name: 'Кейс змеиный укус', case_id: 'snakebite-case', price: 159, count_item: 40, image: 'img/cases/middle-60b4fc07e1562.png'},
];

function openLinkCase(id) {
    console.log(id)

    const caseItem = cases.find(item => item.case_id === id);
    console.log(caseItem)
    
    if (caseItem) {
        localStorage.setItem('selectedCase', JSON.stringify(caseItem));
        console.log('Данные сохранены в localStorage');
    } else {
        console.log('Кейс не найден');
    }
    window.open('pages/case.html', '_self');
}

function generateCases(array) {
    const cardbox = document.querySelector('.cardbox');

    array.forEach(items => {
        const caseCard = document.createElement('div');
        caseCard.classList.add('card');
        caseCard.id = `${items.case_id}`;
        caseCard.innerHTML = `
            <img src="${items.image}" alt="">
            <div class="textbox">
                <p class="case-name">${items.case_name}</p>
                <p class="count">${items.count_item} items</p>
            </div>
            <button class="open-case-button" id="${items.case_id}"><img src="img/svg/Lock_Open.svg" alt="">open ${items.price} ₽</button>`;

        cardbox.appendChild(caseCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const openCaseButton = document.querySelectorAll('.open-case-button');
    
    if (openCaseButton.length === 0) {
        console.log("Кнопка открытия кейсов - не найдена на странице.")
    } else {
        openCaseButton.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Кнопка нажата: ' + button.id);
                openLinkCase(button.id);
            })
        })
    }
});

const navButtons = document.querySelectorAll('nav button')
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        openLink(button.id)
    })
})

function openLink(id) {
    console.log(id)
    window.location.href = `${id}.html`;
}

generateCases(cases);