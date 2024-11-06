// script.js

const divSubida = document.querySelector('.div-subida');
let lastScrollY = window.scrollY; // Guarda la última posición de scroll
let isVisible = false; // Estado de visibilidad

// Escucha el evento de scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Controla la visibilidad del div basado en el scroll
    if (scrollY > 50 && !isVisible) { // Aparecer si se baja más de 50px
        divSubida.style.transform = 'translate(-50%, 0)'; // Muestra el div
        divSubida.style.opacity = '1'; // Aumenta la opacidad
        isVisible = true; // Cambia el estado a visible
    } else if (scrollY <= 50 && isVisible) { // Ocultar si está en la parte superior
        divSubida.style.transform = 'translate(-50%, 100%)'; // Esconde el div
        divSubida.style.opacity = '0'; // Reduce la opacidad
        isVisible = false; // Cambia el estado a no visible
    }

    // Oculta el div si se desplaza hacia arriba
    if (scrollY < lastScrollY && isVisible) {
        divSubida.style.transform = 'translate(-50%, 100%)'; // Esconde el div
        divSubida.style.opacity = '0'; // Reduce la opacidad
        isVisible = false; // Cambia el estado a no visible
    }

    lastScrollY = scrollY; // Actualiza la última posición de scroll
});
