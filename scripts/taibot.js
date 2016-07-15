// Your app must:

// Have a message post to Slack based on user input
// Do at least 3 different things.
// One of the commands must utilize the list of people in the class to send a direct message or reply.
// Leverage Hubot
// Use at least 1 conditional to change the outcome of a Slackbot.

// Bonus

// Leverage a for loop to iterate over a collection
// Introduce a random component
// Include an image in the response in addition to text

// Necessary Deliverables


// Potential Project Ideas

// Class today
// Ask your bot whether we have class today or not. Use JavaScript to check today's date and then respond back with whether we have class or not.

// Random quote
// Use an array to store a number of your favorite quotes. When you ping your bot, have it return a random quote from your list.


module.exports = function(robot){

	robot.hear(/howdy/, function(msg){
		msg.send('Hodor!');
	});


	robot.hear(/dementor/,function(msg){
		msg.send('Expecto Patronum....' + ' https://media.giphy.com/media/4XIuQFlyytdxm/giphy.gif');
		return msg.reply('dementor gone...you are safe now');
	});



	robot.respond(/what is your favorite (.*)/, function(msg) {
		var fav = msg.match[1];
		switch (fav) {
			case "food":
			return msg.reply("I'm a robot--I don't eat food!");
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
			default:
			return msg.reply("I don't have a favorite " + fav + ". What's yours?");
		}
	});

	var enterMessage = ['Welcome to the darkside', 'Hodor', 'Welcome friend'];
	var leaveMessage = ['Bye! Sad panda', 'Man down', 'Hodor! Hodor!'];


	robot.enter(function(respond) {
		return respond.send(respond.random(enterMessage));
	});

	robot.leave(function(respond) {
		return respond.send(respond.random(leaveMessage));
	});

	robot.respond(/do we have class today/, function(msg){
		var d = new Date();
		var today = d.getDay();

		if (today === 1 || today === 3){
			return msg.reply("Yes you have class");
		}else{
			return msg.reply("Nope! Go be free");
		}

	});


	var listGoodbyes = ["Bye, {name}.", "Later, {name}.", "Take care, {name}.", "Adios, {name}.", "Have a good day, {name}."];

	var goodbye = function(name) {
		var index = parseInt(Math.random() * listGoodbyes.length);
		var message = listGoodbyes[index];
		return message.replace(/{name}/, name);
	};

	robot.hear(/(bye|later)/, function(msg) {
		var byeMessage = goodbye(msg.message.user.name);
		return msg.send(byeMessage);

	});


	robot.hear(/hi siri/, function(res) {
		return robot.messageRoom(res.message.user.name, "hi im hubot not siri");
	});


	var quotes = [{quote: "Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.", author: "Albert Einstein"},{quote: "In the End, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr."}, {quote: "The only way to get rid of a temptation is to yield to it.", author: "Oscar Wilde"}, {quote: "Once you eliminate the impossible, whatever remains, no matter how improbable, must be the truth.", author: "Sherlock Holmes"}, {quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou"},{quote: "Forgive your enemies, but never forget their names.", author: "John F. Kennedy"},{quote: "He who hesitates is a damned fool.", author: "Mae West"}];
	
	var getQuote = function(){
		var i = Math.floor(Math.random() * quotes.length);
		var newQuote = quotes[i].quote + " - " + quotes[i].author;
		return newQuote;
	};

	robot.respond(/quote/, function(msg) {
		  msg.send(getQuote());
	});


};

