//Imports
const embedInit = require("./modules/embedInit.js");
//Defining module properties
module.exports = {
    name: "eightball",
    description: "Command that gives responses to questions like a magic eightball would!",
    aliases: ["8ball","magicball","eball","e-ball","8b"],
    command_usage: "Takes one argument: a question.\n```\nb!eightball <question>\n```",
    run: (client, message, args)=>{
        //Stores all arguments separated by spaces in question
        const question=args.join(" ");
        //If the argument is empty or doesn't end in a question mark, return
        if(!question||!question.endsWith("?")){
			message.channel.send("YOU NEED TO ASK A QUESTION! (question must end with \"?\")");
			return;
		}
        //Stores response as code block text
    //Stores a random number between 0 and 19
    const randomNumber = Math.floor(Math.random() * 20);
    /*
    * 20 different responses, chosen based on random number, returns response
    * There are 10 positive responses, 5 indefinite responses and 5 negative responses
    * Fetched responses from Wikipedia
     */
    var response="```\n";
    switch (randomNumber) {
        case 0:
            response += "It is certain";
			break;
        case 1:
            response += "It is decidedly so";
			break;
        case 2:
            response += "Without a doubt.";
			break;
        case 3:
            response += "Yes, definitely";
			break;
        case 4:
            response += "You may rely on it.";
			break;
        case 5:
            response += "As I see it, yes.";
			break;
        case 6:
            response += "Most likely.";
			break;
        case 7:
            response += "Outlook good.";
			break;
        case 8:
            response += "Yes.";
			break;
        case 9:
            response += "Signs point to yes.";
			break;
        case 10:
            response += "Reply hazy, try again.";
			break;
        case 11:
            response += "Better not tell you now.";
			break;
        case 12:
            response += "Better not tell you now.";
			break;
        case 13:
            response += "Cannot predict now.";
			break;
        case 14:
            response += "Concentrate and ask again.";
			break;
        case 15:
            response += "Don't count on it.";
			break;
        case 16:
            response += "My reply is no.";
			break;
        case 17:
            response += "My sources say no.";
			break;
        case 18:
            response += "Outlook not so good.";
			break;
        case 19:
            response += "Very doubtful.";
			break;
        default:
            response += "ERROR IN MAGIC!";
			break;
	}
	response+="\n```";
        //Creates pre-set embed, adding a title and a field with the pre-defined response
        const embed=embedInit()
            .setTitle(question)
            .addFields(
                {name: "🎱 says...", value: response}
            );
        //Returns embed
        message.channel.send({embeds: [embed]});
        return;
    }
}