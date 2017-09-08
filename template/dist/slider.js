'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
	function Slider(divElem) {
		var _this = this;

		_classCallCheck(this, Slider);

		this.sliderDiv = document.querySelector(divElem);
		this.nextBtn = document.getElementById('next');
		this.prevBtn = document.getElementById('prev');
		this.currentSlide = 0;
		this.currentPosition = 0;
		this.startingPosition = 0;
		this.sliderDiv.addEventListener('touchstart', function (e) {
			_this.handleTouchStart(e);
		});
		this.sliderDiv.addEventListener('touchmove', function (e) {
			_this.handleTouchMove(e);
		});
		this.sliderDiv.addEventListener('touchend', function (e) {
			_this.handleTouchEnd(e);
		});

		this.sliderChildren = this.sliderDiv.children;

		this.innerDiv = document.createElement('div');
		this.innerDiv.classList.add('slider-inner');
		this.sliderChildrenLength = this.sliderChildren.length;

		this.sliderWidth = this.sliderDiv.offsetWidth;
		this.innerDiv.style.display = 'flex';

		this.countItemWidth(this.sliderChildren);
		this.removeChildrenToInnerDiv();
		this.newSliderChildren = this.innerDiv.children;
		window.addEventListener('resize', function () {
			_this.checkSliderWidth();
		});

		this.innerDiv.style.transition = 'transform .1s ease';

		this.prevItem = this.newSliderChildren[this.currentSlide];

		this.intervalTime = 10000;

		this.setSliderInterval();

		this.nextBtn.addEventListener('click', function (e) {
			e.preventDefault();
			_this.clearSliderInterval();
			_this.setSliderInterval();
			_this.slideFadeNext();
		});
		this.prevBtn.addEventListener('click', function (e) {
			e.preventDefault();
			_this.clearSliderInterval();
			_this.setSliderInterval();
			_this.slideFadePrev();
		});

		this.createDots();
		this.dotsUpdateActive();
	}

	_createClass(Slider, [{
		key: 'setSliderInterval',
		value: function setSliderInterval() {
			var _this2 = this;

			this.sliderInterval = setInterval(function () {
				_this2.intervalFunction();
			}, this.intervalTime);
		}
	}, {
		key: 'clearSliderInterval',
		value: function clearSliderInterval() {
			clearInterval(this.sliderInterval);
		}
	}, {
		key: 'intervalFunction',
		value: function intervalFunction() {
			if (this.currentSlide >= this.newSliderChildren.length - 1) {
				this.currentSlide = -1;
			}
			this.slideNext();
		}
	}, {
		key: 'removeChildrenToInnerDiv',
		value: function removeChildrenToInnerDiv() {
			for (var i = 0; i < this.sliderChildrenLength; i++) {
				this.innerDiv.appendChild(this.sliderChildren[0]);
			}
			this.sliderDiv.appendChild(this.innerDiv);
		}
	}, {
		key: 'checkSliderWidth',
		value: function checkSliderWidth() {
			this.sliderWidth = this.sliderDiv.offsetWidth;
			this.countItemWidth(this.newSliderChildren);
			this.updateItemStyle();
		}
	}, {
		key: 'countItemWidth',
		value: function countItemWidth(children) {
			this.innerDiv.style.width = children.length * this.sliderWidth + 'px';
			for (var i = 0; i < children.length; i++) {
				children[i].style.width = this.sliderDiv.offsetWidth + 'px';
			}
		}
	}, {
		key: 'slideNext',
		value: function slideNext() {
			if (this.currentSlide < this.newSliderChildren.length - 1) {
				this.currentSlide++;
				this.updateItemStyle();
			}
		}
	}, {
		key: 'slidePrev',
		value: function slidePrev() {
			if (this.currentPosition < 0) {
				this.currentSlide--;
				this.updateItemStyle();
			}
		}
	}, {
		key: 'slideFadeNext',
		value: function slideFadeNext() {
			if (this.currentSlide < this.newSliderChildren.length - 1) {
				this.slideFade();
				this.currentSlide++;
				this.updateItemStyle();
			}
		}
	}, {
		key: 'slideFadePrev',
		value: function slideFadePrev() {
			if (this.currentPosition < 0) {
				this.slideFade('-');
				this.currentSlide--;
				this.updateItemStyle();
			}
		}
	}, {
		key: 'updateItemStyle',
		value: function updateItemStyle() {
			this.currentPosition = -(this.currentSlide * this.sliderWidth);
			this.innerDiv.style.transform = 'translateX(' + this.currentPosition + 'px)';

			this.dotsUpdateActive();
		}
	}, {
		key: 'slideFade',
		value: function slideFade() {
			var _this3 = this;

			var math = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			this.clearPrevItemStyles();
			this.prevItem = this.newSliderChildren[this.currentSlide];
			this.innerDiv.style.transition = '0s';
			this.prevItem.addEventListener('animationend', function () {
				_this3.clearPrevItemStyles();
			});
			this.prevItem.style.left = math + this.sliderWidth + 'px';
			this.prevItem.classList.add('animated');
			this.prevItem.classList.add('fadeOut');
		}
	}, {
		key: 'clearPrevItemStyles',
		value: function clearPrevItemStyles() {
			this.prevItem.style.left = '';
			this.prevItem.classList.remove('animated');
			this.prevItem.classList.remove('fadeOut');
		}
	}, {
		key: 'changeSlidePosition',
		value: function changeSlidePosition(changingWidth) {
			if (this.currentSlide < this.newSliderChildren.length - 1) {
				if (this.currentPosition < 1) {
					if (changingWidth > 0) {
						this.innerDiv.style.transform = 'translateX(' + (this.currentPosition - changingWidth) + 'px)';
					}
				} else {
					this.innerDiv.style.transform = 'translateX(' + (this.currentPosition - changingWidth) + 'px)';
				}
			}
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			this.updateItemStyle();
			this.startingPosition = event.touches[0].clientX;
			this.innerDiv.style.transition = 'transform .1s ease';
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			var touch = event.touches[0];
			var change = this.startingPosition - touch.clientX;
			if (Math.abs(change) < 1) {
				return;
			}

			this.changeSlidePosition(change);

			event.preventDefault();
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			var change = this.startingPosition - event.changedTouches[0].clientX;
			var threshold = this.sliderWidth / 3;
			if (Math.abs(change) > threshold) {
				change > 0 ? this.slideNext() : this.slidePrev();
			} else {
				this.updateItemStyle();
			}
		}
	}, {
		key: 'createDots',
		value: function createDots() {
			var _this4 = this;

			var dotsHolder = document.createElement('div');
			dotsHolder.classList.add('dots');

			var _loop = function _loop(i) {
				var dot = document.createElement('span');
				dot.classList.add('dot');
				dot.addEventListener('click', function () {
					_this4.innerDiv.style.transition = 'transform .1s ease';

					_this4.clearSliderInterval();
					_this4.setSliderInterval();
					_this4.setCurrentSlide(i);
					_this4.updateItemStyle();
				});
				dotsHolder.appendChild(dot);
				_this4.dotsItems = dotsHolder.children;
			};

			for (var i = 0; i < this.newSliderChildren.length; i++) {
				_loop(i);
			}
			this.sliderDiv.appendChild(dotsHolder);
		}
	}, {
		key: 'dotsUpdateActive',
		value: function dotsUpdateActive() {
			for (var i = 0; i < this.dotsItems.length; i++) {
				this.dotsItems[i].classList.remove('active');
			}
			this.dotsItems[this.currentSlide].classList.add('active');
		}
	}, {
		key: 'setCurrentSlide',
		value: function setCurrentSlide(value) {
			this.currentSlide = value;
		}
	}]);

	return Slider;
}();