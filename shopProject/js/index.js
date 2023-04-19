let addCartBtns = document.querySelectorAll(".add-cart");
let cartItems = document.querySelector(".cartItems");
let centerProducts = document.querySelector('.center-products');


document.addEventListener('DOMContentLoaded', () => {

	getItems();
	updateTotal();
	console.log('is loaded')

})

function getItems(){

	fetch('items.json')
	.then(response => response.json())
	.then(data => {
		let btns = [];
		data.forEach(item => {
				
			let product = document.createElement('div');
			product.classList.add("product")

			let price = parseInt(item.price)/100;
			product.dataset.id = item.id;
			let content = `
				<div class="img">
					<img class="image" src="${item.imgSrc}">
				</div>
				<div class="info-product">
					<span class="price">${price}</span>
					<span class="name">${item.name}</span>
					<button class="btn add-cart">Dodaj</button>
				</div>`;

			product.innerHTML = content;
			centerProducts.append(product);
			let btn = product.querySelector('.add-cart');
			btns.push(btn)
		})
		addToCart(btns);
	})
	.catch(function(error) {console.log(error)})
}


function addToCart(btns){
	btns.forEach(b => {
		b.addEventListener('click' ,(e) => {
			let currentProduct = e.target.parentElement.parentElement;
			let dataArray = [];
			let cartItems = document.querySelector('.cart-items');
			let cartProducts = document.querySelectorAll('.cart-item');
			let price = currentProduct.querySelector('.price').textContent;
			let name = currentProduct.querySelector('.name').textContent;
			let img = currentProduct.querySelector('.image').src;
			let data = currentProduct.dataset.id;

			dataArray.push(currentProduct.dataset.id);
			
			let content = `
                    <div class="img-cart">
                        <img src="${img}" alt="#">
                    </div>
                    <div class="info-cart">
                        <div class="cart-name">${name}</div>
                        <input type="number" name="quantity" class="quantity" value="1">
                        <span class="price-cart">${price}</span>
                        <button class="btn delete-product">usuń</button> 
                    </div>`;

			let product = document.createElement('div');
			product.classList.add('cart-item');
			product.dataset.id = data;
			product.innerHTML = content;
			

			cartProducts.forEach(item => {
				let itemData = item.dataset.id;
			
				if(itemData == data){
					console.log(itemData + " == " + data);
					alert("this product is already in cart");
					item.remove();
					return;
				}
			})

			cartItems.append(product)
			updateTotal();
		})
	})
}


function quantityChange(){
	let quantity = document.querySelectorAll('.quantity');

	quantity.forEach(item => {
		item.removeEventListener('change', updateTotal)
		item.addEventListener('change', updateTotal)

		if(item.value <= 0){
			item.value = 1;
		}
		
	})
}

function deleteProduct(){
	let deleteBtns = document.querySelectorAll('.delete-product');

	deleteBtns.forEach(btn => {
		btn.addEventListener('click' , (e) => {
			let currentProduct = e.target.parentElement.parentElement;

			currentProduct.remove();
			updateTotal();
		})
	})
	
}

function updateTotal(){
	let cartItem = document.querySelectorAll('.cart-item');
	let total = 0;
	let totalElement = document.querySelector('.total');
	let price,quantity;
	cartItem.forEach(item =>{
		let priceElement = item.querySelector('.price-cart').textContent;
		let quantityElement = item.querySelector('.quantity').value;
		price = parseFloat(priceElement);
		quantity = parseFloat(quantityElement);

		total += (price * quantity);
		console.log(total);
		
	})
	quantityChange();
	deleteProduct();
	totalElement.textContent = total.toFixed(2);
}
		

