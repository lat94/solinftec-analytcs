import React, { Component } from 'react';
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import '../style/css/analytcs.css';
import './../style/css/index.css';
import router from '../service/router/History';
import ChartBar from '../service/component/ChartBar';
import LoggerService from '../service/service/LoggerService';
import _ from 'lodash';
import DoughnutBar from '../service/component/DoughnutBar';
import MultBar from '../service/component/MultBar';
import SelectField from 'material-ui/SelectField';


class Analytcs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bar: null,
            doughnut: null,
            multBar: null
        }
    };

    componentWillMount() {

        LoggerService.getAllLogs()
            .then(r => {
                this.setState({ logs: r })
                this.getChartBarData();
                this.getChartDoughnutData();
            }
        );

        //testing purposes
        let owner = "amaggi";
        /*LoggerService.getBy(owner)
            .then(r => {
                this.setState({ logsOwner: r })
                this.getChartMultBarData();

            }
        );*/
    };

    _dynamicColors = () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = 0.7;
        return `rgba(${r},${g},${b},${a})`;

    };

    _setColors = (c) => {
        let colors = [];
        for (let index = 0; index < c; index++) {
            colors.push(this._dynamicColors());
        }
        return colors;
    }

    //single dataset
    getChartBarData() {
        //call the endpoint
        let filter = "";

        let owners = Array.from(new Set(this.state.logs.map(item => item.owner)));
        let values = []
        owners.map(it => values.push(this.state.logs.filter(value => value.owner == it).length))


        let data =
        {
            labels: owners,
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
            barData={data}
            text="Frequência por owner"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
            backgroundColor='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ bar: chart })
    }

    //single dataset
    getChartDoughnutData() {
        //call the endpoint
        let filter = "";

        let processes = Array.from(new Set(this.state.logs.map(item => item.process)));
        debugger;
        let values = []
        processes.map(it => values.push(this.state.logs.filter(value => value.process == it).length));
        let colors = this._setColors(values.length);

        let data =
        {
            labels: processes,
            //add more dataset to have more bars (i.e. for each process)
            datasets: [
                {
                    //label: 'Population',
                    data: values,
                    backgroundColor: colors

                }
            ]
        }


        let chart = <DoughnutBar
            doughnutData={data}
            text="Processo mais acessado"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ doughnut: chart })
    }

    getChartMultBarData() {
        let owner = "amaggi";




        //call the endpoint
        let filter = "";
        let processes = []
        let owners = [];
        //criar um obj processes com o filtro de usuário, depois recuperar os usuários, e a quantidade
        //a quantidade de datasets será de acordo com a quantidade de processos

        let users = Array.from(new Set(this.state.logsOwner.map(item => item.owner)));
        owners.map(it => processes.push(this.state.logs.filter(value => value.owner == it).length));




        let data =
        {
            labels: owners,
            //add more dataset to have more bars (i.e. for each process)
            datasets: [
                {
                    //label: 'Population',
                    data: [processes],
                    backgroundColor: 'rgba(95, 174, 95, 0.6)'

                }
            ]
        }


        let chart = <MultBar
            barData={data}
            text="Processos por usuário"
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
                    <div id='barChart' style={{ marginRight: '2px', width: 600, flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.bar}
                    </div>
                    <div id="doughnutChart" style={{ marginLeft: '2px', width: 600, flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.doughnut}
                    </div>
                </div>
                <div style={{ width: 'auto', flexDirection: 'row' }}>
                    <div id='barChart' style={{ marginRight: '2px', width: 600, flex: 1, display: 'inline-block', backgroundColor: 'white' }}>        
                    {//https://v0.material-ui.com/#/components/select-field}
                        <SelectField
                            floatingLabelText="Frequency"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />                
                        {/*this.state.multBar*/}
                    </div>
                </div>


            </div>
        );
    }

}

export default Analytcs;