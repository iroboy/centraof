const cards = document.querySelectorAll(".card");
const arrow = document.querySelector(".arrow");
let index = 0;

const baseOffsets = [0, 2, 10, 10];

function updateCards() {
    cards.forEach((card, i) => {
    const order = (i - index + cards.length) % cards.length;
    const baseRotate = parseFloat(
        card.style.transform.match(/rotate\(([-\d.]+)deg\)/)[1]
    );
    const active = order === 0;

    const scale = active ? 1.05 : 1;
    const translateY = baseOffsets[order];
    const z = active ? 5 : 1 + (cards.length - order);
    const shadow = active ? "0 6px 10px rgba(0,0,0,0.25)" : "none";

    card.style.zIndex = z;
    card.style.boxShadow = shadow;
    card.style.transform = `rotate(${baseRotate}deg) scale(${scale}) translateY(${translateY}px)`;
    });
}

arrow.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateCards();
});

updateCards();



// Ship List

document.querySelectorAll(".ship-card").forEach(card => {
    const modal = card.querySelector(".ship-modal-overlay");
    const closeBtn = card.querySelector(".ship-modal-close");

    const imgSrc = card.querySelector(".ship-card__img").src;
    const title = card.querySelector(".ship-card__title").innerText;
    const price = card.querySelector(".ship-card__price p").innerText;

    // Заполняем модалку
    modal.querySelector(".ship-modal-photo").src = imgSrc;
    modal.querySelector(".ship-modal-title").innerText = title;
    modal.querySelector(".ship-modal-price").innerText = price;

    // Открытие модалки
    card.addEventListener("click", (e) => {
        // Если кликнули внутри самой модалки – игнорируем
        if (e.target.closest(".ship-modal-overlay")) return;

        modal.classList.add("show");
        document.body.style.overflow = "hidden";

        // обновляем owl после появления (иначе ломается)
        setTimeout(() => {
            $(modal).find(".ship-modal-photos").trigger("refresh.owl.carousel");
        }, 100);
    });

    // Закрытие модалки
    const closeModal = () => {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});



$(document).ready(function() {

    $(".carousel-wrapper").each(function() {
        const $wrapper = $(this);
        const $carousel = $wrapper.find(".owl-carousel");

        // Инициализация карусели
        $carousel.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            nav: false,    // стандартные стрелки отключены
            dots: true     // точки включены
        });

        // Кастомные стрелки
        const $arrowLeft = $('<div class="custom-arrow arrow-left"></div>');
        const $arrowRight = $('<div class="custom-arrow arrow-right"></div>');

        // Вставляем их в wrapper, но **не внутрь .owl-carousel**
        $wrapper.append($arrowLeft).append($arrowRight);

        // Навигация через кастомные стрелки
        $arrowLeft.on('click', function() {
            $carousel.trigger('prev.owl.carousel');
        });
        $arrowRight.on('click', function() {
            $carousel.trigger('next.owl.carousel');
        });
    });
});

$(document).ready(function() {
    const $carousel = $('.about-photos');

    $carousel.owlCarousel({
        items: 3,           // видимых слайдов на экране
        loop: true,
        margin: 10,         // отступ между слайдами
        nav: false,
        dots: true,
        responsive: {
          0: { items: 1 },
          767: { items: 2 },
          1067:{ items: 3 }
        }
    });

    $('.about-prev').on('click', function() { $carousel.trigger('prev.owl.carousel'); });
    $('.about-next').on('click', function() { $carousel.trigger('next.owl.carousel'); });
});

// $(document).ready(function() {
//     const $carousel = $('.pontons-anchor-carousel');

//     $carousel.owlCarousel({
//         items: 1,           // видимых слайдов на экране
//         loop: false,
//         margin: 10,         // отступ между слайдами
//         nav: false,
//         dots: true,
//     });

//     // $('.about-prev').on('click', function() { $carousel.trigger('prev.owl.carousel'); });
//     // $('.about-next').on('click', function() { $carousel.trigger('next.owl.carousel'); });
// });



document.addEventListener("DOMContentLoaded", () => {
    const openBtns = document.querySelectorAll(".pontons-anchor-button");
    const modal = document.querySelector(".pontons-anchor-modal");
    const closeBtns = document.querySelectorAll(".pontons-anchor-modal-close");

    // открыть модалку — на каждую кнопку
    openBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("open");
            document.body.classList.add("no-scroll");
        });
    });

    
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.remove("open");
            document.body.classList.remove("no-scroll");
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("open");
            document.body.classList.remove("no-scroll");
        };
    });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const header = document.querySelector('header'); // если есть фикс хедер
        const offset = header ? header.offsetHeight : 0;

        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - offset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


document.querySelectorAll('.contacts').forEach(btn => {
    const contactsOverlay = document.querySelector('.header-contacts-overlay');
    const contactsWindow = document.querySelector('.header-contacts-window');
    const contactsClose = contactsWindow.querySelector('.ship-modal-close');

    // Открытие
    btn.addEventListener('click', () => {
        contactsOverlay.classList.add('show');
        document.body.classList.add('no-scroll');
    });

    // Закрытие по кнопке
    contactsClose.addEventListener('click', (e) => {
        e.stopPropagation();
        contactsOverlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    // Закрытие по клику по фону
    contactsOverlay.addEventListener('click', (e) => {
        if (e.target === contactsOverlay) {
            contactsOverlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            contactsOverlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        };
    });
});

























