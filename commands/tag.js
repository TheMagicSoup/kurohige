//Imports
const { readFileSync } = require("fs");
//Defining module properties
module.exports = {
    name: "tag",
    description: "Posts tagged message",
    command_usage: "Takes one argument, a tag\n```\nb!tag <tag name>\n```",
    run: (client, message, args) => {
        //If no argument is provided, return
        if(!args[0]){
            message.channel.send("YOU DIDN'T ASK FOR A SPECIFIC TAG!");
            return;
        }
        //Stores arguments separated by spaces & converted to lowercase in arg
        const arg=args.join(" ").toLowerCase();
        //Defines jsonData
        var jsonData;
        try{
            //Stores contents of tags.json as a string in jsonString
            const jsonString=readFileSync("./commands/json_files/tags.json","utf-8");
            //Parses jsonString and stores it as an Object in jsonData
            jsonData=JSON.parse(jsonString);
        }catch(error){
            //Returns error if one occurs
            console.log(error);
        }
        //If the tag provided doesn't exist, return
        if(!JSON.stringify(jsonData).includes(arg)){
            message.channel.send("THAT TAG HASN'T BEEN DEFINED!");
            return;
        }
        //Stores that tag's message in response
        const response=jsonData[arg].message;
        //Returns response
        message.channel.send(response);
    }
}