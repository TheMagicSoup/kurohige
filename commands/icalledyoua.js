module.exports={
	name: "icalledyoua",
	description: "basic argument practice",
	command_usage: "Takes one argument, any noun```\nb!icalledyou a <anything> \n```",
	run: (client, message, args) => {
		word=args[0].toUpperCase();
		message.channel.send(`YOU CALLED ME A WHAT? A ${word}??? I'LL KILL YOU!`).catch(console.error);
	}
}