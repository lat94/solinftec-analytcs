import React, { Component } from 'react';
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import '../style/css/analytcs.css';
import './../style/css/index.css';
import router from '../service/router/History';
import ChartBar from '../service/component/ChartBar';
import LoggerService from '../service/service/LoggerService';
import _ from 'lodash';

class Analytcs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bar: null,
            multBar: null
        }
    };

    componentWillMount() {

        LoggerService.getAllLogs()
            .then(r => {
                this.setState({ logs: r })
                this.getChartBarData();
            })

        LoggerService.getAllLogs()
            .then(r => {
                this.setState({ logs: r })
                this.getChartMultBarData();
            })


    };


    //single dataset
    getChartBarData() {
        //call the endpoint
        let filter = "";

        let owner = Array.from(new Set(this.state.logs.map(item => item.owner)));
        debugger;
        let values = []
        owner.map(it => values.push(this.state.logs.filter(value => value.owner == it).length))


        let data =
        {
            labels: owner,
            //add more dataset to have more bars (i.e. for each process)
            datasets: [
                {
                    //label: 'Population',
                    data: values,
                    backgroundColor: 'rgba(95, 174, 95, 0.6)'

                }
            ]
        }


        let chart = <ChartBar
            chartData={data}
            text="Frequência por owner"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
            backgroundColor='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ bar: chart })
    }

    //mult dataset
    getChartMultBarData() {
        //call the endpoint
        let filter = "";

        let owner = Array.from(new Set(this.state.logs.map(item => item.owner)));
        debugger;
        let values = []
        owner.map(it => values.push(this.state.logs.filter(value => value.owner == it).length))


        let data =
        {
            labels: owner,
            //add more dataset to have more bars (i.e. for each process)
            datasets: [
                {
                    //label: 'Population',
                    data: values,
                    backgroundColor: 'rgba(95, 174, 95, 0.6)'

                }
            ]
        }


        let chart = <ChartBar
            chartData={data}
            text="Frequência por owner"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
            backgroundColor='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ multBar: chart })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <div style={{ width: 'auto', flexDirection: 'row' }}>
                    <div style={{ width: 600, flex: 1, display: 'inline-block' }}>
                        {this.state.bar}
                    </div>
                    <div style={{ width: 600, flex: 1, display: 'inline-block' }}>
                        {this.state.multBar}
                    </div>
                </div>


            </div>
        );
    }

}

export default Analytcs;