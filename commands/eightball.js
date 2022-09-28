const embedInit = require("./modules/embedInit.js");
module.exports = {
    name: "eightball",
    description: "Command that gives responses to questions like a magic eightball would!\nTakes one argument: a question.",
    command_usage: "```\nb!eightball <question>\n```",
    run: (client, message, args)=>{
        const arg=args.join(" ");
        if(!arg||!arg.endsWith("?")){
			message.channel.send("YOU NEED TO ASK A QUESTION! (question must end with \"?\")");
			return;
		}
        const randomNumber = Math.floor(Math.random()*20);
        let response="";
        switch(randomNumber){
            case 0:
                response="It is certain";
                break;
            case 1:
                response="It is decidedly so";
                break;
            case 2:
                response="Without a doubt.";
                break;
            case 3:
                response="Yes, definitely";
                break;
            case 4:
                response="You may rely on it.";
                break;
            case 5:
                response="As I see it, yes.";
                break;
            case 6:
                response="Most likely.";
                break;
            case 7:
                response="Outlook good.";
                break;
            case 8:
                response="Yes.";
                break;
            case 9:
                response="Signs point to yes.";
                break;
            case 10:
                response="Reply hazy, try again.";
                break;
            case 11:
                response="Better not tell you now.";
                break;
            case 12:
                response="Better not tell you now.";
                break;
            case 13:
                response="Cannot predict now.";
                break;
            case 14:
                response="Concentrate and ask again.";
                break;
            case 15:
                response="Don't count on it.";
                break;
            case 16:
                response="My reply is no.";
                break;
            case 17:
                response="My sources say no.";
                break;
            case 18:
                response="Outlook not so good.";
                break;
            case 19:
                response="Very doubtful.";
                break;
            default:
                response="ERROR IN MAGIC!";
                break;
        }
        response="```\n"+response+"\n```";
        const embed=embedInit()
            .setTitle(arg)
            .addFields(
                {name: "🎱 says...", value: response}
            );
        message.channel.send({embeds: [embed]});
        return;
    }
}