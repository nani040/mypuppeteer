const puppeteer = require('puppeteer');

function getDetailsFromInstaPage(url, callback){
    (async () => {
        let browser = await puppeteer.launch({
            headless: true,
             args: ['--no-sandbox', '--disable-setuid-sandbox']
          });
        let page = await browser.newPage(); 
        await page.goto(url, {waitUntil: 'networkidle2'});
        let data = await page.evaluate(()=>{
            let instapage = document.querySelector('div[class="nZSzR"] > h2').innerHTML
            let someDetails = [... document.querySelectorAll('span[class="g47SY "]')]
            let [post , followers, following] = someDetails.map(h => h.innerHTML)
            return {instapage, post , followers, following}
        })        
        await browser.close();
        callback(data)
    })();
}

exports.getInstaInfo = function(req, res){
    if(req.query.instaurl){
        var url = req.query.instaurl
        getDetailsFromInstaPage(url, (data)=>{
            if(data){
                res.status(200).send(data)
            }
        })
    }else{
        res.status(400).send({error: "instaurl is missing"})
    }
};
