// const { scraper } = require("../book-craper/pageScraper");

const scraperObject = {
    url: 'https://ats.krowdy.com/',
    async scraper(browser){
        let page = await browser.newPage();
        
        await page.goto(this.url);
        
        await iniciarSesion(page)
        
        await clickBtnCreateJob(page)
        
        await clickAgregarCompania(page)

        await selectDropdownCompany(page)
                
    }

}

const selectDropdownCompany = async (page) => {
    console.log("select dropdown");
    await page.type('#simple-popover > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div > div.MuiCardContent-root > form > div > div > div > input', 'scrapin', {delay: 200});

    let selected = await page.evaluate(()=>{
        const listSelect = document.querySelectorAll("body > div.MuiAutocomplete-popper > div > ul > li")
        return listSelect[listSelect.length-1]
    }, [])

    await page.evaluate((selected)=>{
        selected.click()
    }, selected)

}

const MaterialSelect = async (page, newSelectedValue, cssSelector) => {
    console.log("Seleccionando material");
    await page.waitForTimeout(3000)
    await page.evaluate((newSelectedValue, cssSelector) => {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent("mousedown", true, true);
        var selectNode = document.querySelector(cssSelector);
        selectNode.dispatchEvent(clickEvent);
        [...document.querySelectorAll('li')].filter(el => el.innerText == newSelectedValue)[0].click();
    }, newSelectedValue, cssSelector);
}

const clickAgregarCompania = async (page) => {
    console.log("Agregando compania...")
    await page.waitForTimeout(12000)
    await page.evaluate(()=> {
        document.querySelector("#job-company-container > div > a").click()
        return
    },[])
}

const clickBtnCreateJob = async (page) => {
    console.log("Clickeando boton create job");
    await page.waitForTimeout(8000)
    await page.evaluate((l) => {
        // let boton = document.querySelector('#root > div > div:nth-child(2) > div.jss48.jss46 > main > div > div.jss68 > div.jss67 > button');
        let btnCreateJob = document.querySelector('#root > div > div:nth-child(2) > div.jss67.jss65 > main > div > div.jss87 > div.jss86 > button');
        if(btnCreateJob){
            btnCreateJob.click();
        }else{
            return "btnCreateJob null";
        }
    }, [])

    console.log("btnCreateJob result: ")
}

const iniciarSesion = async (page) => {
        await page.waitForTimeout(2000)
        console.log("Iniciando sesion");
        await page.type('div.MuiBox-root.jss193 > div:nth-child(1) > div > input', "")
        await page.type('div.MuiBox-root.jss193 > div:nth-child(2) > div > #adornment-password', "")

        await page.click('#root > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-lg-4 > div > div.jss106 > div > div.MuiBox-root.jss193 > div.MuiBox-root.jss290.jss185 > button')
}


// (async () => {

    

//     

//     await page.click('div.jss67 > div.jss66 > button')

//     await page.click('#job-company-container > div > a');

//     await MaterialSelect(page, 'scraping', '#mui-autocomplete-14907')
    
    
    

    
// })();

module.exports= scraperObject;