//Imports
const embedInit=require("./modules/embedInit.js");
const isGoodLink=require("./modules/isGoodLink.js");
const isDigit=require("./modules/isDigit.js");
const getOParcImg=require("./modules/getOParcImg.js");
//Defining module properties
module.exports={
    name: "get-opepisode",
    description: "Fetches a desired One Piece episode!",
    aliases: ["fetch-opepisode","opepisode"],
    command_usage: "Takes one argument, an episode number\n```\nb!get-opepisode <episode number>\n```",
    run: (client, message, args) => {
        //If the argument isn't a digit, return
        if(!isDigit(args[0])){
            message.channel.send("ENTER A REAL EPISODE NUMBER!");
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
        //Edits preset embed, adding a title, image and a text link to the episode
        const embed=embedInit()
            .setTitle(`Watch One Peak episode ${arg} NOW!`)
            .setImage(getOParcImg("e",arg))
            .addFields({name: "Episode link", value: `[CLICK HERE BITCH!](${link})`});
        //Return embed
        message.channel.send({embeds: [embed]});    
    }
}