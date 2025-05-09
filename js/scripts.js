let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// ----------------------------------

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    })

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);


    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}


// ----------------------------------
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form ', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ----------------------------------
const typed = new Typed('.multiple-text', {
    strings: ['Data Engineer', 'Data Scientist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


function toggleImage(button) {
    const box = button.closest('.services-box');
    const imageContainer = box.querySelector('.image-container');

    if (imageContainer.style.display === "none" || imageContainer.style.display === "") {
        imageContainer.style.display = "block";
        button.innerText = "Read Less";
    } else {
        imageContainer.style.display = "none";
        button.innerText = "Read More";
    }
}

// function zoomImage(img) {
//     // Tạo một overlay để phóng to ảnh
//     var overlay = document.createElement('div');
//     overlay.classList.add('image-overlay');
//     overlay.style.position = 'fixed';
//     overlay.style.top = '0';
//     overlay.style.left = '0';
//     overlay.style.width = '100vw';
//     overlay.style.height = '100vh';
//     overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//     overlay.style.display = 'flex';
//     overlay.style.justifyContent = 'center';
//     overlay.style.alignItems = 'center';
//     overlay.style.zIndex = '1000';

//     var enlargedImage = document.createElement('img');
//     enlargedImage.src = img.src;
//     enlargedImage.style.maxWidth = '90%';
//     enlargedImage.style.maxHeight = '90%';
//     enlargedImage.style.cursor = 'zoom-out';

//     overlay.onclick = function () {
//         document.body.removeChild(overlay);
//     };

//     overlay.appendChild(enlargedImage);
//     document.body.appendChild(overlay);
// }

function toggleImage(button) {
    const box = button.closest('.services-box');
    const imageContainer = box.querySelector('.image-container');

    const isVisible = imageContainer.style.display === "block";

    imageContainer.style.display = isVisible ? "none" : "block";
    button.innerText = isVisible ? "Read More" : "Read Less";
}

function zoomImage(img) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 1000;

    const zoomedImg = document.createElement('img');
    zoomedImg.src = img.src;
    zoomedImg.style.maxWidth = '90%';
    zoomedImg.style.maxHeight = '90%';
    zoomedImg.style.cursor = 'zoom-out';
    zoomedImg.style.borderRadius = '10px';
    zoomedImg.onclick = () => document.body.removeChild(overlay);

    overlay.appendChild(zoomedImg);
    overlay.onclick = () => document.body.removeChild(overlay);

    document.body.appendChild(overlay);
}
