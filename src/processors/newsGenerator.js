const fse = require('fs-extra')


const newsGenerator = async ({header, text, url}) => {
    const injection = `{% set news={header: '${header}', url: '${url}', text: '${text}'} %}`
    const twigTemplateContent = await fse.readFile("./src/templates/layouts/_news-detailed.twig", "utf-8")
    const content = `${injection}

${twigTemplateContent}`
    return content
}


module.exports = newsGenerator

