const listenPort = 3333;
let express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
let path = require('path');
let app = express();
app.set("view engine" , "ejs");
app.use(express.static('images'));
app.use(express.static('public'))

let knex = require("knex")({
    client: "pg" ,
    connection: {
        host: "localhost",
        server: "PostgreSQL 14",
        user: "postgres",
        password: "Jeffron31!",
        database: "postgres",
        port: 5432
    },
    useNullAsDefault: true
});

app.use(express.urlencoded({extended: true}));

app.listen(listenPort, function() {console.log("Listener active on port " + listenPort);});


app.get("/deleteItem/:vehicle_id",(req,res) => {
    knex("Vehicle").where('vehicle_id', req.params.vehicle_id).del()
.then (() =>{
    res.redirect("/displayvehicle");
}).catch(err => {
        console.log(err);
        res.status(500).json({err}); 
   
}); })



app.get("/addVehicle",(req, res)=>{res.render("addVehicle");});

app.post("/addVehicle",(req,res) =>{
    knex("Vehicle").insert({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMileage:req.body.vMileage,
        vStillUsing:req.body.vStillUsing
    }).then (() =>{
        res.redirect("/displayvehicle");
    });
});




app.get("/updateItem/:vehicle_id" ,(req , res) => {
    knex("Vehicle").where('vehicle_id', req.params.vehicle_id)
    .then(theMenu => {
    res.render("updateItem",{theMenu: theMenu});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err}); 
    });
});


app.post("/updateItem",(req,res) =>{
    knex("Vehicle").where('vehicle_id', req.body.vehicle_id).update({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMileage:req.body.vMileage,
        vStillUsing:req.body.vStillUsing
    }).then (() =>{
        res.redirect("/displayvehicle");
    });
});




app.get("/displayvehicle",(req,res) => {
    knex("Vehicle").orderBy('vehicle_id')
    .then(theMenu => {
        res.render("displayVehicle",{theMenu: theMenu});

    }).catch(err => {
        console.log(err);
        res.status(500).json({err}); 
    });    
});


