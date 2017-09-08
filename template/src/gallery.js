'use strict';

class GallerySwitcher {
	constructor() {
		this.gallery = document.querySelector('.gallery');
		if (this.gallery) {
			this.images = this.gallery.children[0].children;
			this.linkList = this.gallery.children[1].children;
			if (this.linkList) {
				for (let i = 0; i < this.linkList.length; i++) {
					this.linkList[i].addEventListener('click', (e) => {
						e.preventDefault();
						for (let j = 0; j < this.linkList.length; j++) {
							this.linkList[j].classList.remove('active');
							this.images[j].classList.remove('active');
						}
						e.currentTarget.classList.add('active');
						this.images[i].classList.add('active');
					});
				}
			}
		}
	}
}

const itemSwitcher = new GallerySwitcher();

