//Imports
const owner=require("../config.json").ownerID;
module.exports = {
	name: "zaki",
	description: "OWNER ONLY:\nGet the bot's thoughts on ME! THE OWNER! I'M TALKING! ME!",
	command_usage: "```\nb!zaki\n```",
	run: (client, message, args)=>{
		//If I didn't make this command, return
		if(message.author.id!==owner)return;
		//Returns the TRUTH!!
		message.channel.send("ZAKI IS THE GOAAAAT!");
		message.channel.send("https://c.tenor.com/uYj55Ld1tikAAAAd/the-goat-black-guy.gif");
		return;
	}
}

