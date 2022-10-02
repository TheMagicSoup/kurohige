//Imports
const isGoodLink = require("./modules/isGoodLink.js");
//Defining module properties
module.exports = {
    name: "get-opwiki",
    description: "Fetches One Piece wiki page for specific subject",
    aliases: ["fetch-opwiki","opwiki"],
    command_usage: "Takes one argument, a subject on the wiki\n```\nb!get-opwiki Monkey D. Luffy\n```",
    run: (client, message, args) => {
        //If there's no argument, return
        if(!args[0]){
            message.channel.send("YOU AREN'T EVEN LOOKING UP ANYTHING: ADD A SUBJECT TO LOOK UP!");
            return;
        }
        //Makes first char of each element of args uppercase
        for(let i=0;i<args.length;i++){
            if(args[i]=="no")continue;
            args[i]=args[i].charAt(0).toUpperCase()+args[i].slice(1);
        }
        //Stores arguments separated by underscores in arg
        const arg=args.join("_");
        console.log(arg);
        //Stores URL to argument's wiki page in link
        const link=`https://onepiece.fandom.com/wiki/${arg}`;
        //If the link isn't successful (200<=HTTP status<=299), return
        if(!isGoodLink(link)){
            message.channel.send("Bad entry! Remember to write them correct!\n```\nb!get-opwiki monkey d. luffy\n```");
            return;
        }
        //Returns link
        message.channel.send(link);
        return;
    }
}