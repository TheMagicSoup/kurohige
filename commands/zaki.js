//Defining module properties
module.exports = {
	name: "zaki",
	description: "OWNER ONLY:\nGet the bot's thoughts on ME! THE OWNER! I'M TALKING! ME!",
	aliases: ["goat","creator"],
	command_usage: "```\nb!zaki\n```",
	run: (client, message, args)=>{
		//If I didn't make this command, return
		if(message.author.id!==process.env.OWNER)return;
		//Returns the TRUTH!!
		message.channel.send("ZAKI IS THE GOAAAAT");
		message.channel.send("https://c.tenor.com/uYj55Ld1tikAAAAd/the-goat-black-guy.gif");
		return;
	}
}

