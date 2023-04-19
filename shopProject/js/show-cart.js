let showCart = document.querySelector('.show-cart');
let hideCart = document.querySelector('.hide-cart');
let modal = document.querySelector('.modal');
let cart = document.querySelector('.shop-cart')

showCart.addEventListener('click', () => {
    cart.classList.add('active');
    modal.classList.add('active');
})  

hideCart.addEventListener('click', () => {
    cart.classList.remove('active');
    modal.classList.remove('active');
})  