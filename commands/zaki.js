const owner=require("../config.json").ownerID;
exports.run=(clients,message,args)=>{
	if(message.author.id!==owner)return;
	message.channel.send("ZAKI IS THE GOAAAAT!");
	message.channel.send("https://c.tenor.com/uYj55Ld1tikAAAAd/the-goat-black-guy.gif");
}
exports.name="zaki";
exports.description="Get the bot's thoughts on me.";
exports.command_usage="```\nb!zaki\n```";
