// parallax
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = 40 + offset / 150 + "%";
})


// Card
const wrapper = document.querySelectorAll(".card");

wrapper.forEach(element => {
    let state = {
        mouseX: 0,
        mouseY: 0,
        height: element.clientHeight,
        width: element.clientWidth
    };

    element.addEventListener("mousemove", ele => {
        const card = element.querySelector(".card-inner");
        const cardBg = card.querySelector(".card-bg");
        state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
        state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

        // parallax angle in card
        const angleX = (state.mouseX / state.width) * 30;
        const angleY = (state.mouseY / state.height) * -30;
        card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

        // parallax position of background in card
        const posX = (state.mouseX / state.width) * -40;
        const posY = (state.mouseY / state.height) * -40;
        cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    });

    element.addEventListener("mouseout", () => {
        const card = element.querySelector(".card-inner");
        const cardBg = card.querySelector(".card-bg");
        card.style.transform = `rotateY(0deg) rotateX(0deg) `;
        cardBg.style.transform = `translateX(0px) translateY(0px)`;
    });
});


// hamburger
let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
});


// lazyload
window.addEventListener('load', function () {
    // setTimeout to simulate the delay from a real page load
    setTimeout(lazyLoad, 1000);

});

function lazyLoad() {
    var images = document.querySelectorAll('.lazy');

    // loop over each card image
    images.forEach(function (image) {
        var image_url = image.getAttribute('data-image-full');

        image.style.backgroundImage = 'url(' + image_url + '), ' + image.style.backgroundImage;
        image.className = image.className + ' is-loaded';
    });
}

// anchors
var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = .3; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение

        var w = window.pageYOffset, // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash // URL с хэшем
            }
        }
    }, false);
}

// input change
document.addEventListener("change", function (event) {
    let element = event.target;
    if (element && element.matches(".d-focus")) {
        element.classList[element.value ? "add" : "remove"]("-hasvalue");
    }
});
