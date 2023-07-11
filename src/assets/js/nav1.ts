
function nav1 ()  {
    const navToggle = document.querySelector('nav > .mobile > button') 
    const menu = document.querySelector('nav > .mobile > ul')
    const overlay = document.querySelector(".overlay");
    
    navToggle?.addEventListener('click', () => {
        navToggle?.classList.toggle('open')           
        menu?.classList.toggle('opened') 
        if(overlay?.classList.contains('hidden')) {
            overlay?.classList.remove("hidden")
        } else {
            setTimeout(() => overlay?.classList.add("hidden"), 400)
        }    
    });
    
    const expandableItems = document.querySelector('nav')?.querySelectorAll('.expandable')
    
    
    const toggleSelected = (e) => {
        expandableItems?.forEach(item => {
            if (e.currentTarget === item) {
                item?.classList.toggle('expanded')
            } else {
                item?.classList.remove('expanded')
            }
        })
    }

    expandableItems?.forEach(item => {
        item?.addEventListener('click', toggleSelected)
    })
    
}
export {nav1};
