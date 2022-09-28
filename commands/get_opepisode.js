//Imports
const embedInit=require("./modules/embedInit.js");
const isGoodLink=require("./modules/isGoodLink.js");
//Defining module properties
module.exports={
    name: "get_opepisode",
    description: "Fetches a desired one piece episode!",
    command_usage: "Takes one argument, an episode number\n```\nb!get_opepisode <episode number>\n```",
    run: (client, message, args) => {
        //If the argument isn't a digit, return
        if(!(/^[0-9]+$/.test(args[0]))){
            message.channel.send("ENTER A REAL NUMBER!");
            return;
        }
        //Stores episode number in arg
        const arg=args[0];
        /*
        * For some unknown reason, 9anime returns a 200 on any link,
        * So I'm checking if there's a wiki entry for the episode.
        * If the HTTP request for the wiki entry for the episode isn't successful, return
        */ 
        if(!isGoodLink(`https://onepiece.fandom.com/wiki/Episode_${arg}`)){
            message.channel.send("ENTER AN ACCEPTABLE NUMBER!\nAcceptable number: 1 to current ep. number!");
            return;
        }
        //Stores 9anime episode URL in link
        const link=`https://9anime.pl/watch/one_piece.ov8/ep-${arg}`;
        //Edits preset embed, adding a title, default image and a text link to the episode
        const embed=embedInit()
            .setTitle(`Watch One Peak episode ${arg} NOW!`)
            .setImage("https://www.barnesandnoble.com/blog/wp-content/uploads/2017/07/onepiece43-45-1.jpg")
            .addFields({name: "Episode link", value: `[CLICK HERE BITCH!](${link})`});
        //Return embed
        message.channel.send({embeds: [embed]});    
    }
}