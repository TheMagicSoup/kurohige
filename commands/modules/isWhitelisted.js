const { readFileSync } = require("fs");
module.exports = (entry) => {
    var whitelist;
    try{
        const jsonString=readFileSync("./commands/json_files/whitelist.json","utf-8");
        const data = JSON.parse(jsonString);
        whitelist=data.whitelist;
    } catch (error) {
        console.log(error);
    }
    return JSON.stringify(whitelist).includes(entry);
}