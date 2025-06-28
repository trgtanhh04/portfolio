
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
    strings: ['Data Engineer', 'AI Engineer', 'Backend Developer'],
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

// ----------------------------------

const text = "Truong Tien Anh";
let index = 0;
const typedText = document.querySelector(".typed-text");

function typeEffect() {
    if (index < text.length) {
        typedText.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    }
}
typeEffect();

// ----------------------------------
function typeEffect1(element, text, speed) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            }
        }
        type();
    }

// Lấy thẻ blockquote
const quoteElement = document.getElementById('quote');
const quoteText = quoteElement.textContent.trim(); // Lấy nội dung và loại bỏ khoảng trắng
quoteElement.textContent = ''; // Xóa nội dung ban đầu
typeEffect1(quoteElement, quoteText, 30); // 100ms mỗi chữ

// ----------------------------------
// send email
window.onload = function () {
    emailjs.init(window.ENV.EMAILJS_PUBLIC_KEY);

    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            full_name: document.getElementById("full-name").value,
            email: document.getElementById("email").value,
            reply_to: document.getElementById("email").value,
            mobile_number: document.getElementById("mobile-number").value,
            email_subject: document.getElementById("email-subject").value,
            message: document.getElementById("message").value,
        };

        // Gửi email đến người nhận (chủ trang)
        emailjs.send(window.ENV.EMAILJS_SERVICE_ID, window.ENV.EMAILJS_TEMPLATE_ID_1, formData)
            .then(() => alert("Gửi email đến bạn thành công!"))
            .catch(error => {
                alert("Lỗi gửi email cho bạn.");
                console.error(error);
            });

        // Gửi email phản hồi tự động đến người dùng
        emailjs.send(window.ENV.EMAILJS_SERVICE_ID, window.ENV.EMAILJS_TEMPLATE_ID_2, formData)
            .then(() => alert("Đã gửi phản hồi tới người dùng!"))
            .catch(error => {
                alert("Lỗi gửi phản hồi.");
                console.error(error);
            });
    });
};
