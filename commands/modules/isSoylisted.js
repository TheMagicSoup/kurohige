//Imports
const { readFileSync } = require("fs");
//Defining module, accepting 1 paramter
module.exports = (entry) => {
    //Defining soylist
    var soylist;
    try{
        //Stores contents of soylist.json as string in jsonString
        const jsonString=readFileSync("./commands/json_files/soylist.json","utf-8");
        //Parses contents of jsonString and stores returned Object in data
        const data = JSON.parse(jsonString);
        //Stores data's soylist array in soylist
        soylist=data.soylist;
    } catch (error) {
        //Logs error if one occurs
        console.log(error);
    }
    //Returns whether entered user ID is present in the soylist
    return JSON.stringify(soylist).includes(entry);
}