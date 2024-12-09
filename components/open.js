console.log('onload')

const selectedCase = JSON.parse(localStorage.getItem('selectedCase'));

function loadCase(selectedCase) {
    const caseInfoBox = document.querySelector('.case-info');
    const caseInfoCard = document.createElement('div');
        caseInfoCard.classList.add('card-case');
        caseInfoCard.id = `${selectedCase.case_id}`;
        caseInfoCard.innerHTML = `
            <p class="case-name">${selectedCase.case_name}</p>
            <img src="../${selectedCase.image}" alt="" class="case-image">
            <button class="open-case-button" id="${selectedCase.case_id}"><img src="../img/svg/Lock_Open.svg" alt="">open ${selectedCase.price} ₽</button>`

        caseInfoBox.appendChild(caseInfoCard);

    loadItems(selectedCase.items)
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

loadCase(selectedCase)