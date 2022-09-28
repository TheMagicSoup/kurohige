const embedInit = require("./modules/embedInit.js");
const isGoodLink = require("./modules/isGoodLink.js");
module.exports={
	name: "get_smashrender",
	description: "Command for getting Smash Bros. character renders.",
	command_usage: "Takes one argument, a character name\n```\nb!get_smashrender <character_name>\n```",
	run: (client,message,args)=>{
		let arg=args.join("_");
		if(!arg){
			message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
			return;
		}
		arg=arg.toLowerCase();
		const link=`https://www.smashbros.com/assets_v2/img/fighter/${arg}/main.png`;

		if(!isGoodLink(link)){
			message.channel.send("Bad link!\nERROR: TRY PUTTING A REAL SMASH CHARACTER IN! (use the full character name, like banjo AND kazooie)\n```\nb!get_smashrender banjo and kazooie\n```");
			return;
		}
		const embed=embedInit()
			.setImage(link)
			.setTitle(`Render for: "${arg}"`) 
			.addFields(
				{name: "Image link", value:`[CLICK HERE BITCH!](${link})`}
			);
		message.channel.send({embeds: [embed]});
	}
}