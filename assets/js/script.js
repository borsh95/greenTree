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
function dropdown(parentEL, propertyChange = 'height', isCollapsing = false) {
	let dropdownBtn = parentEL.querySelector('.dropdownBtn');
	let dropdownItem = parentEL.querySelector('.dropdownEl');
	let dropdownWrapp = (isCollapsing) ? parentEL.closest('.dropdownWrapp') : null;

	dropdownBtn.addEventListener("click", function (e) {
		e.stopPropagation();

		this.classList.toggle("active");

		if (isCollapsing && dropdownWrapp.querySelector('.dropdownEl.active')) {
			dropdownWrapp.querySelector('.dropdownEl.active').previousElementSibling.classList.remove('active');
			parentEL.parentElement.querySelector('.dropdownEl.active').style.cssText = `${propertyChange}: 0;`;
			parentEL.parentElement.querySelector('.dropdownEl.active').classList.remove('active');
		}

		if (this.classList.contains('active')) {
			dropdownItem.classList.add('active');
			dropdownItem.style.cssText = `${propertyChange}: ${dropdownItem.scrollHeight}px`;
		} else {
			dropdownItem.style.cssText = `${propertyChange}: 0;`;
			dropdownItem.classList.remove('active');
		}
	});
}

dropdown(document.querySelector('header'), 'height');

if (document.querySelector('.description-item')) {
	for (let elem of document.querySelectorAll('.description-item')) {
		dropdown(elem, 'min-height', true);
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

if (document.querySelector('.b-select')) {
	for (let select of document.querySelectorAll('.b-select')) {
		bSelect(select);
	}
}

// Управление input через кнопки 
if (document.querySelector('.number-picker')) {
	for (elem of document.querySelectorAll('.number-picker')) {
		numberPicker(elem);
	}
};

// Изменение итоговой цены карточки в корзине
if (document.querySelector('.cart__item')) {
	for (elem of document.querySelectorAll('.cart__item')) {
		calculatingPrice(elem);
	}
};

//Подсчет цены товара
function calculatingPrice(cart) {
	let input = cart.querySelector('input'),
		priceProd = cart.querySelector('.cart__item-price span').textContent,
		totalPrice = cart.querySelector('.cart__item-total span'),
		btns = cart.querySelectorAll('.number-picker__btn');

	input.addEventListener('change', changeTotalPrice);

	for (btn of btns) {
		btn.addEventListener('click', changeTotalPrice);
	}

	function changeTotalPrice() {
		totalPrice.textContent = parseFloat(priceProd) * parseFloat(input.value);
	}
}

//Изменение значения input через кнопки
function numberPicker(elem) {
	let input = elem.querySelector('input[type="number"]'),
		btnUp = elem.querySelector('.number-picker__btn-up'),
		btnDown = elem.querySelector('.number-picker__btn-down'),
		min = input.getAttribute('min'),
		max = input.getAttribute('max');

	btnUp.addEventListener('click', function () {
		let oldValue = parseFloat(input.value);

		if (oldValue >= max) return;

		input.value = ++oldValue;

	});

	btnDown.addEventListener('click', function () {
		let oldValue = parseFloat(input.value);

		if (oldValue <= min) return;

		input.value = --oldValue;
	});

	input.addEventListener('change', function () {
		let value = parseFloat(this.value);

		if (isNaN(value)) min;

		value = Math.round(value);


		input.value = (value < min) ? min :
			(value > max) ? max :
				(value >= min && value <= max) ? value :
					min;
	});
};

//Стилизованный select
function bSelect(el) {
	let _this = el;
	let parent = _this.parentElement;
	let bSelectHeader = document.createElement('div');
	let bSelectValue;
	let bSelectList = document.createElement('ul');
	let bSelectItems;
	let isPlaceholder = false;

	//Добавляем классы
	parent.classList.add('b-select-container');
	bSelectHeader.classList.add('b-select__header');
	bSelectList.classList.add('b-select__list');

	//Добавляем элементы в шапку и выпадающий список
	bSelectHeader.insertAdjacentHTML('beforeend', '<span class="b-select__value"></span><svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.648214L0.666166 0L5.5 4.70357L10.3338 0L11 0.648214L5.5 6L0 0.648214Z" fill="#1B1B1E"/></svg>')
	bSelectValue = bSelectHeader.querySelector('.b-select__value');

	if (_this.getAttribute("b-select-name") != "false" && _this.getAttribute("b-select-name") != "undefined" && _this.getAttribute("b-select-name") !== undefined && _this.getAttribute("b-select-name") !== null) {
		bSelectValue.textContent = _this.getAttribute("b-select-name");
		bSelectValue.classList.add('select-name');
		_this.prepend(new Option(`${bSelectValue.textContent}`, "", false, true));
	}

	for (let i = 0; i < _this.options.length; i++) {
		let option = _this.options[i];

		let li = document.createElement('li');
		li.textContent = option.text;

		if (option.hasAttribute("selected")) {
			li.dataset.selected = 'selected';
			bSelectValue.textContent = option.text;
			_this.sectedIndex = i;
		}

		if (option.disabled) {
			li.dataset.disabled = 'disabled';
		}

		bSelectList.append(li)
	}

	if (bSelectValue.textContent === "") {
		let count = 0;

		while (_this.options[count].disabled) {
			count++;
		}

		bSelectList.children[count].dataset.selected = 'selected';
		bSelectValue.textContent = _this.options[count].text;
		_this.sectedIndex = count;
	}

	bSelectItems = bSelectList.children;

	bSelectHeader.addEventListener('click', function () {
		this.classList.toggle("active");
	});

	for (let i = 0; i < bSelectItems.length; i++) {
		bSelectItems[i].addEventListener('click', () => {
			_this.options[i].selected = true;
			bSelectValue.textContent = _this.options[i].text;

			if (bSelectHeader.classList.contains('active')) {
				bSelectHeader.classList.remove('active');
			}

		});
	}

	document.documentElement.addEventListener('click', function (e) {
		let targetClick = e.target.closest('.b-select__header');

		if (!Object.is(targetClick, bSelectHeader) && bSelectHeader.classList.contains("active")) {
			bSelectHeader.classList.remove('active');
		}
	})

	parent.append(bSelectHeader);
	parent.append(bSelectList)
}


