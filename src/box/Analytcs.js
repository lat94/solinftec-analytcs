import React, { Component } from "react";
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import "./../style/css/index.css";
import RaisedButton from 'material-ui/RaisedButton';
import router from '../service/router/History';
import DoughnutExample from './Doughnut';
import Bar from './Bar';

class Analytcs extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    componentDidMount() {

    };



    render() {
        return (
            <div style={{ width: 'auto', margin: 'auto', textAlign: 'center', paddingTop: '2%', display: 'inline' }}>
                <div style={{ width: '30%', display:'flex' }}>
                    <Bar />
                </div>
                <div style={{ width: '30%', display:'flex' }}>
                    <DoughnutExample />
                    
                </div>

            <RaisedButton label="volta" onClick={() => router.push('/')} primary={true} />

                
            </div>
        )
    };
}

export default Analytcs;