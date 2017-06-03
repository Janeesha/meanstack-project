var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var router=express.Router();
var path=require("path");
var contact=require("./module/contact.js")
app.use(express.static(path.join(__dirname,"public")))//to do html display

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost/contactlist-app",function(){
	console.log("sucessfully connected to database");
})

router.get("/",function(request,response){
	response.json("this is meanstack app")
})

router.get("/getcontact",function(request,response){
	contact.getContact(function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/getcontact/:id",function(request,response){
	var id=request.params.id;
	
	contact.getContactById(id,function(err,contactObj){
		if(err){
			throw err;
		}
		response.json(contactObj)
	})
})
 router.post("/createcontact",function(request,response){
 	var contactObj=request.body;
 	contact.createContact(contactObj,function(err,data){
 		if(err){
 			throw err;
 		}
 		response.json(data)
 	})
 })

router.put("/update/:id",function(request,response){ //it should put it wont take from angular
	var id=request.params.id;
	var contactObj=request.body;
	contact.updateContact(id,contactObj,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.delete("/removeContact/:id",function(request,response){
	var id=request.params.id;
	contact.deleteContact(id,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})



app.use("/",router)

var port=process.env.PORT||3000;
app.listen(port,function(){
	console.log("server is listening at the port"+ port)
})