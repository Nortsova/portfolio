'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GallerySwitcher = function GallerySwitcher() {
	var _this = this;

	_classCallCheck(this, GallerySwitcher);

	this.gallery = document.querySelector('.gallery');
	if (this.gallery) {
		this.images = this.gallery.children[0].children;
		this.linkList = this.gallery.children[1].children;
		if (this.linkList) {
			var _loop = function _loop(i) {
				_this.linkList[i].addEventListener('click', function (e) {
					e.preventDefault();
					for (var j = 0; j < _this.linkList.length; j++) {
						_this.linkList[j].classList.remove('active');
						_this.images[j].classList.remove('active');
					}
					e.currentTarget.classList.add('active');
					_this.images[i].classList.add('active');
				});
			};

			for (var i = 0; i < this.linkList.length; i++) {
				_loop(i);
			}
		}
	}
};

var itemSwitcher = new GallerySwitcher();