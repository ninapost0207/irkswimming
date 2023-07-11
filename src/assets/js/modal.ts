function modal(arg) {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    

    const openModal = function () {
        modal?.classList.add("opened");
        overlay?.classList.add("opened");
        setTimeout(() => closeModal(), 2000)

    };
    if(arg == true) {
        openModal();
        arg = false;
    }
    

    const closeModal = () => {
        modal?.classList.remove("opened");
        overlay?.classList.remove("opened");
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal?.classList.contains("opened")) {
            closeModal();
        }
      });
    window.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {            
            if (e.target.className === 'overlay') {
                modal?.classList.remove("opened");
                overlay?.classList.remove("opened")
            }
          }
    });  
};

export default modal;


