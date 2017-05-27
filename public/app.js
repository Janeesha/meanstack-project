var app=angular.module("myapp",[]);

app.controller("mycontroller",["$scope","$http",function($scope,$http){
	// var contact1={
	// 	name:"asha",
	// 	email:"asha@gmail.com",
	// 	mobile:"9141434886"
	// }
	// var contact2={
	// 	name:"jany",
	// 	email:"jany@gmail.com",//this is understanding
	// 	mobile:"9141434886"
	// }
	// var contact3={
	// 	name:"janeesha",
	// 	email:"janeesha@gmail.com",
	// 	mobile:"9141434886"
	// }
	// var contactlist=[contact1,contact2,contact3];


	$scope.createContact=function(){

		$http.post("/createcontact",$scope.contact)
		.then(function(response){
			$scope.contact={};
			refresh()  //calling get method
		})

	}

  var refresh=function(){
  	$http.get("/getcontact")
  	         .then(function(response){
  	         	console.log(response.data)
  	         	$scope.contactlist=response.data
  	         })
  }
  refresh()

  $scope.editContact=function(id){
  	$http.get("/getcontact/"+id)
  	.then(function(response){
  		$scope.contact=response.data  //putting data into textbox
  	})
  }

  $scope.updateContact=function(){
  	$http.put("/update/"+$scope.contact._id,$scope.contact)
  	.then(function(response){
  		refresh();

  	})
  }

  $scope.removeContact=function(id){
  	$http.delete("/removeContact/"+id)
  	.then(function(response){
  		refresh();
  	})
  }

}])