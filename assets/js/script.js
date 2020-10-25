// Scroll header
let scrollHeader = (function () {

	let scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
	let scrolled;
	let scrollEl = document.querySelector("header");

	function headerScroll() {
		scrolled = scrollWindow;
		scrollWindow = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollWindow > scrollEl.offsetHeight) {
			scrollEl.classList.add("fixed");

			if (scrolled > scrollWindow) {
				scrollEl.classList.add("visible");
			} else {
				scrollEl.classList.remove("visible");
			}
		} else if (scrollWindow <= 0) {
			scrollEl.classList.remove("fixed");
			scrollEl.classList.remove("visible");
		}
	}

	window.addEventListener('scroll', function () {
		headerScroll();
	});

	return headerScroll();
}());

//dropdown 
function dropdown(parentEL, propertyChange = 'height', collapse = false) {
	let dropdownBtn = parentEL.querySelector('.dropdownBtn');
	let dropdownWrap = parentEL.querySelector('.dropdownEl');

	dropdownBtn.addEventListener("click", function () {
		this.classList.toggle("active");

		if (this.classList.contains('active')) {
			dropdownWrap.classList.add('active');
			dropdownWrap.style.cssText = `${propertyChange}: ${dropdownWrap.scrollHeight}px`;
		} else {
			dropdownWrap.style.cssText = `${propertyChange}: 0;`;
			dropdownWrap.classList.remove('active');
		}
	});
}

dropdown(document.querySelector('header'), 'height');

if (document.querySelector('.description-item')) {
	for (let elem of document.querySelectorAll('.description-item')) {
		dropdown(elem);
	}
}

//////
let hamburger = document.querySelector('.hamburger');
let dropdownMenu = document.querySelector('.header__row-wrap');

let bgMenu = document.querySelector('.bg-menu');

hamburger.addEventListener('click', function () {
	if (this.classList.contains('active')) {
		bgMenu.classList.add('active');
		document.body.classList.add('ovh');
	} else {
		bgMenu.classList.remove('active');
		document.body.classList.remove('ovh');
	}
}, false);

window.addEventListener('resize', function () {
	let windowWidth = document.documentElement.clientWidth;

	if (hamburger.classList.contains('active') && windowWidth > 1170) {
		hamburger.classList.remove('active');
		dropdownMenu.style.height = "0px";
		bgMenu.classList.remove('active');
		document.body.classList.remove('ovh');
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

//main slider 
if (document.querySelector('.main-slider')) {
	new Swiper('.main-slider', {
		loop: true,

		pagination: {
			el: '.main-slider .swiper-pagination',
		},
	});
}

if (document.querySelector('.product__slider')) {
	new Swiper('.product__slider', {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 74,
		breakpoints: {
			320: {
				loop: false,
				slidesPerView: 2,
				spaceBetween: 20
			},
			769: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			1171: {
				slidesPerView: 3,
				spaceBetween: 74
			}
		},
		navigation: {
			nextEl: '.product__slider-next',
			prevEl: '.product__slider-prev',
		},
	});
}

//popular slider
if (document.querySelector('.showcase.swiper-container')) {
	let showcaseSlider, isActive;

	sliderShowcaseToggle();

	function sliderShowcaseToggle() {

		if (document.documentElement.clientWidth < 768 && !isActive) {
			showcaseSlider = new Swiper('.showcase.swiper-container', {
				width: 225,
				slidesPerView: 1,
				spaceBetween: 20,
			});

			isActive = true;
		}

		if (document.documentElement.clientWidth > 768 && isActive) {
			showcaseSlider.destroy();
			showcaseSlider = null;
			isActive = false;
		}
	}

	window.addEventListener('resize', sliderShowcaseToggle, false);
}

