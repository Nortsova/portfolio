'use strict';

var searchBtn = document.getElementById('search-btn');

if (searchBtn) {
	searchBtn.addEventListener('click', function () {
		document.querySelector('.search-form').classList.toggle('active');
	});
}

var headerBtn = document.querySelector('.toggle-btn');

if (headerBtn) {
	headerBtn.addEventListener('click', function () {
		document.querySelector('.toggle-block').classList.toggle('active');
		headerBtn.classList.toggle('open');
	});
}

var filterBtn = document.querySelector('.filter-link');

if (filterBtn) {
	filterBtn.addEventListener('click', function () {
		document.querySelector('.filter-holder').classList.add('open');
	});
}

var filterCloseBtn = document.querySelector('.filter-holder .close-btn');

if (filterCloseBtn) {
	filterCloseBtn.addEventListener('click', function () {
		document.querySelector('.filter-holder').classList.remove('open');
	});
}