const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];


function populate_products(product) {

    const product_name = document.querySelector("#product-name");
    if (!product_name) return;

    product.forEach(product => {
        let option = document.createElement("option")
        option.value = product.id;
        option.textContent = product.name;

        product_name.appendChild(option)
    })

}


function add_submission() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', () => {
        const KEY = 'reviewCount';
        const count = Number(localStorage.getItem(KEY)) || 0;
        const total = count + 1;
        localStorage.setItem(KEY, String(total));
    });
}

function load_submissions() {
    const count = localStorage.getItem('reviewCount') ?? '0';
    const el = document.querySelector('.num-of-submissions');
    if (el) el.textContent = count;
}




document.addEventListener('DOMContentLoaded', () => {
    populate_products(products);
    add_submission();
    load_submissions();
});


