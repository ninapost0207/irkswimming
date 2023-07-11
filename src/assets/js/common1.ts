import {nav1} from "./nav1.js";
import themeSwitcher from "./themeSwitcher1.js";
import pageSwitcher from "./pageSwitcher1.js";
import submitForm from "./submitForm1.js";

nav1();
const switcher = themeSwitcher({anchor: '.theme-switcher__container input'});
pageSwitcher();
switcher.connect();
submitForm(); 
 