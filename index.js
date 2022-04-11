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
        host: "ec2-3-217-251-77.compute-1.amazonaws.com",
        user: "zyxzmpeehicrcz",
        password: "3d8c46ca196f3149d6509d16b18a1e61735b99c69ad352d4276a0588cbf1c855",
        database: "dcps5bb1vbrkva",
        port: 5432
    },
    useNullAsDefault: true
});

app.use(express.urlencoded({extended: true}));


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


