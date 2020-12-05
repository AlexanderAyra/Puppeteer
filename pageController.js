const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstace){
    let browser;
    try {
        browser = await browserInstace;
        await pageScraper.scraper(browser);
    } catch (error) {
        console.log('No se pudo resolver la instancia del navegador => ', error);
    }
}

module.exports = (browserInstace) => scrapeAll(browserInstace)