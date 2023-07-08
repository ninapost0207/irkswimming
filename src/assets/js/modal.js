function modal() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");


    const openModal = function () {
        modal.classList.add("opened");
        overlay.classList.add("opened");
        setTimeout(() => closeModal(), '2000')

    };

    openModalBtn.addEventListener("click", openModal);

    const closeModal = () => {
        modal.classList.remove("opened");
        overlay.classList.remove("opened");
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("opened")) {
            closeModal();
        }
      });
    window.addEventListener('click', (e) => {
        if (e.target.className === 'overlay') {
            modal.classList.remove("opened");
            overlay.classList.remove("opened")
        }
    });  
};

export default modal;


