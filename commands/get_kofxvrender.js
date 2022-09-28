const embedInit = require("./modules/embedInit.js");
const isGoodLink = require("./modules/isGoodLink.js");
module.exports = {
	name: "get_kofxvrender",
	description: "Command for getting KOFXV character renders.",
	command_usage: "Takes one argument, a character name\n```\nb!get_kofxvrender <character name>\n```",
	run: (client,message,args)=>{
		let arg=args.join("_");
		if(!arg){
			message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
			return;
		}
		arg=arg.toLowerCase();
		const link=`https://www.snk-corp.co.jp/us/games/kof-xv/characters/img/character_${arg}.png`;
		if(!isGoodLink(link)){
			message.channel.send("ERROR: TRY PUTTING A REAL KOFXV CHARACTER IN!");
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