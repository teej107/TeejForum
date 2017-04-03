/**
 * Created by tanner on 3/21/17.
 */
module.exports = {
    formatTime: formatTime,
    validate: validate,
    Error: Error,
    currentTime: currentTime
};

function currentTime(date = new Date())
{
    return (date.getMonth() + 1) + "/" + formatTime(date.getDate()) + "/" + date.getFullYear() + " " +
        formatTime(date.getHours()) + ":" + formatTime(date.getMinutes()) + ":" + formatTime(date.getSeconds());
}


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