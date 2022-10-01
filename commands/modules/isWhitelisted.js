//Imports
const { readFileSync } = require("fs");
//Defining module, accepting 1 paramter
module.exports = (entry) => {
    //Defining whitelist
    var whitelist;
    try{
        //Stores contents of whitelist.json as string in jsonString
        const jsonString=readFileSync("./commands/json_files/whitelist.json","utf-8");
        //Parses contents of jsonString and stores returned Object in data
        const data = JSON.parse(jsonString);
        //Stores data's whitelist array in whitelist
        whitelist=data.whitelist;
    } catch (error) {
        //Logs error if one occurs
        console.log(error);
    }
    //Returns whether entered user ID is present in the whitelist
    return JSON.stringify(whitelist).includes(entry);
}