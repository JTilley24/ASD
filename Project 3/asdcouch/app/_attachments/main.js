$("home").on("pageinit", function(){

});

$("#about").on("pageinit", function(){

});

//Save data to local storage
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
};

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
	});
		
	$("#asiaButton").on("click", function(){
		loadAData();
	});
	$("#domButton").on("click", function(){
		loadDData();
	});
	$("#euroButton").on("click", function(){
		loadEData();
	});
	
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




//Load CouchDB data	
var loadAData = function(){
		$("#datalist").empty();
		$.ajax({
			"url": "_view/asia",
			"type": "GET",
			"dataType": "json",
			"success": function(data){
				$.each(data.rows, function(index, asia){
					var region = asia.value.region;
					var make = asia.value.make;
					var model = asia.value.model;
					var year = asia.value.year;
					var parts = asia.value.parts;
					var date = asia.value.date;
					var comments = asia.value.comments;
					$("#datalist").append(
						$("<li>").append(
							$("<a>").attr("href", "#").text(year+" "+make+" "+model)
						)
					);	
				});
			}
		});
		$("#datalist").listview("refresh");
};

var loadDData = function(){
		$("#datalist").empty();
		$.ajax({
			"url": "_view/dom",
			"type": "GET",
			"dataType": "json",
			"success": function(data){
				$.each(data.rows, function(index, dom){
					var region = dom.value.region;
					var make = dom.value.make;
					var model = dom.value.model;
					var year = dom.value.year;
					var parts = dom.value.parts;
					var date = dom.value.date;
					var comments = dom.value.comments;
					$("#datalist").append(
						$("<li>").append(
							$("<a>").attr("href", "#").text(year+" "+make+" "+model)
						)
					);	
				});
			}
		});
		$("#datalist").listview("refresh");
};

var loadEData = function(){
		$("#datalist").empty();
		$.ajax({
			"url": "_view/euro",
			"type": "GET",
			"dataType": "json",
			"success": function(data){
				$.each(data.rows, function(index, euro){
					var region = euro.value.region;
					var make = euro.value.make;
					var model = euro.value.model;
					var year = euro.value.year;
					var parts = euro.value.parts;
					var date = euro.value.date;
					var comments = euro.value.comments;
					$("#datalist").append(
						$("<li>").append(
							$("<a>").attr("href", "#").text(year+" "+make+" "+model)
						)
					);	
				});
			}
		});
		$("#datalist").listview("refresh");
};


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


var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url")
	var urlParts = urlData.split("?");
	var urlPairs = urlParts[1].split("&");
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
		var urlregion = key
	}
	return [urlValues, urlregion];
};

//Domestic Vehicles
$("#domrepair").live("pageshow", function(){
	
	//Dynamic Couch data
	$.couch.db("asdproject").view("vehiclerepair/dom", {
			success: function(data) {
				$("#domlist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					$("#domlist").append(
						$("<li>").append(
							$("<a>").attr("href", "dom.html?dom=" + item.model).text(item.year+" "+item.make+" "+item.model)
						)
					);
				});
				$("#domlist").listview("refresh");
			}
	});	
	
});

//Domestic Detail
$("#domdetails").live("pageshow", function(){
	
	var dominfo = urlVars()[0]["dom"];
	console.log(urlVars());
	console.log(dominfo);
	var domitem;
	$.couch.db("asdproject").view("vehiclerepair/dom", {
			success: function(data) {
				$("#domDlist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					if(item.model === dominfo){
						domitem = item;
						domVal = value;
					};
				});
				$("#domDlist").append(
						$("<li>").text("Region: "+domitem.region),
						$("<li>").text("Make: "+domitem.make),
						$("<li>").text("Model: "+domitem.model),
						$("<li>").text("Parts: "+domitem.parts),
						$("<li>").text("Year: "+domitem.year),
						$("<li>").text("Date: "+domitem.date),
						$("<li>").text("Comments: "+domitem.comments)
				)
				$("domDlist").listview("refresh");
				$("#editLink").attr("href", "form.html?dom="+domitem.model);
				$("#deleteLink").on("click", function(){
						deleteDoc(domVal);
				})
			}
	});	
});

//European Vehicles
$("#eurorepair").live("pageshow", function(){
	
	//Dynamic Couch data
	$.couch.db("asdproject").view("vehiclerepair/euro", {
			success: function(data) {
				$("#eurolist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					$("#eurolist").append(
						$("<li>").append(
							$("<a>").attr("href", "euro.html?euro=" + item.model).text(item.year+" "+item.make+" "+item.model)
						)
					);
				});
				$("#eurolist").listview("refresh");
			}
	});	
	
});

//European Details
$("#eurodetails").live("pageshow", function(){
	
	var euroinfo = urlVars()[0]["euro"];
	console.log(euroinfo);
	var euroitem;
	$.couch.db("asdproject").view("vehiclerepair/euro", {
			success: function(data) {
				$("#euroDlist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					if(item.model === euroinfo){
						euroitem = item;
						euroVal = value;
					};
				});
				$("#euroDlist").append(
						$("<li>").text("Region: "+euroitem.region),
						$("<li>").text("Make: "+euroitem.make),
						$("<li>").text("Model: "+euroitem.model),
						$("<li>").text("Parts: "+euroitem.parts),
						$("<li>").text("Year: "+euroitem.year),
						$("<li>").text("Date: "+euroitem.date),
						$("<li>").text("Comments: "+euroitem.comments)
				)
				$("euroDlist").listview("refresh");
				$("#editLink").attr("href", "form.html?euro="+euroitem.model);
				$("#deleteLink").on("click", function(){
						deleteDoc(euroVal);
				})
			}
	});	
});

//Asian Vehicles
$("#asiarepair").live("pageshow", function(){
	
	//Dynamic Couch data
	$.couch.db("asdproject").view("vehiclerepair/asia", {
			success: function(data) {
				$("#asialist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					$("#asialist").append(
						$("<li>").append(
							$("<a>").attr("href", "asia.html?asia=" + item.model).text(item.year+" "+item.make+" "+item.model)
						)
					);
				});
				$("#asialist").listview("refresh");
			}
	});	
	
});

//Asian Detail
$("#asiadetails").live("pageshow", function(){
	
	var asiainfo = urlVars()[0]["asia"];
	console.log(asiainfo);
	var asiaitem;
	$.couch.db("asdproject").view("vehiclerepair/asia", {
			success: function(data) {
				$("#asiaDlist").empty();
				$.each(data.rows, function(index, value){
					var item = (value.value || value.doc);
					if(item.model === asiainfo){
						asiaitem = item;
						asiaVal = value;
					};
				});
				$("#asiaDlist").append(
						$("<li>").text("Region: "+asiaitem.region),
						$("<li>").text("Make: "+asiaitem.make),
						$("<li>").text("Model: "+asiaitem.model),
						$("<li>").text("Parts: "+asiaitem.parts),
						$("<li>").text("Year: "+asiaitem.year),
						$("<li>").text("Date: "+asiaitem.date),
						$("<li>").text("Comments: "+asiaitem.comments)
				)
				$("asiaDlist").listview("refresh");
				$("#editLink").attr("href", "form.html?asia="+asiaitem.model);
				$("#deleteLink").on("click", function(){
						deleteDoc(asiaVal);
				})
			}
	});	
});

//Add New Document function
var addDoc = function(){
		 var doc = {};
		 var radios = $("input:radio[name=newregion]");
			if(radios[0].checked){
				itemId = "dom:";
				doc.region = "Domestic"
			}else if(radios[1].checked){
				itemId = "euro:";
				doc.region = "European"
			}else if(radios[2].checked){
				itemId = "asia:";
				doc.region = "Asian"
			}
		console.log(doc);
		doc.make = $("#newmake").val();
		doc.model = $("#newmodel").val();
		doc.year = $("#newyear").val();
		doc.parts = $("#newparts").val();
		doc.date = $("#newdate").val();
		doc.comments = $("#newcomments").val();
		doc["_id"]=itemId+":"+doc.model;
		$.couch.db("asdproject").saveDoc(doc, {
			success: function(data){
				console.log(data);
				alert("Repair Saved");
				$("#formreset").click();
			},
			error: function(status){
				console.log(status);
			}
		});
}

//Edit Document function
var updateDoc = function(value){
		$("#editSubmit")
		console.log(value.id);
		$.couch.db("asdproject").openDoc(value.id, {
			success: function(data){
				var radios = $("input:radio[name=editregion]");
				if(radios[0].checked){
					data.region = "Domestic"
				}else if(radios[1].checked){
					data.region = "European"
				}else if(radios[2].checked){
					data.region = "Asian"
				}
				data.make = $("#editmake").val();
				data.model = $("#editmodel").val();
				data.year = $("#edityear").val();
				data.parts = $("#editparts").val();
				data.date = $("#editdate").val();
				data.comments = $("#editcomments").val();
				console.log(data);
				$.couch.db("asdproject").saveDoc(data, {
					success: function(data){
						console.log(data);
					},
					error: function(status){
						console.log(status);
					}
				})
			}
		})		
}

//Delete Document function
var deleteDoc = function(value){
	$.couch.db("asdproject").openDoc(value.id, {
			success: function(data){
				var doc = {
					_id: data._id,
					_rev: data._rev
				}
				console.log(doc);
				var ask = confirm("Are you sure?");
				if(ask){
					alert("Repair was deleted.");
					$.couch.db("asdproject").removeDoc(doc, {
						success: function(data){
							console.log(data);
							$.mobile.changePage($("#repairs"));
						},
						error: function(status){
							console.log(status);
						}
					});
				}else{
					alert("Repair was NOT deleted.");
					
				}
			}
	});
};


$("#editRepair").live("pageshow", function(){
	$("#formSubmit").attr("id", "editsubmit");
	var urlRegion = urlVars()[1];
	var urlItem = urlVars()[0][urlRegion];
	var item;
	console.log(urlRegion);
	console.log(urlItem);
	$.couch.db("asdproject").view("vehiclerepair/"+urlRegion, {
		success: function(data) {
			console.log(data);
			$.each(data.rows, function(index, value){
					var docItem = (value.value || value.doc);
					if(docItem.model === urlItem){
						console.log(value);
						item = docItem;
						console.log(item);
					};
			});
			$("#editmake").val(item.make);
			$("#editmodel").val(item.model);
			$("#edityear").val(item.year);
			$("#editparts").val(item.parts);
			$("#editdate").val(item.date);
			$("#editcomments").val(item.comments);
			$("#editparts").selectmenu("refresh");
			var radios = $("input:radio[name=editregion]");
			if(item.region == "Domestic"){
				radios[0].click();
			}else if(item.region == "Asian"){
				radios[2].click();
			}else if(item.region == "European"){
				radios[1].click();
			}
			$.each(data.rows, function(index, value){
				if(item == value.value){
					$("#editsubmit").on("click", function(){
						updateDoc(value);
						alert("Repair saved.")
						$.mobile.changePage($("#repairs"));
					})
				}		
			})
		}
	});
});

$("#newRepair").live("pageshow", function(){
	$("#formsubmit").on("click", function(){
		addDoc();
	})
})

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

