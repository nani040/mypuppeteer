module.exports = function(app){
    let insta = require('../controller/insta')
    
    app.get('/instaInfo', insta.getInstaInfo);
}