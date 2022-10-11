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
	//Defining module
module.exports = () => {
    //Stores a random number between 0 and 19
    const randomNumber = Math.floor(Math.random() * 20);
    /*
    * 20 different responses, chosen based on random number, returns response
    * There are 10 positive responses, 5 indefinite responses and 5 negative responses
    * Fetched responses from Wikipedia
     */
    //Defines response
    const response="```\n";
    switch (randomNumber) {
        case 0:
            response += "It is certain";
        case 1:
            response += "It is decidedly so";
        case 2:
            response += "Without a doubt.";
        case 3:
            response += "Yes, definitely";
        case 4:
            response += "You may rely on it.";
        case 5:
            response += "As I see it, yes.";
        case 6:
            response += "Most likely.";
        case 7:
            response += "Outlook good.";
        case 8:
            response += "Yes.";
        case 9:
            response += "Signs point to yes.";
        case 10:
            response += "Reply hazy, try again.";
        case 11:
            response += "Better not tell you now.";
        case 12:
            response += "Better not tell you now.";
        case 13:
            response += "Cannot predict now.";
        case 14:
            response += "Concentrate and ask again.";
        case 15:
            response += "Don't count on it.";
        case 16:
            response += "My reply is no.";
        case 17:
            response += "My sources say no.";
        case 18:
            response += "Outlook not so good.";
        case 19:
            response += "Very doubtful.";
        default:
            response += "ERROR IN MAGIC!";
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
