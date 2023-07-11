const fse = require('fs-extra')
const newsList = require('./src/data/news')
//const newsGenerator = require('./src/processors/newsGenerator')
var Twig = require('twig') // Twig module

const { src, dest, parallel, watch, series } = require('gulp'),
clean           = require('gulp-clean'),
twig            = require('gulp-twig'),
ttf2woff        = require('gulp-ttf2woff'),
ttf2woff2       = require('gulp-ttf2woff2'),
sourcemaps      = require('gulp-sourcemaps'),
autoprefixer    = require('gulp-autoprefixer'),
postcss         = require('gulp-postcss'),
sass            = require('gulp-sass')(require('sass')),
browsersync     = require('browser-sync').create(),
reload          = browsersync.reload,
ts              = require('gulp-typescript')



function clear() {
    return src('build', {read: false, allowEmpty: true})
        .pipe(clean({force: true}));
}


function compileTwig() { //compile twig files
    return src('src/templates/pages/**/*.twig')
        .pipe(twig())
        .pipe(dest('build/'))
        .pipe(browsersync.stream());
}


function fontsConverter() {
    src('src/assets/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('build/assets/fonts/'))
    
    return src('src/assets/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('build/assets/fonts/'))
}


function imgCopy() { //copy images to 'web/assets/img' folder
    return src('src/assets/images/**/*.*')
        .pipe(dest('build/assets/images/'))
        .pipe(browsersync.stream());
}



function scssToCss() { //formatting all scss files to single 'main.css' file inside 'temp' folder
    return src('src/assets/scss/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        /*.pipe(postcss([ // formatting css file for better reading comfort
            tailwindcss('./postcss.config.js')
        ]))*/
        //.pipe(concat({ path: 'main.css'})) //filename
        //.pipe(sourcemaps.write('.'))
        .pipe(dest('./build/assets/css/')) //file folder
}


function scssToCssBuild() { //formatting all scss files to single 'main.css' file inside 'temp' folder
    return src('src/assets/scss/**/*.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11', 'ie 9'], { cascade: true }))
        /*.pipe(postcss([ // formatting css file for better reading comfort
            tailwindcss('./postcss.config.js')
        ]))*/
        //.pipe(concat({ path: 'main.css'})) //filename
        .pipe(dest('build/assets/css/')) //file folder
}



function jsCopy() { //copy js to 'build/assets/js' folder
    return src(['src/assets/js/**/*.*', '!src/data/**/*.js', '!src/processors/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/assets/js/'))
        .pipe(browsersync.stream());
}


//var tsProject = ts.createProject("tsconfig.json");
var tsProject = ts.createProject("tsconfig.json", {
    typescript: require("typescript")
});


function tsCompiler () { // compile TS to JS
    return src('src/assets/js/**/*.ts')
        .pipe(tsProject())
        .js
        .pipe(dest('build/assets/js/'));
};





function createServer() {
    browsersync.init({
        server: {
            baseDir: "build/",
            index: "index.html",
            port: 3000,
            reloadDelay: 0,
            reloadOnRestart: true,
            notify: false
        }
    });

    watch("./src/templates/**/*.twig").on("change", series(compileTwig));
    watch("./src/assets/scss/**/*.scss").on("change", series(scssToCss));
    //watch("./src/assets/js/**/*.*").on('change', series(jsCopy));
    watch("./src/assets/images/**/*.*").on('all', series(imgCopy, reload));
    watch("./src/assets/fonts/**/*.ttf").on('all', series(fontsConverter));
    watch('src/assets/js/**/*.ts', tsCompiler);
};

//======================================================================================================
const pathToNews = './src/templates/pages/news/'
const pathToNewsPreviewer = './src/templates/pages'


const newsCreator = async ({allNews, cb}) => {
    /*await fse.emptyDir(pathToNews)
    for (const newsItem of allNews) {
        const { header, _id, text, url } = newsItem
        const content = await newsGenerator({ header, text, url})
        console.log(typeof content);
        await fse.writeFile(`${pathToNews}/${_id}.twig`, content, cb)
    }*/

    for (const newsItem of allNews) {
        Twig.renderFile('./src/templates/layouts/_news-detailed.twig', { newsItem }, async (err, html) => {
            await fse.writeFile(`${pathToNews}/${newsItem._id}.twig`, html, cb)
        }); 
    }
    
    Twig.renderFile('./src/templates/layouts/_news-previewer.twig', { news:allNews }, async (err, html) => {
        await fse.writeFile(`${pathToNewsPreviewer}/all-news.twig`, html, cb)
    });

}


function createNews(cb) { //creating all news preview page with all news from the file
    newsCreator({allNews: newsList, cb})
    return 
}





const server = series(clear, parallel(compileTwig, imgCopy, fontsConverter, scssToCss, tsCompiler), createNews, createServer);
exports.server = server;



