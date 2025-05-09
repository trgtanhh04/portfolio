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
    strings: ['Data Engineer', 'Data Scientist', 'Backend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


function toggleReadMore() {
    const extraText = document.getElementById("extra-text");
    const readMoreBtn = document.getElementById("read-more-btn");

    if (extraText.style.display === "none") {
        extraText.style.display = "inline";
        readMoreBtn.innerText = "Read Less";
    } else {
        extraText.style.display = "none";
        readMoreBtn.innerText = "Read More";
    }
}


function toggleTOEICImage() {
    var imageContainer = document.getElementById('toeic-image');
    var readMoreLink = document.querySelector('.services-box a');  // Lấy nút "Read More" hoặc "Read Less"
    
    // Kiểm tra nếu phần hình ảnh hiện tại đang ẩn hay hiển thị và thay đổi
    if (imageContainer.style.display === 'none' || imageContainer.style.display === '') {
        imageContainer.style.display = 'block';  // Hiển thị hình ảnh
        readMoreLink.innerText = 'Read Less';  // Đổi nội dung của nút
    } else {
        imageContainer.style.display = 'none';  // Ẩn hình ảnh
        readMoreLink.innerText = 'Read More';  // Đổi lại nội dung nút
    }
}

function zoomImage(img) {
    // Tạo một overlay để phóng to ảnh
    var overlay = document.createElement('div');
    overlay.classList.add('image-overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    
    var enlargedImage = document.createElement('img');
    enlargedImage.src = img.src;
    enlargedImage.style.maxWidth = '90%';
    enlargedImage.style.maxHeight = '90%';
    enlargedImage.style.cursor = 'zoom-out';
    
    // Xử lý sự kiện click để đóng overlay
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };
    
    overlay.appendChild(enlargedImage);
    document.body.appendChild(overlay);
}