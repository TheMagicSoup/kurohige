//Imports
const embedInit = require("./modules/embedInit.js");
const isGoodLink = require("./modules/isGoodLink.js");
//Defining module properties
module.exports={
	name: "get-smashrender",
	description: "Command for getting Smash Bros. character renders.",
	aliases: ["fetch-smashrender","smashrender"],
	command_usage: "Takes one argument, a character name\n```\nb!get-smashrender <character_name>\n```",
	run: (client,message,args)=>{
		//If there's no argument, return
		if(!args[0]){
			message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
			return;
		}
		//Stores arguments separated by underscores in arg
		const arg=args.join("_").toLowerCase();
		//Stores link to character portrait in link
		const link=`https://www.smashbros.com/assets_v2/img/fighter/${arg}/main.png`;
		//If the link isn't successful (200<=HTTP status<=299), return
		if(!isGoodLink(link)){
			message.channel.send("Bad link!\nERROR: TRY PUTTING A REAL SMASH CHARACTER IN! (use the full character name, like banjo AND kazooie)\n```\nb!get-smashrender banjo and kazooie\n```");
			return;
		}
		//Creates preset embed, adds portrait as image, adds title, and link to the portrait
		const embed=embedInit()
			.setImage(link)
			.setTitle(`Render for: "${arg}"`) 
			.addFields(
				{name: "Image link", value:`[CLICK HERE BITCH!](${link})`}
			);
		//Returns embed
		message.channel.send({embeds: [embed]});
		return;
	}
}