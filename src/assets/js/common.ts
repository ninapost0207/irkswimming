import {nav} from "./nav.js";
import themeSwitcher from "./themeSwitcher.js";
import pageSwitcher from "./pageSwitcher.js";
import submitForm from "./submitForm.js";

nav();
const switcher = themeSwitcher({anchor: '.theme-switcher__container input'});
pageSwitcher();
switcher.connect();
submitForm(); 
 