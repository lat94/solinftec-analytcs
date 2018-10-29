import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import router from './../service/router/History';
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import "./../style/css/index.css";
import auth from './../service/service/AuthenticateService'
 
class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {response:0}
    }

    makeLogin = async () =>
    {
        //buscando do servico
        try
        {
            await auth.getToken(this.getLoginForm())
                      .then(token => 
                      {
                          console.log(token)
                          router.push('/solinftec/analytcs'); 
                      })
                      .catch(error =>
                      {
                          this.setState({'response':401});
                      });
        }
        catch(e)
        {
            this.setState({'response':401});
        }
    };

    getLoginForm= () =>
    {
        return {
                 login:this.login.input.value,
                 password:this.password.input.value,
                 owner:"bomfuturo_dev"
               }
    };


    getResponse = (response) =>
    {
        switch (response)
        {
            case 0 :
                return "";
            case 401:
                return (
                          <div className="home-ysnp"/>
                       );
            default :
                return "";

        }

    };

    homeToLogin = () =>
    {
        return(
                <div  style={{width: '30%', margin: 'auto', textAlign: 'center', paddingTop: '2%'}}>
               
                <h3 className="title">Welcome to Solinftec Analytcs</h3>

                <div className="home-logo"/>

                <TextField
                    hintText="login"
                    floatingLabelText="Login"
                    type="text"
                    fullWidth={true}
                    onKeyPress={ (e) =>{this.setState({'response':0});}}
                    ref={(input) => {this.login = input;}}
                />
                <TextField
                    hintText="password"
                    floatingLabelText="Password"
                    type="password"
                    fullWidth={true}
                    onKeyPress={ (e) =>
                        {
                            if (e.key === 'Enter')
                            {
                                this.makeLogin()
                            }
                            else
                            {
                                this.setState({'response':0});
                            }
                        }
                    }
                    ref={(input) => {this.password = input;}}
                />
                <br/>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <RaisedButton label="Login"
                                  onClick={() => this.makeLogin()}
                                  primary={true}/>
                </div>
                <br/>
                <br/>
                {this.getResponse(this.state.response)}
            </div>
        );
    };

    render()
    {
        return (this.homeToLogin());
    };
}

export default Login;
