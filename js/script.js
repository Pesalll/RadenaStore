const ITEMS = [
    {
        id: 1,
        name: "Keripik Tempe",
        price: 15,
        image: 'img/Product/keripik tempe.jpg',
        qty: 1
    },
    {
        id: 2,
        name: "Kentang Stick",
        price: 11,
        image: 'img/Product/kentang.jpg',
        qty: 1
    },
    {
        id: 3,
        name: "Bagelen Keju",
        price: 22,
        image: 'img/Product/bagelen.jpg',
        qty: 1
    },
    {
        id: 4,
        name: "Kuping Gajah",
        price: 9,
        image: 'img/Product/20221227_084824.jpg',
        qty: 1
    },
    {
        id: 5,
        name: "Choco Crunch",
        price: 10,
        image: 'img/Product/20221227_085025.jpg',
        qty: 1
    },
    {
        id: 6,
        name: "Makaroni",
        price: 10,
        image: 'img/Product/makaroni.jpg',
        qty: 1
    },
    {
        id: 7,
        name: "Stik Keju",
        price: 13,
        image: 'img/Product/anuanTes.jpg',
        qty: 1
    },
    {
        id: 8,
        name: "Gabus Keju",
        price: 10,
        image: 'img/Product/anuankeju.jpg',
        qty: 1
    },
    {
        id: 9,
        name: "Ring Keju",
        price: 12,
        image: 'img/Product/ringkeju.jpg',
        qty: 1
    },
    {
        id: 10,
        name: "Kue Soes",
        price: 17,
        image: 'img/Product/kuesus.jpg',
        qty: 1
    },
    {
        id: 11,
        name: "Sale Pisang",
        price: 12,
        image: 'img/product/salepisang.jpg',
        qty: 1
    },
    {
        id: 12,
        name: "Ring Pedas",
        price: 10,
        image: 'img/product/ringpedas.jpg',
        qty: 1
    },
]

// Cart
const openBtn = document.getElementById('hop');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');
const itemsEl = document.querySelector('.katalog');
const cartItems = document.querySelector('.cart_items');
const itemsNum = document.getElementById('items_num');
const subtotalPrice = document.getElementById('subtotal_price');
const orderItems = document.querySelector('.order_items')
const checkoutBtn = document.querySelector('#checkout');

let cart_data = []

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

renderItems();
renderCartItems();



checkoutBtn.addEventListener('click', () => {
  // Buat array untuk menyimpan pesan checkout
  const texts = [];
  // Buat array untuk menyimpan alamat
  const addresses = [];

  // Loop melalui semua item di cart
  for (const item of cart_data) {
    // Tambahkan pesan checkout untuk setiap item ke array
    texts.push(`*${item.name} (${item.qty} pcs) - Rp. ${item.price * item.qty}.000`);
  }

  // Gabungkan pesan checkout ke dalam satu string
  const text = texts.join('\n');

  // Tambahkan alamat ke array
  addresses.push('Alamat pengiriman: [isi alamatmu disini]');

  // Gabungkan alamat ke dalam satu string
  const address = addresses.join('\n\n');

  // Tampilkan pesan konfirmasi
  var confirm = window.confirm("Apakah Anda yakin ingin checkout?");

  // Jika pengguna mengonfirmasi, buka WhatsApp
  if (confirm) {
    // Redirect pelanggan ke WhatsApp
    window.location.href = `https://wa.me/6287857176913?text=permisi,saya ingin memesan beberapa kue sebagai berikut : \n ${encodeURIComponent(`${text}\n\n${address}`)}`;
  }
});


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

// add items to cart
function addItem(idx, itemId){
    // find some items
    const foundedItem = cart_data.find(item => item.id.toString() === itemId.toString())
    if(foundedItem){
        increaseQty(itemId)
    }else{
        cart_data.push(ITEMS[idx])
    }
    updateCart()
    openCart()
}

//remove cart items
function removeCartItem(itemId){
    cart_data = cart_data.filter(item => item.id != itemId)

    updateCart()
}

//increase qty
function increaseQty(itemId){
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty + 1} : item)
    updateCart()
}

//decrease qty
function decreaseQty(itemId){
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty > 1 ? item.qty -1 : item.qty} : item)
    updateCart()
}

// calculate items num
function calcItemsNum(){
    let itemsCount = 0

    cart_data.forEach((item) => (itemsCount += item.qty))

    itemsNum.innerText = itemsCount
}

//calculate subtotal price
function calcSubtotalPrice(){
    let subtotal = 0 

    cart_data.forEach((item) => (subtotal += item.price * item.qty))

    subtotalPrice.innerText = subtotal
}

// Render Items
function renderItems(){
    ITEMS.forEach((item, idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('card')
        itemEl.onclick = () => addItem(idx, item.id)
        itemEl.innerHTML = `
        <img src="${item.image}" alt="">
        <h1>${item.name}</h1>
        <p class="price">${item.price}k</p>
        <p><button>Add to Cart</button></p>
        `
        itemsEl.appendChild(itemEl)
    })
}

//Display / Render Cart Item
function renderCartItems(){
    //remove evrythong from cart
    cartItems.innerHTML = ``
    //add new data
    cart_data.forEach((item) => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart_item')
        cartItem.innerHTML = `
        <div class="remove_item" onclick="removeCartItem(${item.id})">
            <span>&times;</span>
        </div>
        <div class="item_img">
            <img src="${item.image}" alt="">
        </div>
        <div class="item_details">
            <p>${item.name}</p>
            <strong>${item.price}k</strong>
            <div class="qty">
                <span onclick="decreaseQty(${item.id})">-</span>
                <strong>${item.qty}</strong>
                <span onclick="increaseQty(${item.id})">+</span>
            </div>
        </div>
        `
        cartItems.appendChild(cartItem)
    })
}

function updateCart(){
    //re render cart items with updated data
    renderCartItems()
    //update items number in cart
    calcItemsNum()
    //update subtotalZ
    calcSubtotalPrice()
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
