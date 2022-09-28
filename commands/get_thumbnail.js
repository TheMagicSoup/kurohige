//Imports
const ytdl=require("ytdl-core");
const embedInit = require("./modules/embedInit.js");
//Defining module properties
module.exports={
	name: "get_thumbnail",
	description: "Command that pulls thumbnail for YouTube vid.",
	command_usage: "Takes one argument, a YT link\n```\nb!get_thumbnail <YouTube link>\n```",
	run: (client,message,args)=>{
		//If there's no argument provided, return
		if(!args[0]){
			message.channel.send("YOU FORGOT TO PUT A LINK");
			return;
		}
		//Stores argument in arg
		const arg=args[0];
		//If it's not a legit YouTube URL, return
		if(!ytdl.validateURL(arg)){
			message.channel.send("BAD LINK! DID YOU EVEN TRY USING A REAL LINK?");
			return;
		}
		//Stores YouTube video ID in id
		const id=ytdl.getURLVideoID(arg);
		//Stores thumbnail image in image
		const image=`https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
		//Creates preset embed, adds thumbnail as image and link to the image
		const embed = embedInit()
			.setImage(image)
			.addFields(
				{name: "Image link", value:`[CLICK HERE BITCH!](${image})`}
			);
		//Sets embed title as video title, returns embed
		ytdl.getInfo(arg).then(info => {
			let title=info.videoDetails.title;
			embed.setTitle(title);
			message.channel.send({embeds: [embed]});
		});
	}
}