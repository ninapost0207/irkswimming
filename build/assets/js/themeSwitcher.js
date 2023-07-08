function themeSwitcher ({anchor}) {
    const _root = document.querySelector('#root');
    const _themeSwitcher = document.querySelector(anchor);   
   

    const enableDarkMode = () => {
        _root?.classList.add("dark");        
        localStorage.setItem("theme", "dark");        
    };
    
    const disableDarkMode = () => {
        _root?.classList.remove("dark");        
        localStorage.removeItem("theme");        
    };

    const changeTheme = () => {
        _themeSwitcher?.checked ? enableDarkMode() : disableDarkMode();        
    }

    
    const createSwitcher = () => {        
        _themeSwitcher.addEventListener('click', changeTheme)
        _themeSwitcher.checked = localStorage.getItem('theme') === 'dark' ? true : false
        changeTheme(_themeSwitcher)
        
    }
    
    const removeSwitcher = () => {
        _themeSwitcher.removeEventListener('click', changeTheme)
    }

    const getTheme = () => _themeSwitcher.checked ? 'dark' : '';
    
    const setTheme = (newTheme) => {
        if (newTheme === "dark") {
            _themeSwitcher.checked = true;
            changeTheme(_themeSwitcher);
        }
    }

    return {
        connect: createSwitcher,
        disconnect: removeSwitcher,
        getTheme: getTheme,
        setTheme: setTheme
    }

}

    

export default themeSwitcher;

//# sourceMappingURL=themeSwitcher.js.map
