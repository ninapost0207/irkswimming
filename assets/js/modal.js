function modal() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");


    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        setTimeout(() => closeModal(), '2000')

    };

    openModalBtn.addEventListener("click", openModal);

    const closeModal = () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
      });
    window.addEventListener('click', (e) => {
        if (e.target.className === 'overlay') {
            modal.classList.add("hidden");
            overlay.classList.add("hidden")
        }
    });  
};

export default modal;


