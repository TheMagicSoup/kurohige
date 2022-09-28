//Imports
const embedInit = require("./modules/embedInit.js");
const isGoodLink = require("./modules/isGoodLink.js");
//Defining module properties
module.exports = {
	name: "get_kofxvrender",
	description: "Command for getting KOFXV character renders.",
	command_usage: "Takes one argument, a character name\n```\nb!get_kofxvrender <character name>\n```",
	run: (client,message,args)=>{
		//If there are no arguments, return
		if(!args[0]){
			message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
			return;
		}
		//Stores arguments separated by underscores, converted to underscores in arg
		const arg=args.join("_").toLowerCase();
		//Stores link to character portrait in link
		const link=`https://www.snk-corp.co.jp/us/games/kof-xv/characters/img/character_${arg}.png`;
		//If the link isn't successful (200<=HTTP status<=299), return
		if(!isGoodLink(link)){
			message.channel.send("ERROR: TRY PUTTING A REAL KOFXV CHARACTER IN!");
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