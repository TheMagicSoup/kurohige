const owner=require("../config.json").ownerID;
module.exports = {
	name: "zaki",
	description: "Get the bot's thoughts on ME! THE OWNER! I'M TALKING! ME!",
	command_usage: "```\nb!zaki\n```",
	run: (client, message, args)=>{
		if(message.author.id!==owner)return;
		message.channel.send("ZAKI IS THE GOAAAAT!");
		message.channel.send("https://c.tenor.com/uYj55Ld1tikAAAAd/the-goat-black-guy.gif");
	}
}

