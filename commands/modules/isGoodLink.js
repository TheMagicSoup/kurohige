//Imports
const { XMLHttpRequest } = require("xmlhttprequest");
//Defining module, accepting 1 paramter
module.exports = (url) => {
    //Creates new XMLHTTPRequest() instance
    const http = new XMLHttpRequest();
    //Opens URL & sends a HTTP request
    http.open("HEAD",url,false);
    http.send();
    /**Returns whether the HTTP status is successful
     * Successful statuses are 200-299
     */
    return http.status>199&&http.status<300;
}