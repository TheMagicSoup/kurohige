const isSoylisted=require("../commands/modules/isSoylisted.js");
const getSoymoji=require("../commands/modules/getSoymoji.js");
require("dotenv").config();
module.exports=(client,message)=>{
	if(message.author.bot)return;
	
	if(isSoylisted(message.author.id))message.react(getSoymoji(client));
	
	if(message.content.indexOf(process.env.PREFIX) !== 0)return;	
	
	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command=args.shift().toLowerCase();

	const cmd=client.commands.get(command) || client.commands.find(a=>a.aliases&&a.aliases.includes(command));
	
	if(!cmd)return;
	cmd.run(client,message,args);
}