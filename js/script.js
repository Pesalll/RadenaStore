// Cart

const openBtn = document.getElementById('hop');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');

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
