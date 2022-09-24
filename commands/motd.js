let motd=require("./modules/motd.json");
const owner=require("../config.json").owner;

exports.run=(client,message,args)=>{
	let arg=arg[0];
	if(arg){
		let wl=motd.whitelist;
		for(const person in wl){
			if(message.author.id===person){
				motd.message=arg;
				message.channel.send("SET MOTD!");
				return;
			}
		}
	} else {
		message.channel.send("The message of the day is...\n```\n"+motd.message+"\n```");
		return;
	}
}
exports.name="motd";
exports.description="Sends out the message of the day!";
exports.command_usage="```\nb!motd <argument\n```";