// Navigation Module - Sidebar & Mobile Menu

// Mobile sidebar toggle
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.querySelector('.sidebar');

if (mobileToggle) {
    mobileToggle.onclick = () => {
        sidebar.classList.toggle('active');
        // Change icon when sidebar is open
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    };
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 991 && sidebar && mobileToggle) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    }
});

// Auto-close sidebar on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && sidebar) {
        sidebar.classList.remove('active');
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    }
});

// Smooth scroll to sections
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Close mobile sidebar and reset icon
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('active');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            }
            
            // Simple scroll to element
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active nav on scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Old menu icon code (kept for compatibility)
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

export { sidebar, mobileToggle };
