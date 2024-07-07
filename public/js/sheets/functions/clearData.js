export function deleteCardFile(element) {
    const cardContainer = element.closest('.cardFile-container');
    cardContainer.classList.add('animate-delete')
    setTimeout(() => {
        document.getElementById(`section_cardFiles1`).innerHTML = '' ;
        document.getElementById(`section_cardFiles2`).innerHTML = '' ;
        document.getElementById(`section_cardFiles3`).innerHTML = '' ;
        cardContainer.remove();
        document.getElementById(`section_cardFiles${sectionId}`).classList.add('hidden');

    }, "600");
}