(function(chat) {
	"use strict"
	chat = chat || (window.chat = {});

	var token;
	var username;
	var username2;
	var message;

	window.chat.init(function messageHandler(data) {
		console.log("im running");
		

		$("#messages")
			.append( "<p>" )
			.find("p:last-child")
				.text(data.message)
					.append($("<cite>").text(username2));


	});


	$("#login").on("submit", function(event){
		event.preventDefault();

		username = $(".username").val();

		console.log(username);
		console.log("hello");

   //put this stuff in success section


		$.ajax({
			type: "POST",
			url: "/login",
			contentType: "application/json",
			data: JSON.stringify({username: username}),
			
			success: function show(data) {
				console.log(data);

				token = data.token;
				$("#login").hide();
				$("#chat").show();

			},

			error: function message(){
				console.log("You was wrong!")
			}
		});
	});

	$("#send-message").on("submit", function(event){
		event.preventDefault();

		message = $(".message").val();
		username2 = username;

		console.log(message);


		$.ajax({
			type: "POST",
			url: "/chat",
			contentType: "application/json",
			headers: {authorization: token },
			data: JSON.stringify({message: message}),
			success: function message(){
				console.log("hello 2");
			},
			error: function message(){
				console.log("whatever");
			}
		});



	});



})(window.chat);