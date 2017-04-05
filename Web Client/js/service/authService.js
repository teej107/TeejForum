/**
 * Created by tanner on 4/4/17.
 */
app.service('authService', function ()
{
   var user = null;
   this.getUser = function ()
   {
       return user;
   }
});