const ITEMS = [
    {
        id: 1,
        name: "Keripik Tempe",
        price: 10000,
        image: '',
        qty: 1
    },
    {
        id: 2,
        name: "Keripik Tempe",
        price: 10000,
        image: '',
        qty: 1
    },
    {
        id: 3,
        name: "Keripik Tempe",
        price: 10000,
        image: '',
        qty: 1
    },
    {
        id: 4,
        name: "Keripik Tempe",
        price: 10000,
        image: '',
        qty: 1
    },
    {
        id: 5,
        name: "Keripik Tempe",
        price: 10000,
        image: '',
        qty: 1
    },
]

// Cart
const openBtn = document.getElementById('hop');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');
const itemsEl = document.querySelector('.katalog');

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

// Open Cart
function openCart() {
    cart.classList.add('open');
    backdrop.style.display = 'block'
    setTimeout(() => {
        backdrop.classList.add('show')
    }, 0)
}
// Close Cart
function closeCart() {
    cart.classList.remove('open');
    backdrop.classList.remove('show')

    setTimeout(() => {
        backdrop.style.display = 'none'
    }, 500)
}

// Render Items
function renderItems(){
    ITEMS.forEach((item) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('card')
        itemEl.innerHTML = `
        <img src="${item.image}" alt="Denim Jeans">
        <h1>Keripik Tempe</h1>
        <p class="price">$19.99</p>
        <p><button>Add to Cart</button></p>
        `
    })
}

// toggle class active

const navbarNav = document.querySelector('.nav-list');

document.querySelector('#burgir-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

const hamburg = document.querySelector('#burgir-menu');

document.addEventListener('click', function(e){
    if(!hamburg.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
})
