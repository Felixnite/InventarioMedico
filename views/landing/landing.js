const closeButton = document.querySelector("#close-modal");
const openButton = document.querySelector("#open-modal");
const modalContainer = document.querySelector("#modal-component-container");
const modal = document.querySelector("#modal-container");

// Abrir modal function
function openModal() {
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex'); // Changed to flex for centering
    setTimeout(() => {
        modalContainer.classList.add('opacity-100');
        modal.classList.add('scale-100');
    }, 10);
}

// Cerrar modal function
function closeModal() {
    modalContainer.classList.remove('opacity-100');
    modal.classList.remove('scale-100');
    setTimeout(() => {
        modalContainer.classList.add('hidden');
        modalContainer.classList.remove('flex');
    }, 200);
}

// Event listeners
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// Close modal when clicking outside
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        closeModal();
    }
});