const ytdl=require("ytdl-core");
const { EmbedBuilder } = require("discord.js");

exports.run=(client,message,args)=>{
	
	const arg=args[0];
	if(!arg){
		message.channel.send("YOU FORGOT TO PUT A LINK");
		return;
	}
	
	if(!ytdl.validateURL(arg)){
		message.channel.send("BAD LINK! DID YOU EVEN TRY USING A REAL LINK?");
		return;
	}
	const id=ytdl.getURLVideoID(arg);
	const image=`https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
	const embed = new EmbedBuilder()
		.setColor(0x000000)
		.setImage(image)
		.addFields(
			{name: "Image link", value:`[CLICK HERE BITCH!](${image})`}
		);
	ytdl.getInfo(arg).then(info => {
		let title=info.videoDetails.title;
		embed.setTitle(title);
		message.channel.send({embeds: [embed]});
	});
}
exports.name="get_thumbnail";
exports.description="Command that pulls thumbnail for YouTube vid\nTakes one argument, a YT link";
exports.command_usage=("```\nb!get_thumbnail <YouTube link>\n```");