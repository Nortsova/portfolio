'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingStorage = function () {
	function ShoppingStorage() {
		var _this = this;

		_classCallCheck(this, ShoppingStorage);

		this.shopData = [];
		this.totalPrice = 0;
		this.totalItems = 0;
		this.getLocalStorageData();

		this.itemsList = document.querySelector('.bag-list');

		this.emptyBtn = document.getElementById('empty-bag');
		if (this.emptyBtn) {
			this.emptyBtn.addEventListener('click', function (e) {
				e.preventDefault();
				_this.clearBag('Your shopping bag is empty. Use catalog to add new items');
			});
		}
		this.buyBtn = document.getElementById('buy');
		if (this.buyBtn) {
			this.buyBtn.addEventListener('click', function (e) {
				e.preventDefault();
				_this.clearBag('Thank you for your purchase');
			});
		}

		if (/shopping-bag.html/.test(location.pathname)) {
			this.updateTotalPriceBagPage();
			this.renderElementsByData();
		} else {
			this.updateTotalPriceAll();
		}

		this.addBtn = document.getElementById('add-btn');

		if (this.addBtn) {
			this.addBtn.addEventListener('click', function (e) {
				e.preventDefault();

				if (_this.getCheckedRadioBtn('color') !== null && _this.getCheckedRadioBtn('size') !== null) {
					var itemObject = {
						title: document.getElementById('item-title').textContent,
						price: document.getElementById('price').textContent.split(/£/).join(''),
						color: _this.getCheckedRadioBtn('color'),
						size: _this.getCheckedRadioBtn('size'),
						quantity: 1,
						img: 'img/catalog/image0' + (Math.round(Math.random() * 9) + 1),
						url: location.pathname,
						id: _this.shopData.length + 1 || 0
					};

					if (!_this.checkIsItemInData(itemObject)) {
						_this.addItem(itemObject);
					}

					_this.updateTotalPriceAll();

					alert('Item added to your shopping bag');
				} else {
					alert('Please, choose size and color');
				}
			});
		}

		this.removeBtn = document.querySelectorAll('.remove-link');
		if (this.removeBtn) {
			this.createEventListenerForLinks();
		}
	}

	_createClass(ShoppingStorage, [{
		key: 'createEventListenerForLinks',
		value: function createEventListenerForLinks() {

			this.removeBtn = document.querySelectorAll('.remove-link');
			for (var i = 0; i < this.removeBtn.length; i++) {
				if (this.removeBtn[i]) {
					this.eventListenerRemoveLink(this.removeBtn[i]);
				}
			}
		}
	}, {
		key: 'eventListenerRemoveLink',
		value: function eventListenerRemoveLink(link) {
			var _this2 = this;

			link.addEventListener('click', function (e) {
				e.preventDefault();
				var clickedElement = e.path[2];
				var clickedId = clickedElement.getAttribute('data-id');
				_this2.shopData.some(function (item, index) {
					if (item.id == clickedId) {
						if (item.quantity > 1) {
							item.quantity--;

							_this2.totalPrice = _this2.totalPrice - item.price;
							_this2.totalPrice = parseFloat(_this2.totalPrice).toFixed(2);
							_this2.totalItems--;
							localStorage.setItem('shoppingStorage', JSON.stringify(_this2.shopData));
							localStorage.setItem('totalPrice', JSON.stringify(_this2.totalPrice));
							localStorage.setItem('totalItems', JSON.stringify(_this2.totalItems));
							clickedElement.innerHTML = _this2.createHTMLForRender(item);_this2.updateTotalPriceBagPage();
							_this2.createEventListenerForLinks();
						} else {
							var firstArray = _this2.shopData.slice(0, index);
							var secondArray = _this2.shopData.slice(index + 1, _this2.shopData.length);
							_this2.shopData = firstArray.concat(secondArray);
							clickedElement.parentNode.removeChild(clickedElement);
							localStorage.setItem('shoppingStorage', JSON.stringify(_this2.shopData));

							_this2.totalPrice = _this2.totalPrice - item.price;
							_this2.totalPrice = parseFloat(_this2.totalPrice).toFixed(2);
							_this2.totalItems--;
							localStorage.setItem('totalPrice', JSON.stringify(_this2.totalPrice));
							localStorage.setItem('totalItems', JSON.stringify(_this2.totalItems));_this2.updateTotalPriceBagPage();
						}
					}
				});
			});
		}
	}, {
		key: 'createHTMLForRender',
		value: function createHTMLForRender(item) {
			return '\n\t\t<a href="' + item.url + '" class="img-holder">\n\t\t\t<img src="' + item.img + '.jpg" alt="">\n\t\t\t<div class="overlay">\n\t\t\t\t<span>View item</span>\n\t\t\t</div>\n\t\t</a>\n\t\t<div class="bag-item__info">\n\t\t\t<div class="bag-item__heading">\n\t\t\t\t<h4>' + item.title + '</h4>\n\t\t\t</div>\n\t\t\t<div class="bag-item__price">\xA3' + item.price + '</div>\n\t\t\t<ul class="characteristic-list">\n\t\t\t\t\t<li>Color: ' + item.color + '</li>\n\t\t\t\t\t<li>Size: ' + item.size + '</li>\n\t\t\t\t\t<li>Quantity: ' + item.quantity + '</li>\n\t\t\t</ul>\n\t\t\t<a href="#" class="remove-link">Remove item</a>\n\t\t</div>\n\t\t';
		}
	}, {
		key: 'renderElementsByData',
		value: function renderElementsByData() {
			var _this3 = this;

			if (this.shopData.length < 1) {
				var div = document.createElement('div');
				div.style.padding = '30px';
				div.style.width = '100%';
				div.style.textAlign = 'center';
				div.textContent = 'Your shopping bag is empty. Use catalog to add new items';
				this.itemsList.textContent = '';
				this.itemsList.appendChild(div);
			}
			this.shopData.forEach(function (item) {
				var divOutput = document.createElement('div');
				divOutput.classList.add('bag-item');
				divOutput.setAttribute('data-id', item.id);
				divOutput.innerHTML = _this3.createHTMLForRender(item);

				_this3.itemsList.appendChild(divOutput);
			});
		}
	}, {
		key: 'getLocalStorageData',
		value: function getLocalStorageData() {
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
	}, {
		key: 'addItem',
		value: function addItem(item) {
			this.shopData.push(item);
			this.totalItems++;
			this.totalPrice = +this.totalPrice + +item.price;
			this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
			localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
			localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
			localStorage.setItem('shoppingStorage', JSON.stringify(this.shopData));
		}
	}, {
		key: 'getCheckedRadioBtn',
		value: function getCheckedRadioBtn(groupName) {
			var radios = document.getElementsByName(groupName);
			for (var i = 0; i < radios.length; i++) {
				if (radios[i].checked) {
					return radios[i].value;
				}
			}
			return null;
		}
	}, {
		key: 'checkIsItemInData',
		value: function checkIsItemInData(item) {
			var _this4 = this;

			var res = false;
			this.shopData.forEach(function (shopItem) {
				if (shopItem.title == item.title && shopItem.color == item.color && shopItem.size == item.size) {
					shopItem.quantity++;
					_this4.totalItems++;
					_this4.totalPrice = +_this4.totalPrice + +item.price;
					_this4.totalPrice = parseFloat(_this4.totalPrice).toFixed(2);
					localStorage.setItem('totalItems', JSON.stringify(_this4.totalItems));
					localStorage.setItem('totalPrice', JSON.stringify(_this4.totalPrice));
					res = true;

					localStorage.setItem('shoppingStorage', JSON.stringify(_this4.shopData));
				}
			});

			return res;
		}
	}, {
		key: 'updateTotalPriceAll',
		value: function updateTotalPriceAll() {
			var priceDiv = document.getElementById('totalPrice');
			priceDiv.textContent = 'Bag \xA3' + this.totalPrice + ' (' + this.totalItems + ')';
		}
	}, {
		key: 'updateTotalPriceBagPage',
		value: function updateTotalPriceBagPage() {
			this.updateTotalPriceAll();
			var finalPrice = document.getElementById('final-price');
			finalPrice.textContent = '' + this.totalPrice;
		}
	}, {
		key: 'clearBag',
		value: function clearBag(msg) {
			this.shopData = [];
			this.totalItems = 0;
			this.totalPrice = 0;

			var div = document.createElement('div');
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
	}]);

	return ShoppingStorage;
}();

window.onload = function () {
	var shopping = new ShoppingStorage();
};