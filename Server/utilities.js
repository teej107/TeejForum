/**
 * Created by tanner on 3/21/17.
 */
module.exports = {
    formatTime: formatTime,
    validate: validate
};

Date.prototype.currentTime = function ()
{
    return (this.getMonth() + 1) + "/" + formatTime(this.getDate()) + "/" + this.getFullYear() + " " +
        formatTime(this.getHours()) + ":" + formatTime(this.getMinutes()) + ":" + formatTime(this.getSeconds());
};

Object.prototype.truthy = function (obj, ifFalsy)
{
    return obj ? obj : ifFalsy;
};

function formatTime(int)
{
    return int < 10 ? '0' + int : int;
}

function Error(reason, parameters)
{
    this.error = {
        reason: reason,
    };
    if (parameters)
    {
        this.error.parameters = parameters;
    }
}

function validate(res, ...args)
{
    var missingArgs = [];
    args.forEach(function (e)
    {
        if (!e)
        {
            missingArgs.push(e);
        }
    });
    if (missingArgs.length > 0)
    {
        var err = new Error('missing keys', missingArgs);
        res.status(400).send(err);
        return err;
    }
}