import React, {Component} from "react";
import Login from './../../box/Login';
import TextToVoice from './../../box/TextToVoice';
import NotFound from '../../box/NotFound';
import Analytcs from './../../box/Analytcs';
import auth from '../service/AuthenticateService'

class PrivateContainer extends Component {

    constructor(props)
    {
        super(props);
        this.path = props.location.pathname;
        this.state = { component: null }
    };

    async componentDidMount()
    {
        this.setState({ component:await this.getRender()})
    }

    async getRender()
    {
       try
       {
            if(await auth.isLoged())
            {
                switch (this.path)
                {
                    //case "/alice/text-to-voice" : return <TextToVoice/>
                    case "/alice/analytcs": return <Analytcs/>
                    default : return <NotFound/>;
                }
            }
            else
            {
                return <Login/>
            }
       
       }
       catch(e)
       {
            console.log("page not found")
            return <NotFound/>
       }
    }

    render()
    {
        return this.state.component
    };
}

export default PrivateContainer;