'use strict';


const searchBtn = document.getElementById('search-btn');

if (searchBtn) {
	searchBtn.addEventListener('click', () => {
		document.querySelector('.search-form').classList.toggle('active');
	});
}

const headerBtn = document.querySelector('.toggle-btn');

if (headerBtn) {
	headerBtn.addEventListener('click', () => {
		document.querySelector('.toggle-block').classList.toggle('active');
		headerBtn.classList.toggle('open');
	});
}

const filterBtn = document.querySelector('.filter-link');

if (filterBtn) {
	filterBtn.addEventListener('click', () => {
		document.querySelector('.filter-holder').classList.add('open');
	});
}

const filterCloseBtn = document.querySelector('.filter-holder .close-btn');

if (filterCloseBtn) {
	filterCloseBtn.addEventListener('click', () => {
		document.querySelector('.filter-holder').classList.remove('open');
	});
}

