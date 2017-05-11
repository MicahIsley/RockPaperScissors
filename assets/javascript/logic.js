//link to Firebase
var config = {
    apiKey: "AIzaSyD7G60NEYnkvldIgwmy3Gx45KlSnW6KD00",
    authDomain: "rockpaperscissors-477d6.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-477d6.firebaseio.com",
    projectId: "rockpaperscissors-477d6",
    storageBucket: "rockpaperscissors-477d6.appspot.com",
    messagingSenderId: "231170668393"
  };
  firebase.initializeApp(config);

//variables for game
var database = firebase.database();
var player1Response = "";
var player2Response = "";
var p1Wins = 0;
var p2Wins = 0;
var ties = 0;
var player1 = false;
var player2 = false;

//store player responses in firebase
$(".player1Button").on("click", function() {
	//console.log(this.id);
	p1Response = this.id;

	database.ref().update({
		p1Response: p1Response
	})
	player1 = true;

});	

$(".player2Button").on("click", function() {
	//console.log(this.id);
	p2Response = this.id;

	database.ref().update({
		p2Response: p2Response
	})
	player2 = true;

});	

$("#player1").on("click", function() {
	//console.log("player1");
	$("#player2Display").hide();
	$("#player1Display").show();
	//$("#playerSelection").empty();
});
$("#player2").on("click", function() {
	//console.log("player2");
	$("#player1Display").hide();
	$("#player2Display").show();
	//$("#playerSelection").empty();
});	
//compare player responses and determine win, loss, or tie
function compareResponses() {
	database.ref().on("value", function(snapshot) {
	player1Response = snapshot.val().p1Response;
	player2Response = snapshot.val().p2Response;
	//console.log(player1Response);
	//console.log(player2Response);
	})
}	

function determineWinner(){
	if(player1Response=="rock" && player2Response=="scissors"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
	} else if(player1Response=="paper" && player2Response=="rock"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
	} else if(player1Response=="scissors" && player2Response=="paper"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
	} else if(player1Response == player2Response){
		console.log("tie");
		ties++;
		$("#tie").show();
	} else if(player2Response=="rock" && player1Response=="scissors"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
	} else if(player2Response=="paper" && player1Response=="rock"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
	} else if(player2Response=="scissors" && player1Response=="paper"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
	} else{}	
}	

function ready(){
	if(player1=== true && player2===true){
		//console.log(player1);
		//console.log(player2);
		compareResponses();
		determineWinner();
		displayStats();
		setTimeout(function(){
			player1 = false;
			player2 = false;
		}, 50);
		setTimeout(function(){
			$("#p1Victory").hide();
			$("#p2Victory").hide();
			$("#tie").hide();
		}, 2000);
	} else{}
}
//display results to players

//chat box
$("#submit1").on("click", function(event) {
	event.preventDefault();

	var p1Chat = $("#p1ChatBox").val();

	database.ref().update({
		p1Chat: p1Chat
	})
	database.ref().on("value", function(snapshot) {
		player1Message = snapshot.val().p1Chat;
		$("#p1Messages").text(player1Message);
	});	
});	

$("#submit2").on("click", function(event) {
	event.preventDefault();

	var p2Chat = $("#p2ChatBox").val();

	database.ref().update({
		p2Chat: p2Chat
	})
	database.ref().on("value", function(snapshot) {
		player2Message = snapshot.val().p2Chat;
		$("#p2Messages").text(player2Message);
	});	
});	

//display victories and ties
function displayStats() {
	$("#p1Wins").html(p1Wins);
	$("#p2Wins").html(p2Wins);
	$("#ties").html(ties);
}

$(".ready").on("click", function() {
	ready();
});

displayStats();


