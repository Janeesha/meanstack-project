var mongoose=require("mongoose");
var contactSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:String,
		required:true
	}
});


var contact=module.exports=mongoose.model("contact",contactSchema,"contact")

module.exports.createContact=function(contactObj,callback){
	return contact.create(contactObj,callback)
}

module.exports.getContact=function(callback){
	return contact.find(callback)
}

module.exports.getContactById=function(contactid,callback){
	return contact.findById(contactid,callback)
}

module.exports.updateContact=function(contactid,contactObj,callback){
	return contact.update({_id:contactid},{$set:{
		                                    name:contactObj.name,
		                                    email:contactObj.email,
		                                    mobile:contactObj.mobile
	}},callback)
}

module.exports.deleteContact=function(contactid,callback){
	return contact.remove({_id:contactid},callback)
}

