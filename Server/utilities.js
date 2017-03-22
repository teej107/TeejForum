/**
 * Created by tanner on 3/21/17.
 */
module.exports = {};

Date.prototype.currentTime = function ()
{
    return (this.getMonth() + 1) + "/" + this.getDate() + "/" + this.getFullYear() + " " + this.getHours() + ":" +
        this.getMinutes() + ":" + this.getSeconds();
};