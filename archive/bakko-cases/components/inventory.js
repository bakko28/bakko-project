const inventory = JSON.parse(localStorage.getItem('inventoryBox'));

function loadInventory(array) {
    inventoryBox = document.querySelector('.inventory-box');

    array.sort((a, b) => b.price - a.price);
    array.forEach(items => {
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

        inventoryBox.appendChild(caseItemCard);
    });
}

loadInventory(inventory)