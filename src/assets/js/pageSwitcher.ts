function pageSwitcher () {
    
    document.querySelectorAll(".transition").forEach((el) => {    
        el?.addEventListener('click', (event) => {            
            event.preventDefault(); 
            document.body.style.transition = '1000ms';
            document.body.style.opacity = "0";
            if (el instanceof HTMLAnchorElement) {
                setTimeout(() => {
                    const win: Window = window;
                    win.location = el?.href;                    
                }, 500);
                
           }
        });        
    });     
}

export default pageSwitcher;
