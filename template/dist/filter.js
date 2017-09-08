'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SingleString = function () {
	function SingleString() {
		var _this = this;

		_classCallCheck(this, SingleString);

		this.singleString = document.querySelector('.filter-link__inner');

		this.filterLists = document.querySelectorAll('.filter-item__list');

		this.tabletWidth = window.innerWidth < 1023;
		this.desktopWidth = window.innerWidth > 1023;

		this.filterBlock = document.querySelector('.filter-block');
		if (this.filterBlock) {
			this.filterBlock.addEventListener('click', function (e) {
				e.preventDefault();
				_this.selectActiveFilter(e);
				_this.updateMenu();
			});
		}

		this.updateMenu();
	}

	_createClass(SingleString, [{
		key: 'updateText',
		value: function updateText() {
			this.singleString.innerHTML = this.finalText;
		}
	}, {
		key: 'updateMenu',
		value: function updateMenu() {
			if (this.tabletWidth) {
				this.generateText();
			} else if (this.desktopWidth) {
				this.addItemToMenu();
			}
		}
	}, {
		key: 'selectActiveFilter',
		value: function selectActiveFilter(e) {
			if (e.target.nodeName == 'A') {
				var items = e.path[2].children;
				for (var i = 0; i < e.path[2].children.length; i++) {
					if (items[i].classList.contains('selected')) {
						items[i].classList.remove('selected');
					}
				}
				e.path[1].classList.add('selected');
			}
		}
	}, {
		key: 'generateText',
		value: function generateText() {
			var _this2 = this;

			this.finalText = '';
			this.filterLists.forEach(function (item, index) {
				var childrenList = item.children;
				for (var i = 0; i < childrenList.length; i++) {
					if (childrenList[i].classList.contains('selected')) {
						var coma = ', ';
						if (index === _this2.filterLists.length - 1) {
							coma = '';
						}
						if (childrenList[i].children[0].nodeName == 'A') {
							_this2.finalText = _this2.finalText + '<span>' + childrenList[i].children[0].innerText + '</span>' + coma;
						} else {
							var title = childrenList[i].parentElement.parentElement.children[0].children[0].innerText;
							_this2.finalText = _this2.finalText + title + coma;
						}
					}
				}
			});
			this.updateText();
		}
	}, {
		key: 'addItemToMenu',
		value: function addItemToMenu() {
			this.filterLists.forEach(function (item, index) {
				var childrenList = item.children;
				for (var i = 0; i < childrenList.length; i++) {
					if (childrenList[i].classList.contains('selected')) {
						if (childrenList[i].children[0].nodeName == 'A') {
							var headingDiv = childrenList[i].parentElement.parentElement.children[0];
							headingDiv.classList.add('selected');
							if (headingDiv.children.length > 1) {
								headingDiv.children[1].textContent = childrenList[i].children[0].innerText;
							} else {
								var p = document.createElement('p');
								p.textContent = childrenList[i].children[0].innerText;
								headingDiv.appendChild(p);
							}
						}
					}
				}
			});
		}
	}]);

	return SingleString;
}();

window.onload = function () {
	var string = new SingleString();
};