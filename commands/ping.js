exports.run=(client,message,args)=>{
	message.channel.send("pong!").catch(console.error);
}
exports.name="ping";
exports.description="Basic ping command";
exports.command_usage=("```\nb!ping\n```");