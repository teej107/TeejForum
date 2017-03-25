/**
 * Created by tanner on 3/25/17.
 */
function getFile(...files)
{
    var value = 'js';
    files.forEach(function (e)
    {
        value += '/' + e;
    })
    return value;
}

function getDirectiveFile(...files)
{
    return getFile('directive', ...files);
}

function getServer()
{
    return 'http://localhost:3000';
}