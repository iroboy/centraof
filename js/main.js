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


window.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    const sheets = document.styleSheets;

    for (let i = 0; i < sheets.length; i++) {
      let rules;
      try {
        rules = sheets[i].cssRules;
      } catch (e) {
        continue; // Не можем получить доступ к внешним CSS (CORS)
      }
      if (!rules) continue;

      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.selectorText && rule.selectorText.includes(':hover')) {
          const activeSelector = rule.selectorText.replace(/:hover/g, ':active');
          const cssText = rule.cssText.replace(rule.selectorText, activeSelector);

          const style = document.createElement('style');
          style.appendChild(document.createTextNode(cssText));
          document.head.appendChild(style);
        }
      }
    }
  }
});


// Надёжная делегация pointer-событий: добавляет .active при нажатии и убирает при отпускании.
// Вставлять в конец body или в файл, который загружается после DOM.
(function() {
  // Если нет поддержки pointer events, всё равно используем touch/mouse fallback
  const usePointer = window.PointerEvent !== undefined;

  // Селекторы и флаг — нужно ли ставить .active на сам элемент (false) или на родителя (useParent true)
  const config = [
    { sel: '.nav-link', useParent: false },
    { sel: '.nav-button', useParent: false },
    { sel: '.ship-card', useParent: true },              // .ship-card:hover .ship-card__button
    { sel: '.ship-card__button', useParent: false },
    { sel: '.custom-arrow', useParent: false },
    { sel: '.pontons-anchor-button', useParent: false },
    { sel: '.pontons-anchor-modal-close', useParent: true } // влияет на .line1/.line2 внутри
  ];

  // Быстрый набор селекторов для поиска
  const selectors = config.map(c => c.sel).join(',');

  // Хранение активных элементов и таймаутов
  const activeMap = new WeakMap();

  function findConfigForElement(el) {
    // Ищем первый конфиг, где el.closest(sel) существует
    for (let c of config) {
      const found = el.closest(c.sel);
      if (found) return { config: c, matched: found };
    }
    return null;
  }

  function addActive(node) {
    if (!node) return;
    if (activeMap.has(node)) {
      const t = activeMap.get(node);
      if (t.timeout) clearTimeout(t.timeout);
    } else {
      activeMap.set(node, {});
    }
    node.classList.add('active');
  }

  function removeActive(node, delay = 50) {
    if (!node) return;
    const record = activeMap.get(node) || {};
    if (record.timeout) clearTimeout(record.timeout);
    record.timeout = setTimeout(() => {
      node.classList.remove('active');
      activeMap.delete(node);
    }, delay);
    activeMap.set(node, record);
  }

  // Обработчики событий
  function onDown(e) {
    // Игнорируем не-touch/pen/mouse если хотим только для touch? Нет — поддерживаем pointer универсально.
    const target = e.target;
    const found = findConfigForElement(target);
    if (!found) return;

    const node = found.config.useParent ? found.matched : found.matched;
    // Добавляем класс
    addActive(node);
  }

  function onUp(e) {
    const target = e.target;
    const found = findConfigForElement(target);
    if (!found) {
      // возможно отпускание произошло в другом месте — снимем у всех активных (без агрессии)
      // но не будем массово обходить DOM — просто снимем у тех, что есть в activeMap (если есть).
      // Пройти все WeakMap нельзя — поэтому добавим небольшой общий timeout: при pointerup снимем у всех видимых .active
      document.querySelectorAll('.active').forEach(n => removeActive(n, 30));
      return;
    }
    const node = found.config.useParent ? found.matched : found.matched;
    removeActive(node, 80);
  }

  // pointer fallback handlers for old browsers
  function onTouchStart(e) { onDown(e); }
  function onTouchEnd(e) { onUp(e); }

  if (usePointer) {
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointercancel', onUp, { passive: true });
    // pointerleave for safety
    document.addEventListener('pointerleave', onUp, { passive: true });
  } else {
    // touch fallback
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // mouse for desktop testing
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  }

  // Доп: если элементы динамически появляются, делегация всё равно сработает.
})();













