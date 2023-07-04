function pageSwitcher () {
    
    document.querySelectorAll(".transition").forEach((el) => {    
        el.addEventListener('click', (event) => {            
            event.preventDefault(); 
            document.body.style.transition = '1000ms';
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location = el.href;
            }, 500);
        });        
    });     
}

export default pageSwitcher;
