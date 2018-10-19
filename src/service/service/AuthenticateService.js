
import Auth from 'solinftec-auth-lib'
 
class AuthenticateService
{
    constructor()
    {
        //inicia auth lib
        this.helper = new Auth();
        this.helper.setOrigin('alice-marketing-voice');
    }

    removeTokenFromStorage()
    {
        localStorage.removeItem('auth-token');
    }

    getToken(form)
    {
        //remove token do storage
        this.removeTokenFromStorage()

        //buscando token
        return this.helper.getToken(form)
                          .then(token => 
                          { 
                              //salvando token no storage local
                              localStorage.setItem('auth-token',token.token)
                              return true
                          })
                          .catch(error =>
                          {
                              console.log(error)
                              throw {"erro":401}
                          });
     
    }

    isLoged()
    {
        let token = localStorage.getItem('auth-token')
        if(token)
        {
           return  this.helper.check(token)
                              .then((result) => {return result})
                              .catch((error) => {return false })
        }
        else
        {
            return false
        }
     
    }

    getLocalToken()
    {
        let token = JSON.parse(localStorage.getItem('auth-token'))
        return (token)? token : null;
    }
}
export default new AuthenticateService();


