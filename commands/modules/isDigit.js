//Defining module, accepting 1 parameter
module.exports = (value) => {
    //Returns whether the value is in digit format or not
    return /^[0-9]+$/.test(value);
}