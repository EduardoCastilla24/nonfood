export function deleteAllCardFileContainers() {
    // Seleccionar todos los elementos .cardFile-container
    const cardContainers = document.querySelectorAll('.cardFile-container');

    // Iterar sobre cada contenedor
    cardContainers.forEach((container, index) => {
        // Aplicar la clase para animación de eliminación
        container.classList.add('animate-delete');

        // Esperar a que termine la animación (600ms)
        setTimeout(() => {
            document.getElementById(`section_cardFiles1`).innerHTML = '' ;
            document.getElementById(`section_cardFiles2`).innerHTML = '' ;
            document.getElementById(`section_cardFiles3`).innerHTML = '' ;

            document.getElementById(`section_cardFiles1`).classList.add('hidden');
            document.getElementById(`section_cardFiles2`).classList.add('hidden');
            document.getElementById(`section_cardFiles3`).classList.add('hidden');

            container.remove(); // Eliminar el contenedor después de la animación
        }, '600'); // Añadir un retardo progresivo para una animación escalonada
    });
}