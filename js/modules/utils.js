// Utils Module - Image zoom, toggles, and helper functions

// Toggle image visibility in certificate/service boxes
function toggleImage(button) {
    const box = button.closest('.services-box');
    const imageContainer = box.querySelector('.image-container');
    
    const isActive = imageContainer.classList.toggle('active');
    button.innerText = isActive ? 'Read Less' : 'Read More';
}

// Zoom image on click
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

// Make functions available globally
window.toggleImage = toggleImage;
window.zoomImage = zoomImage;

export { toggleImage, zoomImage };
