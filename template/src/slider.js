'use strict';


class Slider {
	constructor(divElem) {
		this.sliderDiv = document.querySelector(divElem);
		this.nextBtn = document.getElementById('next');
		this.prevBtn = document.getElementById('prev');
		this.currentSlide = 0;
		this.currentPosition = 0;
		this.startingPosition = 0;
		this.sliderDiv.addEventListener('touchstart', (e) => { this.handleTouchStart(e); });
		this.sliderDiv.addEventListener('touchmove', (e) => { this.handleTouchMove(e); });
		this.sliderDiv.addEventListener('touchend', (e) => { this.handleTouchEnd(e); });

		this.sliderChildren = this.sliderDiv.children;


		this.innerDiv = document.createElement('div');
		this.innerDiv.classList.add('slider-inner');
		this.sliderChildrenLength = this.sliderChildren.length;

		this.sliderWidth = this.sliderDiv.offsetWidth;
		this.innerDiv.style.display = 'flex';

		this.countItemWidth(this.sliderChildren);
		this.removeChildrenToInnerDiv();
		this.newSliderChildren = this.innerDiv.children;
		window.addEventListener('resize', () => { this.checkSliderWidth(); });

		this.innerDiv.style.transition = 'transform .1s ease';

		this.prevItem = this.newSliderChildren[this.currentSlide];

		this.intervalTime = 10000;


		this.setSliderInterval();


		this.nextBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.clearSliderInterval();
			this.setSliderInterval();
			this.slideFadeNext();
		});
		this.prevBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.clearSliderInterval();
			this.setSliderInterval();
			this.slideFadePrev();
		});


		this.createDots();
		this.dotsUpdateActive();
	}

	setSliderInterval() {
		this.sliderInterval = setInterval(() => {
			this.intervalFunction();
		}, this.intervalTime);
	}
	clearSliderInterval() {
		clearInterval(this.sliderInterval);
	}

	intervalFunction() {
		if (this.currentSlide >= (this.newSliderChildren.length - 1)) {
			this.currentSlide = -1;
		}
		this.slideNext();
	}

	removeChildrenToInnerDiv() {
		for (let i = 0; i < this.sliderChildrenLength; i++) {
			this.innerDiv.appendChild(this.sliderChildren[0]);
		}
		this.sliderDiv.appendChild(this.innerDiv);
	}
	checkSliderWidth() {
		this.sliderWidth = this.sliderDiv.offsetWidth;
		this.countItemWidth(this.newSliderChildren);
		this.updateItemStyle();
	}

	countItemWidth(children) {
		this.innerDiv.style.width = `${children.length * this.sliderWidth}px`;
		for (let i = 0; i < children.length; i++) {
			children[i].style.width = `${this.sliderDiv.offsetWidth}px`;
		}
	}

	slideNext() {
		if (this.currentSlide < (this.newSliderChildren.length - 1)) {
			this.currentSlide++;
			this.updateItemStyle();
		}
	}

	slidePrev() {
		if (this.currentPosition < 0) {
			this.currentSlide--;
			this.updateItemStyle();
		}
	}

	slideFadeNext() {
		if (this.currentSlide < (this.newSliderChildren.length - 1)) {
			this.slideFade();
			this.currentSlide++;
			this.updateItemStyle();
		}
	}
	slideFadePrev() {
		if (this.currentPosition < 0) {
			this.slideFade('-');
			this.currentSlide--;
			this.updateItemStyle();
		}
	}
	updateItemStyle() {
		this.currentPosition = -(this.currentSlide * this.sliderWidth);
		this.innerDiv.style.transform = `translateX(${this.currentPosition}px)`;

		this.dotsUpdateActive();
	}
	slideFade(math = '') {
		this.clearPrevItemStyles();
		this.prevItem = this.newSliderChildren[this.currentSlide];
		this.innerDiv.style.transition = '0s';
		this.prevItem.addEventListener('animationend', () => {
			this.clearPrevItemStyles();
		});
		this.prevItem.style.left = `${math + this.sliderWidth}px`;
		this.prevItem.classList.add('animated');
		this.prevItem.classList.add('fadeOut');
	}

	clearPrevItemStyles() {
		this.prevItem.style.left = '';
		this.prevItem.classList.remove('animated');
		this.prevItem.classList.remove('fadeOut');
	}

	changeSlidePosition(changingWidth) {
		if (this.currentSlide < (this.newSliderChildren.length - 1)) {
			if (this.currentPosition < 1) {
				if (changingWidth > 0) {
					this.innerDiv.style.transform = `translateX(${this.currentPosition - changingWidth}px)`;
				}
			} else {
				this.innerDiv.style.transform = `translateX(${this.currentPosition - changingWidth}px)`;
			}
		}
	}

	handleTouchStart(event) {
		this.updateItemStyle();
		this.startingPosition = event.touches[0].clientX;
		this.innerDiv.style.transition = 'transform .1s ease';
	}
	handleTouchMove(event) {
		const touch = event.touches[0];
		const change = this.startingPosition - touch.clientX;
		if (Math.abs(change) < 1) { return; }

		this.changeSlidePosition(change);


		event.preventDefault();
	}
	handleTouchEnd(event) {
		const change = this.startingPosition - event.changedTouches[0].clientX;
		const threshold = this.sliderWidth / 3;
		if (Math.abs(change) > threshold) {
			(change > 0) ? this.slideNext() : this.slidePrev();
		} else {
			this.updateItemStyle();
		}
	}


	createDots() {
		const dotsHolder = document.createElement('div');
		dotsHolder.classList.add('dots');
		for (let i = 0; i < this.newSliderChildren.length; i++) {
			const dot = document.createElement('span');
			dot.classList.add('dot');
			dot.addEventListener('click', () => {
				this.innerDiv.style.transition = 'transform .1s ease';

				this.clearSliderInterval();
				this.setSliderInterval();
				this.setCurrentSlide(i);
				this.updateItemStyle();
			});
			dotsHolder.appendChild(dot);
			this.dotsItems = dotsHolder.children;
		}
		this.sliderDiv.appendChild(dotsHolder);
	}

	dotsUpdateActive() {
		for (let i = 0; i < this.dotsItems.length; i++) {
			this.dotsItems[i].classList.remove('active');
		}
		this.dotsItems[this.currentSlide].classList.add('active');
	}

	setCurrentSlide(value) {
		this.currentSlide = value;
	}
}

