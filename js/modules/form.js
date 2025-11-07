// Form Module - Contact form handling with EmailJS

window.onload = function () {
    // Initialize EmailJS
    if (window.ENV && window.ENV.EMAILJS_PUBLIC_KEY) {
        emailjs.init(window.ENV.EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = {
                full_name: document.getElementById("full-name").value,
                email: document.getElementById("email").value,
                reply_to: document.getElementById("email").value,
                mobile_number: document.getElementById("mobile-number").value,
                email_subject: document.getElementById("email-subject").value,
                message: document.getElementById("message").value,
            };

            // Send email to recipient (website owner)
            if (window.ENV && window.ENV.EMAILJS_SERVICE_ID && window.ENV.EMAILJS_TEMPLATE_ID_1) {
                emailjs.send(window.ENV.EMAILJS_SERVICE_ID, window.ENV.EMAILJS_TEMPLATE_ID_1, formData)
                    .then(() => alert("Gửi email đến bạn thành công!"))
                    .catch(error => {
                        alert("Lỗi gửi email cho bạn.");
                        console.error(error);
                    });
            }

            // Send auto-reply email to user
            if (window.ENV && window.ENV.EMAILJS_SERVICE_ID && window.ENV.EMAILJS_TEMPLATE_ID_2) {
                emailjs.send(window.ENV.EMAILJS_SERVICE_ID, window.ENV.EMAILJS_TEMPLATE_ID_2, formData)
                    .then(() => alert("Đã gửi phản hồi tới người dùng!"))
                    .catch(error => {
                        alert("Lỗi gửi phản hồi.");
                        console.error(error);
                    });
            }
        });
    }
};

export { };
