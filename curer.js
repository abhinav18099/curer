var express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/curer';
var staffs= require('./module/schema');
const connect = mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});

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
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('port',process.env.port || 3000);

app.get('/',function(req,res){
    res.render('home');
});

app.get("/login",function(req,res){
    res.render('login',{layout : 'login-page'});
});

app.post('/signup',function(req,res){
    var Name=req.body.name;
    var person=req.body.person;
    var Email=req.body.email;
    var Pass=req.body.password;
    var Repass=req.body.password_confirmation;
    //console.log(Name);
    if(Pass==Repass){
        var val=0;
        if(person=="D"){ val=1;}
        connect.then(function(db){
            return staffs.find({email:Email});
        })
        .then(function(results){
            if(results.length==0){
                var new_member= new staffs({email:Email,name:Name,password:Pass,category:val});
                new_member.save();
                res.send("<script language='javascript'>window.alert('Signup Successfull');window.location='/login';</script>");
            }
            else{
                res.send("<script language='javascript'>window.alert('Email Already Exists');window.location='/login';</script>");
            }
        })
        .catch(function(err){
            console.log(err);
        })
        
    }
    else{
        res.send("<script language='javascript'>window.alert('Please enter same password in both field');window.location='/login';</script>");
    }
});

app.post('/login',function(req,res){
    var Email=req.body.email_log;
    var Pass=req.body.password_log;
    connect.then(function(db){
        return staffs.find({email:Email,password:Pass});
    })
    .then(function(results){
        if(results.length==1){
            res.send("<script language='javascript'>window.alert('Login Successfull');window.location='/login';</script>");
        }
        else{
            res.send("<script language='javascript'>window.alert('Wrong Credentials');window.location='/login';</script>");
        }
    })
    .catch(function(err){
        console.log(err);

    })
});

app.listen(app.get('port'),function(){
    console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});