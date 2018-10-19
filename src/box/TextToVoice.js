import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import "./../style/css/index.css";
import RaisedButton from 'material-ui/RaisedButton';

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
                
                <h3 className="title">Text to voice</h3>
                <br/>
                <br/>
                <br/>
                <div className="voice-logo"/>
                <br/>
                <br/>
                <br/>

                <TextField
                    id="text-to-voice"
                    label="Text to voice"
                    multiLine={true}
                    fullWidth={true}
                    rowsMax={10}
                    defaultValue="Informe aqui o texto"/>

                <div style={{textAlign: 'center',paddingTop: '20%'}}>
                    <RaisedButton label="gerar audio" primary={true}/>
                </div>
            </div>
        )
    };
}

export default Voice;