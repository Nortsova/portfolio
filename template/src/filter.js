'use strict';

class SingleString {
	constructor() {
		this.singleString = document.querySelector('.filter-link__inner');

		this.filterLists = document.querySelectorAll('.filter-item__list');

		this.tabletWidth = (window.innerWidth < 1023);
		this.desktopWidth = (window.innerWidth > 1023);

		this.filterBlock = document.querySelector('.filter-block');
		if (this.filterBlock) {
			this.filterBlock.addEventListener('click', (e) => {
				e.preventDefault();
				this.selectActiveFilter(e);
				this.updateMenu();
			});
		}

		this.updateMenu();
	}

	updateText() {
		this.singleString.innerHTML = this.finalText;
	}

	updateMenu() {
		if (this.tabletWidth) {
			this.generateText();
		} else if (this.desktopWidth) {
			this.addItemToMenu();
		}
	}

	selectActiveFilter(e) {
		if (e.target.nodeName == 'A') {
			const items = e.path[2].children;
			for (let i = 0; i < e.path[2].children.length; i++) {
				if (items[i].classList.contains('selected')) {
					items[i].classList.remove('selected');
				}
			}
			e.path[1].classList.add('selected');
		}
	}

	generateText() {
		this.finalText = '';
		this.filterLists.forEach((item, index) => {
			const childrenList = item.children;
			for (let i = 0; i < childrenList.length; i++) {
				if (childrenList[i].classList.contains('selected')) {
					let coma = ', ';
					if (index === (this.filterLists.length - 1)) {
						coma = '';
					}
					if (childrenList[i].children[0].nodeName == 'A') {
						this.finalText = `${this.finalText}<span>${childrenList[i].children[0].innerText}</span>${coma}`;
					} else {
						const title = childrenList[i].parentElement.parentElement.children[0].children[0].innerText;
						this.finalText = this.finalText + title + coma;
					}
				}
			}
		});
		this.updateText();
	}

	addItemToMenu() {
		this.filterLists.forEach((item, index) => {
			const childrenList = item.children;
			for (let i = 0; i < childrenList.length; i++) {
				if (childrenList[i].classList.contains('selected')) {
					if (childrenList[i].children[0].nodeName == 'A') {
						const headingDiv = childrenList[i].parentElement.parentElement.children[0];
						headingDiv.classList.add('selected');
						if (headingDiv.children.length > 1) {
							headingDiv.children[1].textContent = childrenList[i].children[0].innerText;
						} else {
							const p = document.createElement('p');
							p.textContent = childrenList[i].children[0].innerText;
							headingDiv.appendChild(p);
						}
					}
				}
			}
		});
	}
}

window.onload = function () {
	const string = new SingleString();
};

