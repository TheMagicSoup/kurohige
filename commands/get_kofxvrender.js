const { EmbedBuilder } = require("discord.js");
const { XMLHttpRequest } = require("xmlhttprequest");
exports.run=(client,message,args)=>{
	let arg=args[0];
	if(!arg){
		message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
		return;
	}
	arg=arg.toLowerCase();
	const link=`https://www.snk-corp.co.jp/us/games/kof-xv/characters/img/character_${arg}.png`;
	const isValid = (url) => {
		let http=new XMLHttpRequest();
		http.open("HEAD",url,false);
		http.send();
		return http.status!=404;
	}
	if(!isValid(link)){
		message.channel.send("ERROR: TRY PUTTING A REAL KOFXV CHARACTER IN! (underscores between words)");
		return;
	}
	const embed=new EmbedBuilder()
		.setColor(0x000000)
		.setImage(link)
		.setTitle(`Render for: "${arg}"`)
		.addFields(
			{name: "Image link", value:`[CLICK HERE BITCH!](${link})`}
		);
	message.channel.send({embeds: [embed]});
}
exports.name="get_kofxvrender";
exports.description="Command for getting KOFXV character renders\nTakes one argument, a character name";
exports.command_usage=("```\nb!get_kofxvrender <character name>\n```");