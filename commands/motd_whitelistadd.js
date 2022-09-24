let motd=require("./modules/motd.json");
let owner=require("../config.json").owner;
exports.run=(client,message,args)=>{
	if(message.author.id!==owner)return;
	arg=args[0];
	if(!arg){
		message.channel.send("You need to mention a user to add them to the whitelist\n```\nb!motd_whitelistadd <@user>\n```");
		return;
	}
	
	let user = message.mentions.users.first() || client.users.cache.get(arg) || message.author;
	
	let wl=motd.whitelist;
	wl.push(user.id);
	
}
exports.name="motd_whitelistadd"
exports.description="Adds to whitelist, dev-only\nTakes one argument: a user (mention)";
exports.command_usage="```\nb!motd_whitelistadd <@user>\n```"