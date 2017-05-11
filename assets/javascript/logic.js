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
		p1Response: p1Response,
	})
});	

$(".player2Button").on("click", function() {
	//console.log(this.id);
	p2Response = this.id;

	database.ref().update({
		p2Response: p2Response,
	})
});	

$("#rock").on("click", function(){
	$("img").hide();
	$("#rockPic1").show();
})

$("#paper").on("click", function(){
	$("img").hide();
	$("#paperPic1").show();
})

$("#scissors").on("click", function(){
	$("img").hide();
	$("#scissorsPic1").show();
})

$("#rock2").on("click", function(){
	$("img").hide();
	$("#rockPic1").show();
})

$("#paper2").on("click", function(){
	$("img").hide();
	$("#paperPic1").show();
})

$("#scissors2").on("click", function(){
	$("img").hide();
	$("#scissorsPic1").show();
})

$("#ready1").on("click", function() {
	database.ref().update({
		player1: true
	})
	$("#p1ButtonArea").css("border-color", "green",);
})

$("#ready2").on("click", function() {
	database.ref().update({
		player2: true
	})
	$("#p2ButtonArea").css("border-color", "green",);
})

$("#player1").on("click", function() {
	//console.log("player1");
	$("#player2Display").hide();
	$("#player1Display").show();
	$("#playerSelection").empty();
});
$("#player2").on("click", function() {
	//console.log("player2");
	$("#player1Display").hide();
	$("#player2Display").show();
	$("#playerSelection").empty();
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
	if(player1Response=="rock" && player2Response=="scissors2"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
		$("#gameWords").text("Rock beats Scissors");
	} else if(player1Response=="paper" && player2Response=="rock2"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
		$("#gameWords").text("Paper beats Rock");
	} else if(player1Response=="scissors" && player2Response=="paper2"){
		console.log("P1 Wins!");
		p1Wins++;
		$("#p1Victory").show();
		$("#gameWords").text("Scissors beats Paper");
	} else if(((player1Response)+2) == player2Response){
		console.log("tie");
		ties++;
		$("#tie").show();
	} else if(player2Response=="rock2" && player1Response=="scissors"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
		$("#gameWords").text("Rock beats Scissors");
	} else if(player2Response=="paper2" && player1Response=="rock"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
		$("#gameWords").text("Paper beats Rock");
	} else if(player2Response=="scissors2" && player1Response=="paper"){
		console.log("P2 Wins!");
		p2Wins++;
		$("#p2Victory").show();
		$("#gameWords").text("Scissors beats Paper");
	} else{}	
}	

	database.ref().on("value", function(snapshot) {
		player1 = snapshot.val().player1;
		player2 = snapshot.val().player2;
	if(player1=== true && player2===true){
		//console.log(player1);
		//console.log(player2);
		compareResponses();
		determineWinner();
		displayStats();
		setTimeout(function(){
			database.ref().update({
				player1: false,
				player2: false
			})	
		}, 50);
		setTimeout(function(){
			$("#p1Victory").hide();
			$("#p2Victory").hide();
			$("#tie").hide();
			$("#gameWords").empty();
			$("img").hide();
			$("#p1ButtonArea").css("border-color", "black",);
			$("#p2ButtonArea").css("border-color", "black",);
		}, 2000);
	} else{}
	})
//display results to players

//chat box
$("#submit1").on("click", function(event) {
	event.preventDefault();

	var p1Chat = $("#p1ChatBox").val();

	database.ref().update({
		p1Chat: p1Chat
	})
});	

$("#submit2").on("click", function(event) {
	event.preventDefault();

	var p2Chat = $("#p2ChatBox").val();

	database.ref().update({
		p2Chat: p2Chat
	})
});	

database.ref().on("value", function(snapshot) {
		player1Message = snapshot.val().p1Chat;
		player2Message = snapshot.val().p2Chat;
		$("#p1Messages").text(player1Message);
		$("#p2Messages").text(player2Message);
	})

//display victories and ties
function displayStats() {
	$("#p1Wins").html(p1Wins);
	$("#p2Wins").html(p2Wins);
	$("#ties").html(ties);
}


displayStats();


