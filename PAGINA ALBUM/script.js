// Altura del menú más un margen extra para compensar la sombra
const menuHeight = document.querySelector('nav').offsetHeight + 20; // Ajusta el "+ 10" según la sombra de tu menú

// Activar el enlace "TODAS" por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const defaultLink = document.querySelector('a[href="#todas"]');

    // Eliminar la clase 'active' de todos los enlaces y agregarla solo al enlace "TODAS"
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.classList.remove('active');
    });

    if (defaultLink) {
        defaultLink.classList.add('active');
    }
});

// SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Remueve la clase 'active' de todos los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
        });

        // Agrega la clase 'active' al enlace clicado
        this.classList.add('active');

        // Obtén la posición del destino de anclaje menos la altura del menú y el margen adicional
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - menuHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        // Función de animación de desplazamiento
        function smoothScroll(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            const ease = progress / duration - Math.sin((2 * Math.PI * progress) / duration) / (2 * Math.PI);
            const yOffset = startPosition + distance * ease;

            window.scrollTo(0, yOffset);

            if (progress < duration) {
                window.requestAnimationFrame(smoothScroll);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }

        window.requestAnimationFrame(smoothScroll);
    });
});

// BTON VER MÁS...
function verMas(button) {
    const galeria = button.previousElementSibling; // Selecciona el div de galería antes del botón
    galeria.classList.toggle('expandido'); // Alterna la clase 'expandido'

    if (galeria.classList.contains('expandido')) {
        button.innerText = 'Ver menos...'; // Cambia el texto del botón cuando se expande
    } else {
        button.innerText = 'Ver más...'; // Cambia el texto del botón cuando se contrae
    }
}

// ANIMACION DE LINEAS
const lineas = document.querySelectorAll('.linea'); // Selecciona todas las líneas

const options = {
    root: null, // Usar el viewport
    rootMargin: '0px',
    threshold: 0.1 // Activar cuando el 10% de la línea esté en la vista
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const linea = entry.target; // Selecciona la línea que se está intersectando
        const index = Array.from(lineas).indexOf(linea); // Obtiene el índice de la línea

        // Si la línea está intersectando
        if (entry.isIntersecting) {
            // Aparece la línea con un pequeño retraso
            setTimeout(() => {
                linea.classList.add('visible'); // Agrega la clase visible
            }, index * 50); // Ajusta el retraso a 50 ms por cada línea
        } else {
            // Si la línea no está en la vista, quita la clase visible
            linea.classList.remove('visible');
        }
    });
}, options);

// Observa cada línea
lineas.forEach(linea => {
    observer.observe(linea);
});
