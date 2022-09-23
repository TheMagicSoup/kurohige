const { EmbedBuilder } = require("discord.js");
const { XMLHttpRequest } = require("xmlhttprequest");
exports.run=(client,message,args)=>{
	let arg=args[0];
	if(!arg){
		message.channel.send("YOU FORGOT THE FUCKING CHARACTER NAME!");
		return;
	}
	arg=arg.toLowerCase();
	const link=`https://www.smashbros.com/assets_v2/img/fighter/${arg}/main.png`;
	const isValid = (url) => {
		let http=new XMLHttpRequest();
		http.open("HEAD",url,false);
		http.send();
		return http.status!=404;
	}
	if(!isValid(link)){
		message.channel.send("ERROR: TRY PUTTING A REAL SMASH CHARACTER IN! (underscores between words like \"pokemon_trainer\")\n```\nb!get_smashrender dark_samus\n```");
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
exports.name="get_smashrender";
exports.description="Command for getting Smash Bros. character renders\nTakes one argument, a character name";