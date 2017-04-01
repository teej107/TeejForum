/**
 * Created by tanner on 3/21/17.
 */
module.exports = {
    formatTime: formatTime,
    validate: validate,
    Error: Error
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
    this.sendResponse = function (res, status = 400)
    {
        res.status(status).send(this);
    };
}

function validate(errorCb, obj)
{
    if (!obj && errorCb instanceof Object)
    {
        obj = errorCb;
        errorCb = null;
    }

    var missingArgs = [];
    for (var key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
            if (!obj[key])
            {
                missingArgs.push(key);
            }
        }
    }
    if (missingArgs.length > 0)
    {
        var err = new Error('missing keys', missingArgs);
        if (errorCb)
        {
            errorCb(err);
        }
        return err;
    }
}