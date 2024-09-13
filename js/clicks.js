AOS.init();



const openMobileMenu = document.querySelector('.nav-mobile-ico')
const navMobile = document.querySelector('.nav-mobile')
const owlCarousel = document.querySelector('.galery-imgs')
const aboutArrow = document.querySelector('.arrow-down-mobile')
const dropCont = document.querySelector('.nav-mobile-drop-list')
const aboutMobile = document.querySelector('.about-mobile')
const navMobileClose = document.querySelector('.nav-mobile-close')
const allCont = document.querySelector('.contacts-data')


openMobileMenu.addEventListener('click', function(){
    navMobile.classList.remove('none')
    allCont.classList.add('none')
});

navMobileClose.addEventListener('click', function(){
    navMobile.classList.add('none')
    allCont.classList.remove('none')
});



aboutArrow.addEventListener('click', function(){
    dropCont.classList.toggle('none')
    aboutArrow.classList.toggle('down-is-active')
});

aboutMobile.addEventListener('click', function(){
    dropCont.classList.toggle('none')
    aboutArrow.classList.toggle('down-is-active')
});