//dropdown 
let dropdownBtn = document.querySelector('.dropdownBtn');
let dropdownWrap = document.querySelector('.dropdownEl');
let dropdownList = dropdownWrap.children[0];

dropdownBtn.addEventListener("click", function () {
	this.classList.toggle("active");

	if (this.classList.contains('active')) {
		dropdownWrap.style.cssText = `min-height: ${dropdownList.offsetHeight}px`;
	} else {
		dropdownWrap.classList.remove('active');
		dropdownWrap.style.cssText = `min-height: 0;
		`;
	}
});

//////
let hamburger = document.querySelector('.hamburger');
let dropdownMenu = document.querySelector('.header__row-wrap');

let bgMenu = document.querySelector('.bg-menu');

hamburger.addEventListener('click', function () {
	if (this.classList.contains('active')) {
		bgMenu.classList.add('active');
	} else {
		bgMenu.classList.remove('active');
	}
}, false);

window.addEventListener('resize', function () {
	let windowWidth = document.documentElement.clientWidth;

	if (hamburger.classList.contains('active') && windowWidth > 1170) {
		hamburger.classList.remove('active');
		dropdownMenu.style.minHeight = "0px";
		bgMenu.classList.remove('active');
	}
}, false);

//Переключение языка сайта
let languagesBtns = document.querySelector('.header__languages-btns');

languagesBtns.addEventListener('click', function (e) {
	let target = e.target;

	if (target.closest('span') && target.classList.contains('active') || !target.closest('span')) return;

	languagesBtns.querySelector('span.active').classList.remove('active');
	target.classList.add('active');
}, false);
