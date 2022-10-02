//Defining module properties
module.exports= {
	name: "ping",
	description: "Basic ping command",
	aliases: ["p!ng","posdad"],
	command_usage: "```\nb!ping\n```",
	run: (client,message,args)=>{
		//Return "pong!", if there's an error, return it to console
		message.channel.send("pong!").catch(console.error);
	}
}