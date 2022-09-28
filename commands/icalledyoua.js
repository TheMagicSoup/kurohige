//Defining module exports
module.exports={
	name: "icalledyoua",
	description: "basic argument practice",
	command_usage: "Takes one argument, any noun```\nb!icalledyou a <anything> \n```",
	run: (client, message, args) => {
		//If there's no argument provided, return
		if(!args[0]){
			message.channel.send("YOU DIDN'T EVEN CALL ME ANYTHING!");
			return;
		}
		//Stores provided argument converted to uppercase in word
		word=args[0].toUpperCase();
		//Returns response to argument
		message.channel.send(`YOU CALLED ME A WHAT? A ${word}??? I'LL KILL YOU!`).catch(console.error);
	}
}