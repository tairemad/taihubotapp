
module.exports = function(taibot){

	//if hears the word howdy

	taibot.hear(/howdy/, function(msg){
		msg.send('Hodor!');
	});

	//if hears the word dementor

	taibot.hear(/dementor/,function(msg){
		msg.send('Expecto Patronum....' + ' https://media.giphy.com/media/4XIuQFlyytdxm/giphy.gif');
		return msg.reply('dementor gone...you are safe now');
	});

	//if you @bot what is your favorite spits out case 

	taibot.respond(/what is your favorite (.*)/, function(msg) {
		var fav = msg.match[1];
		switch (fav) {
			case "food":
			return msg.reply("I'm a taibot--I don't eat food!");
			break;
			case "artist":
			return msg.reply("It's gotta be Drake!");
			break;
			case "programming language":
			return msg.reply("Javascript, of course!");
			break;
			case "hubot":
			return msg.reply("Me...Obviously!");
			break;
			case "color":
			return msg.reply("I am a robot we dont see color!");
			break;
			default:
			return msg.reply("I don't have a favorite " + fav + ". What's yours?");
		}
	});

	//if a person leaves or enters a chatroom 

	var enterMessage = ['Welcome to the darkside', 'Hodor', 'Welcome friend'];
	var leaveMessage = ['Bye! Sad panda', 'Man down', 'Hodor! Hodor!'];


	taibot.enter(function(respond) {
		return respond.send(respond.random(enterMessage));
	});

	taibot.leave(function(respond) {
		return respond.send(respond.random(leaveMessage));
	});

	taibot.respond(/do we have class today/, function(msg){
		var d = new Date();
		var today = d.getDay();

		if (today === 1 || today === 3){
			return msg.reply("Yes you have class");
		}else{
			return msg.reply("Nope! Go be free");
		}

	});

	//if hears bye or later from any user 

	var listGoodbyes = ["Bye, {name}.", "Later, {name}.", "Take care, {name}.", "Adios, {name}.", "Have a good day, {name}."];

	var goodbye = function(name) {
		var index = parseInt(Math.random() * listGoodbyes.length);
		var message = listGoodbyes[index];
		return message.replace(/{name}/, name);
	};

	taibot.hear(/(bye|later)/, function(msg) {
		var byeMessage = goodbye(msg.message.user.name);
		return msg.send(byeMessage);

	});

	// direct message if hears hi siri

	taibot.hear(/hi siri/, function(res) {
		return taibot.messageRoom(res.message.user.name, "hi im hubot not siri");
	});

	//random quotes generator 

	var quotes = [{quote: "Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.", author: "Albert Einstein"},{quote: "In the End, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr."}, {quote: "The only way to get rid of a temptation is to yield to it.", author: "Oscar Wilde"}, {quote: "Once you eliminate the impossible, whatever remains, no matter how improbable, must be the truth.", author: "Sherlock Holmes"}, {quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou"},{quote: "Forgive your enemies, but never forget their names.", author: "John F. Kennedy"},{quote: "He who hesitates is a damned fool.", author: "Mae West"}];
	
	var getQuote = function(){
		var i = Math.floor(Math.random() * quotes.length);
		var newQuote = quotes[i].quote + " - " + quotes[i].author;
		return newQuote;
	};

	taibot.respond(/quote/, function(msg) {
		msg.send(getQuote());
	});

	//if hears im worthy from certain users 

	taibot.hear(/im worthy/, function(msg) {
		if (msg.message.user.name == "tairemadailey" || msg.message.user.name == "kgaraffa" || msg.message.user.name == "skrice"){
			return msg.send('You are NOT worthy!!!');
		} else if(msg.message.user.name == 'leon-guyupfront'){
			return msg.send('You are sooo worthy!!!');
		}
	});

	//rock, paper, scissors
	var winner;
	var actions = function(msg, userChoice) {
		var options = ['scissors', 'paper', 'rock'];
		var hubotChoice = options[Math.floor(Math.random() * 3)];
		if (userChoice === 'rock'){
			if (hubotChoice === 'paper') {
				winner = "Paper covers rock Hubot wins!";
			}else if (hubotChoice === 'scissors'){
				winner = "Rock breaks scissors " + msg.message.user.name + ' wins.';
			}
		}

		if (userChoice === 'paper'){
			if (hubotChoice === 'rock') {
				winner = "Paper covers rock " + msg.message.user.name + ' wins.';
			}else if (hubotChoice === 'scissors'){
				winner = "Scissors cut paper Hubot wins!";
			}
		}

		if (userChoice === 'scissors'){
			if (hubotChoice === 'paper') {
				winner = "Scissors cut paper " + msg.message.user.name + ' wins.';
			}else if (hubotChoice === 'rock'){
				winner = "Rock breaks scissors Hubot wins!";
			}
		}

		if (userChoice === hubotChoice) {
			winner = "Draw!";
		}
		msg.send("Hubot picked " + hubotChoice);
		return msg.send(winner);
	};

	return taibot.respond(/(rock|paper|scissors)/, function(msg) {
		var userChoice = msg.match[1];
		return actions(msg, userChoice);
	});

}; //end module.exports

