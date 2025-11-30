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


// Универсальная делегация: ставит .active на pointerdown и снимает немедленно на pointerup/click.
// Вставь НА МЕСТО старого IIFE.
(function() {
  const config = [
    { sel: '.nav-link', useParent: false },
    { sel: '.nav-button', useParent: false },
    { sel: '.ship-card', useParent: true },
    { sel: '.ship-card__button', useParent: false },
    { sel: '.custom-arrow', useParent: false },
    { sel: '.pontons-anchor-button', useParent: false },
    { sel: '.pontons-anchor-modal-close', useParent: true }
  ];

  // Найти ближайший конфиг для элемента (по closest)
  function findMatch(el) {
    for (let c of config) {
      const found = el.closest(c.sel);
      if (found) return { cfg: c, node: found };
    }
    return null;
  }

  // Добавить active (и запомнить, если нужно)
  function addActive(node) {
    if (!node) return;
    node.classList.add('active');
  }

  // Снять active немедленно
  function removeActiveImmediate(node) {
    if (!node) return;
    node.classList.remove('active');
  }

  // Снять active у всех на странице (удобно при закрытии модалки)
  function resetAllActive() {
    document.querySelectorAll('.active').forEach(n => n.classList.remove('active'));
  }

  // События down/up
  function onDown(e) {
    const match = findMatch(e.target);
    if (!match) return;
    // если useParent true — мы ставим active на matched node (родитель)
    const node = match.node;
    addActive(node);
  }

  function onUp(e) {
    // Пытаемся снять active у ближайшего совпадения.
    const match = findMatch(e.target);
    if (match) {
      removeActiveImmediate(match.node);
    } else {
      // Если отпускание произошло в другом месте — сбросим все видимые active
      // (безопасно и просто)
      resetAllActive();
    }
  }

  // Pointer API если поддерживается, иначе fallback на touch/mouse
  if (window.PointerEvent) {
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointercancel', onUp, { passive: true });
  } else {
    document.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('touchend', onUp, { passive: true });
    document.addEventListener('touchcancel', onUp, { passive: true });

    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
  }

  // Дополнительно: сразу снимаем active по клику для специфичных элементов,
  // чтобы ссылки и кнопки не оставались активными после navigation/action.
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('.nav-link');
    if (nav) {
      removeActiveImmediate(nav);
      return; // если это nav — дальше можно не проверять
    }
    const shipBtn = e.target.closest('.ship-card__button');
    if (shipBtn) {
      removeActiveImmediate(shipBtn);
      // если клик открывает модалку, модалка может закрывать активы сама
      return;
    }
  }, { passive: true });

  // Обработчики закрытия модалок — при закрытии сбрасываем все active.
  // Подключаем делегированно: если у тебя другие селекторы для закрытия — добавь их сюда.
  document.addEventListener('click', (e) => {
    if (e.target.closest('.ship-modal-close') || e.target.classList.contains('ship-modal-overlay')) {
      resetAllActive();
      return;
    }
    if (e.target.closest('.pontons-anchor-modal-close') || e.target.closest('.pontons-anchor-modal')) {
      resetAllActive();
      return;
    }
  }, { passive: true });

})();




















