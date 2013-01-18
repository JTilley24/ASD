$("home").on("pageinit", function(){

});

$("#about").on("pageinit", function(){

});

//Save Repair function
var saveData = function(data){
		if(!data.key){
			var id = Math.floor(Math.random()*1000001);
		}else{
			id = data.key;
		}
		
		var region = $("input:radio[name=region]:checked")

		var item = {};
			item.region = ["Region:", region.val()];
			item.make = ["Make:", $("#make").val()];
			item.model = ["Model:", $("#model").val()];
			item.year = ["Year:", $("#year").val()];
			item.parts = ["Part:", $("#parts").val()];
			item.date = ["Date for repair:", $("#date").val()];
			item.comments = ["Description:", $("#comments").val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved");
		location.reload();
	}

$("#repairs").on("pageinit", function(){
	$("#storage").on("click", function(){
		$("#repairlist").empty();
		for(var i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var item = JSON.parse(localStorage.getItem(key));
			var subList = $("<li></li>");
			var newImage = $('<img src="images/'+item.region[1]+'.png">');
			var subLi = $("<h3>"+item.year[1]+" "+item.make[1]+" "+item.model[1]+"</h3>"+
				"<p>Parts: "+item.parts[1]+"</p>"+
				"<p>Date: "+item.date[1]+"</p>"+
				"<p>Comments: "+item.comments[1]+"</p>");
			var editLink = $("<a href='#' id='"+key+"'>Edit</a>");
			console.log(key);
			editLink.on("click", function(){
				var key = this.id;
				editRepair(key);
			});
			var deleteLink = $("<a href='#' id='"+key+"'>Delete</a>");
			deleteLink.on("click", function(){
				var key = this.id;
				deleteRepair(key);
			});
			subList.append(newImage);
			subList.append(editLink);
			subList.append(deleteLink);
			subList.append(subLi).appendTo("#repairlist");
		}
		
	});
	
	//Clear Local Storage
	$("#clear").on("click", function(){
		localStorage.clear();
		alert("Cleared");
		$("#repairlist").empty();
	})
	
		
});


//Edit Repair Function
var editRepair = function(key){
	console.log(key);
	var value = localStorage.getItem(key);
	var item = JSON.parse(value);
	console.log(item);
	$.mobile.changePage("#additem");
	$("#make").val(item.make[1]);
	$("#model").val(item.model[1]);
	$("#year").val(item.year[1]);
	$("#parts").val(item.parts[1]);
	$("#date").val(item.date[1]);
	$("#comments").val(item.comments[1]);
	$("#parts").selectmenu("refresh");
	var radios = $("input:radio[name=region]");
 	if(item.region[1] == "Domestic"){
		radios[0].click();
	}else if(item.region[1] == "Asian"){
		radios[1].click();
	}else if(item.region[1] == "European"){
		radios[2].click();
	}
	 var editSubmit = $("#submit");
	 editSubmit.on("click", function(){
		console.log(key);
		
		var myForm = $("#addrepair")
		submitSend = $("#submit");
		myForm.validate(
			{
			invaildHandler: function(form, validator){
			},
			submitHandler: function(){
				var data = myForm.serializeArray();
				saveData(data);
			}
		});
	 });
}

//Delete Repair function
var deleteRepair = function(key){
	localStorage.removeItem(key);
	$("#storage").click();
}




$("#additem").on("pageinit", function(){
	//Validation
	$.validator.methods.date = function () { return true; };
	
	var myForm = $("#addrepair")
		submitSend = $("#submit");
		myForm.validate(
			{
			invaildHandler: function(form, validator){
			},
			submitHandler: function(){
				var data = myForm.serializeArray();
				saveData(data);	
			}
			});
		
	//Current Date	
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	$("#date").val(year + "-" + month + "-" + day);
			
	//Replace placeholder for texts
	$("input:text").each(
		function(){
			$(this).focus(
				function(){
					$(this)
					.val(" ")
					.css("color", "#000");
				}
			);
			$(this).blur(
				function(){
					if($(this).val() == " "){
						$(this)
						.val($(this).attr("placeholder"))
						.css("color","#999");
					}
				}
			);
		}
	);
	
	//Replace placeholder for comments
	$("#comments").each(
		function(){
			$(this).focus(
				function(){
					$(this).val(" ")
					.css("color",("#000"));
				}
			);
			$(this).blur(
				function(){
					if($(this).val() == " "){
						$(this)
						.val($(this).attr("placeholder"))
						.css("color","#999");
					}
				}
			);
		}
	);


});

$("#engine").on("pageinit", function(){

});

$("#drivetrain").on("pageinit", function(){

});

$("#chassis").on("pageinit", function(){

});

$("#interior").on("pageinit", function(){

});

$("#body").on("pageinit", function(){

});
