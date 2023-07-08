import nav from "./nav.js";
import themeSwitcher from "./themeSwitcher.js";
import pageSwitcher from "./pageSwitcher.js";
import submitForm from "./submitForm.js";

nav();
pageSwitcher();
const switcher = themeSwitcher({anchor: '.theme-switcher__container input'});
switcher.connect();
submitForm();

//# sourceMappingURL=common.js.map
