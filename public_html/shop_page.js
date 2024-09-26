const itemCards = document.querySelectorAll('.item-card');
let a;

function getInfo(info){
    return info;
}

itemCards.forEach(card => {
    const filters = card.getAttribute('data-filter').split(',').map(filter => filter.trim());
    const id = card.id;

    if (filters[0] == "out-of-stock") {
        card.style.opacity = 0.5;
        card.children[0].classList.toggle("inner-card", false);
    } else {
        card.addEventListener('click', function () {
            const info = getInfo(plantInfo);
            const name = info[id].name;
            const img = info[id].img;
            const price = info[id].price;
            const description = info[id].description;
    
            document.getElementById('offcanvasProductName').textContent = name;
            document.getElementById('offcanvasProductImg').src = img;
            document.getElementById('offcanvasProductDescription').textContent = description;
            document.getElementById('offcanvasProductPrice').textContent = price;
    
            const offcanvasElement = document.getElementById('productDetailsOffcanvas');
            const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
            bsOffcanvas.show();
    
            document.getElementById('addToCartOffcanvas').onclick = function () {
                alert(name + " added to cart!");
                addToCart(name, parseFloat(price));
            };
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const filterCheckboxes = document.querySelectorAll('input[id^="filter"]');
    const searchInput = document.querySelector('input[type="search"]');

    function filterItems() {
        const searchText = searchInput.value.toLowerCase();

        const selectedFilter = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        itemCards.forEach(card => {
            const plantTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const filters = card.getAttribute('data-filter').split(',').map(filter => filter.trim());

            const matchesSearch = plantTitle.includes(searchText);
            const matchesFilter = selectedFilter.every(filter => filters.includes(filter));

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterItems);

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterItems);
    });
});