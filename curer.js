var express = require("express");
var app = express();

var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name,options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));
app.set('port',process.env.port || 3000);

app.get('/',function(req,res){
    res.render('home');
})
app.get("/login",function(req,res){
    res.render('login',{layout : 'login-page'});
})

app.listen(app.get('port'),function(){
    console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
})