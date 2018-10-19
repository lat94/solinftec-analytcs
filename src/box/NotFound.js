import React, {Component} from "react";
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import "./../style/css/index.css";
import RaisedButton from 'material-ui/RaisedButton';
import router from './../service/router/History';

class Voice extends Component {

    constructor(props)
    {
        super(props);
        this.state = { };
    };

    componentDidMount()
    {
        
    };

    render()
    {
        return (
            <div style={{width: '30%', margin: 'auto', textAlign: 'center', paddingTop: '2%'}}>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3 className="title">NOT FOUND</h3>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="alien-not-found"/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <RaisedButton label="volta" onClick={() => router.push('/') }  primary={true}/>
            </div>
        )
    };
}

export default Voice;