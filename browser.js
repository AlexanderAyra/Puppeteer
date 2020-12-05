const puppeteer = require('puppeteer')

async function startBrowser(){
    let browser;
    try {
        console.log('Abriendo el navegador');
        browser = await puppeteer.launch({
            product: 'chrome',
            headless: false,
            args: ['--disable-setuid-sandbox'],
            'ignoreHTTPSErrors': true
        });
    } catch (erro) {
        console.log('No se ha abierto el navegador => ', error);
    }
    return browser;
}

module.exports = {
    startBrowser
}