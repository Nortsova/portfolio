'use strict';

class ShoppingStorage {
	constructor() {
		this.shopData = [];
		this.totalPrice = 0;
		this.totalItems = 0;
		this.getLocalStorageData();

		this.itemsList = document.querySelector('.bag-list');


		

		this.emptyBtn = document.getElementById('empty-bag');
		if (this.emptyBtn) {
			this.emptyBtn.addEventListener('click', (e) => {
				e.preventDefault();
				this.clearBag('Your shopping bag is empty. Use catalog to add new items');
			});
		}
		this.buyBtn = document.getElementById('buy');
		if (this.buyBtn) {
			this.buyBtn.addEventListener('click', (e) => {
				e.preventDefault();
				this.clearBag('Thank you for your purchase');
			});
		}

		if (location.pathname == '/shopping-bag.html') {
			this.updateTotalPriceBagPage();
			this.renderElementsByData();
		} else {
			this.updateTotalPriceAll();
		}

		this.addBtn = document.getElementById('add-btn');

		if (this.addBtn) {
			this.addBtn.addEventListener('click', (e) => {
				e.preventDefault();

				if ((this.getCheckedRadioBtn('color') !== null) && (this.getCheckedRadioBtn('size') !== null)) {
					const itemObject = {
						title: document.getElementById('item-title').textContent,
						price: document.getElementById('price').textContent.split(/£/).join(''),
						color: this.getCheckedRadioBtn('color'),
						size: this.getCheckedRadioBtn('size'),
						quantity: 1,
						img: `img/catalog/image0${Math.round((Math.random() * 9)) + 1}`,
						url: location.pathname,
						id: (this.shopData.length + 1) || 0
					};

					if (!this.checkIsItemInData(itemObject)) {
						this.addItem(itemObject);
					}

					this.updateTotalPriceAll();

					alert('Item added to your shopping bag');
				} else {
					alert('Please, choose size and color');
				}
			});
		}

		this.removeBtn = document.querySelectorAll('.remove-link');
		if(this.removeBtn) {
			this.createEventListenerForLinks();
		}
	}

	createEventListenerForLinks() {

		this.removeBtn = document.querySelectorAll('.remove-link');
		for (let i = 0; i < this.removeBtn.length; i++) {
			if (this.removeBtn[i]) {
				this.eventListenerRemoveLink(this.removeBtn[i]);
			}
		}
	}
	eventListenerRemoveLink(link) {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const clickedElement = e.path[2];
			const clickedId = clickedElement.getAttribute('data-id');
			this.shopData.some((item, index) => {
				if (item.id == clickedId) {
					if (item.quantity > 1) {
						item.quantity--;

						this.totalPrice = this.totalPrice - item.price;
						this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
						this.totalItems--;
						localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));
						localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
						localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
						clickedElement.innerHTML = this.createHTMLForRender(item); this.updateTotalPriceBagPage();
						this.createEventListenerForLinks();
					} else {
						const firstArray = this.shopData.slice(0, index);
						const secondArray = this.shopData.slice(index + 1, this.shopData.length);
						this.shopData = firstArray.concat(secondArray);
						clickedElement.parentNode.removeChild(clickedElement);
						localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));

						this.totalPrice = this.totalPrice - item.price;
						this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
						this.totalItems--;
						localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
						localStorage.setItem('totalItems', JSON.stringify(this.totalItems)); this.updateTotalPriceBagPage();
					}
				}
			});
		});
	}
	createHTMLForRender(item) {
		return `
		<a href="${item.url}" class="img-holder">
			<img src="${item.img}.jpg" alt="">
			<div class="overlay">
				<span>View item</span>
			</div>
		</a>
		<div class="bag-item__info">
			<div class="bag-item__heading">
				<h4>${item.title}</h4>
			</div>
			<div class="bag-item__price">£${item.price}</div>
			<ul class="characteristic-list">
					<li>Color: ${item.color}</li>
					<li>Size: ${item.size}</li>
					<li>Quantity: ${item.quantity}</li>
			</ul>
			<a href="#" class="remove-link">Remove item</a>
		</div>
		`;
	}
	renderElementsByData() {
		if (this.shopData.length < 1) {
			const div = document.createElement('div');
			div.style.padding = '30px';
			div.style.width = '100%';
			div.style.textAlign = 'center';
			div.textContent = 'Your shopping bag is empty. Use catalog to add new items';
			this.itemsList.textContent = '';
			this.itemsList.appendChild(div);
		}
		this.shopData.forEach((item) => {
			const divOutput = document.createElement('div');
			divOutput.classList.add('bag-item');
			divOutput.setAttribute('data-id', item.id);
			divOutput.innerHTML = this.createHTMLForRender(item);

			this.itemsList.appendChild(divOutput);
		});
	}

	getLocalStorageData() {
		if (localStorage.getItem('shoppingStorage') !== null) {
			this.shopData = JSON.parse(localStorage.getItem('shoppingStorage'));
		}
		if (localStorage.getItem('totalPrice') !== null) {
			this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
		}
		if (localStorage.getItem('totalItems') !== null) {
			this.totalItems = JSON.parse(localStorage.getItem('totalItems'));
		}
	}

	addItem(item) {
		this.shopData.push(item);
		this.totalItems++;
				this.totalPrice = +this.totalPrice + +item.price;
		this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
		localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
		localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
		localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));
	}


	getCheckedRadioBtn(groupName) {
		const radios = document.getElementsByName(groupName);
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				return radios[i].value;
			}
		}
		return null;
	}


	checkIsItemInData(item) {
		let res = false;
		this.shopData.forEach((shopItem) => {
			if ((shopItem.title == item.title)
				&& (shopItem.color == item.color)
				&& (shopItem.size == item.size)) {
				shopItem.quantity++;
				this.totalItems++;
				this.totalPrice = +this.totalPrice + +item.price;
				this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
				localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
				localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
				res = true;

				localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));
			}
		});

		return res;
	}

	updateTotalPriceAll() {
		const priceDiv = document.getElementById('totalPrice');
		priceDiv.textContent = `Bag £${this.totalPrice} (${this.totalItems})`;
	}

	updateTotalPriceBagPage() {
		this.updateTotalPriceAll();
		const finalPrice = document.getElementById('final-price');
		finalPrice.textContent = `${this.totalPrice}`;
	}


	clearBag(msg) {
		this.shopData = [];
		this.totalItems = 0;
		this.totalPrice = 0;

		const div = document.createElement('div');
		div.style.padding = '30px';
		div.style.width = '100%';
		div.style.textAlign = 'center';
		div.textContent = msg;
		this.itemsList.textContent = '';
		this.itemsList.appendChild(div);


		localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
		localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
		localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));

		this.updateTotalPriceBagPage();
	}
}

window.onload = function() {
	const shopping = new ShoppingStorage();
}
