
const  express = require('express');
 var  app = express();
const  hbs = require('hbs');
const  fs = require('fs');

 app.set('view engine', 'hbs');


 // app.get('/', (req,res)=> {
 //    res.send('<h1>Hello world</h1>');
 // });


//using middelware to log data and time stamp
//to register a middleware  we use app.use
//always use next else other api request will not get fired up
//maintenance file
app.use( (req, res,next)=> {
    var now= new Date().toString() ;
    var currLog = `${now} : ${req.method} , ${req.url} \n` ;
    console.log(`${now} : ${req.method} , ${req.url}`);
    fs.appendFile('server.log', currLog, undefined, (err)=> {
       if(err) {
           console.log('Unable to log file ');
       }
    });
    res.render('maintainance.hbs');
    // next();
}) ;

app.use(express.static(__dirname+'/public'));
//similar to android @style/fragmentName to remove redundancy and boiler plate code
hbs.registerPartials(__dirname+'/views/partials');

//we can use functions and pass it to several partials of hbs files
hbs.registerHelper('getCurrentyear', ()=> {
    return new Date().getFullYear()
});


app.get('/', (req,res)=> {
    res.render('about.hbs', {
        pageTitle: 'My fucking page'
    });
});




app.get('/bad', (req,res)=> {
    res.send({
        status:404,
        msg:'Not found'
    });
});


 app.listen(3000, ()=>{
     console.log('Server is up and running at port 3000')
 });