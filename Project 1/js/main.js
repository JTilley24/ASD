$("home").on("pageinit", function(){

});

$("#about").on("pageinit", function(){

});

$("#past").on("pageinit", function(){

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
			$(this).click(
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
			$(this).click(
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
