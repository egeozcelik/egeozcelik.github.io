let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};

const sr = ScrollReveal ({
    distance: '60px',
    duration: 3500,
    reset: true
})

sr.reveal('.home-text', {delay:400, origin: 'left'})
sr.reveal('.home-img', {delay:400, origin: 'top'})
sr.reveal('.copyright', {delay:300, origin: 'bottom'})
sr.reveal('.about, .services, .cta, .resume, .contact, .resume', {delay:100, origin: 'top'})