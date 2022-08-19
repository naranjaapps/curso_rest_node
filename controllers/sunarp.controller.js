const {response, request} = require('express');
const puppeteer = require('puppeteer');
const {validationResult} = require('express-validator');
const JSSoup = require('jssoup').default;

const sunarpEventGet = async (req = request, res = response) => {

    const {placa} = req.body;

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: ['--start-fullscreen']
    // });

    let data = [];
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces');
    await page.screenshot({});

    const username = await page.$x("//input[@name='username']");
    await username[0].type("10631860");

    await page.waitForTimeout(1000);

    const password = await page.$x("//input[@name='password']");
    await password[0].type("w5745UMbTI");

    await page.screenshot({path:'home.png'});

    await page.evaluate("ingresarEventoClic();");

    await page.waitForNavigation({
        waitUntil: 'networkidle0',
    });

    await page.waitForTimeout(1000);

    await page.screenshot({path:'principal.png'});

    await page.waitForTimeout(1000);

    const main_frame = await page.$("frame[name='main_frame']")
    const main_frame_content = await main_frame.contentFrame()

    const main_frame1 = await main_frame_content.$("frame[name='main_frame1']")
    const main_frame1_content = await main_frame1.contentFrame()

    const selectElem = await main_frame1_content.$x("//select[contains(@name, 'frmPartidaDirecta')]");
    await selectElem[1].select("6");
    await page.screenshot({path:'principal2.png'});

    await page.waitForTimeout(1000);

    const plate = await main_frame1_content.$x("//input[contains(@name, 'idTxtPlacas')]");
    await plate[0].type(placa);

    await page.screenshot({path:'principal3.png'});

    const button = await main_frame1_content.$x("//button[contains(@name, 'btnBuscarVeh')]");
    await button[0].click();

    // await page.waitForNavigation({
    //     waitUntil: 'networkidle0',
    // });

    await page.waitForTimeout(1000);

    await page.screenshot({path:'principal4.png'});

    const newPagePromise = new Promise(x => page.once('popup', x));

    const buttons = await main_frame1_content.$x("//button[contains(@id, 'tblResultPartVeh')]");
    await buttons[1].click();
    const newPage = await newPagePromise;

    await newPage.screenshot({path:'data2.png'});
    const panel = await newPage.$x("//div[contains(@id, 'panelAientos')]");
    const tables = await panel[0].$$("table");
    const table_rows = await tables[1].$$("tr");

    for (const row of table_rows) {
        const table_cols = await row.$$("td");
        for (const table_col of table_cols) {
            const links = await table_col.$$("a");
            for (const link of links) {
                const id = await (await link.getProperty('id')).jsonValue()
                if (id.indexOf("btnCargar") >=0){
                    await link.click();
                    await newPage.waitForTimeout(1000);
                    await newPage.screenshot({path:`${id}.png`});

                    const form = await newPage.$("#form2");
                    const td_data = await form.$$("td");
                    const inscripcion = await (await td_data[1].getProperty('textContent')).jsonValue();
                    const presentacion = await (await td_data[3].getProperty('textContent')).jsonValue();
                    const rubro = await (await td_data[5].getProperty('textContent')).jsonValue();
                    const acto = await (await td_data[7].getProperty('textContent')).jsonValue();
                    const naturales = await (await td_data[9].getProperty('textContent')).jsonValue();
                    const juridicos = await (await td_data[11].getProperty('textContent')).jsonValue();

                    var evento = {
                        inscripcion: inscripcion,
                        presentacion: presentacion,
                        rubro: rubro,
                        acto: acto,
                        naturales: naturales,
                        juridicos: juridicos,
                    };

                    data.push(evento)

                    const close_button = await newPage.$x("//button[contains(@id, 'form2')]");
                    await close_button[0].click();

                }
            }
        }

    }

    //
    // const tables = panel2[0].$("table")
    // const table_rows = tables[1].$("tr")

    await browser.close();

    res.json({
        msg: 'GET api - Controlador',
        placa: placa,
        data : data
    });
}

module.exports = {
    sunarpEventGet
}