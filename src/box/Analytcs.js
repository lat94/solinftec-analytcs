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
import LineBar from '../service/component/LineBar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Analytcs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bar: null,
            doughnut: null,
            multBar: null,
            lineBar: null

        }
    };

    componentWillMount() {

        LoggerService.getAllLogs()
            .then(response => {
                this.setState({ logs: response });
                this.getChartBarData();
                this.getChartDoughnutData();
            });


        this.loadChartPerOwner({});
    };

    componentDidMount() {

    };

    loadChartPerOwner({ owner = "vanguarda_eng" }) {

        LoggerService.getLogsBy(owner)
            .then(response => {
                this.setState({ logsOwner: response })
                this.getChartMultBarData(response);
                this.getChartLineData(response);
            });

        LoggerService.getLogsUserByProcess(owner)
            .then(response => {
                this.setState({ logsUserByProcess: response })
                //this.getChartLineData(response);
            });
    }

    //load the items of the select
    loadMenuItem() {
        if (!!this.state.logs) {
            let owners = Array.from(new Set(this.state.logs.map(item => item.owner)));
            return owners.map((owner, index) => <MenuItem value={owner} primaryText={owner} />);
        }
    }

    //watch changes in the select
    handleChange = (event, index, value) => {
        console.log("==");
        console.log(event, index, value);
        console.log("============");

        this.setState({ value });
        this.loadChartPerOwner({ "owner": value });
    }


    //generate random RGBA
    _dynamicColors = () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = 0.7;
        return `rgba(${r},${g},${b},${a})`;
    };

    //return c colors
    _setColors = (c) => {
        let colors = [];
        for (let index = 0; index < c; index++) {
            colors.push(this._dynamicColors());
        }
        return colors;
    }



    //single dataset
    getChartBarData() {

        let filter = "";

        let owners = Array.from(new Set(this.state.logs.map(item => item.owner).filter(item => item != undefined)));
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
        let filter = "";

        let processes = Array.from(new Set(this.state.logs.map(item => item.process).filter(item => item != undefined)));
        console.log("=====processes=========");
        console.log(processes);
        console.log("===============");


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



    getChartMultBarData(response) {
        let filter = "";     

        let logsUserByProcess = this.state.logsUserByProcess;
        let users = Array.from(new Set(response.map(item => item.user).filter(item => item != undefined)));
        let usersByProcess = Array.from(new Set(logsUserByProcess.map(it => it.user).filter(item => item != undefined)))
        let processes =  Object.keys(logsUserByProcess[0].process);
        let result  = []        

        processes.forEach(prc => 
        {
            let item = 
            { 
                label: prc,
                backgroundColor: this._dynamicColors(),
                data: [ ] 
            };

            usersByProcess.forEach(user =>
            {
                logsUserByProcess.filter(it => it.user == [user])
                        .forEach(person => item.data.push(person.process[prc]));
            });
        
            result.push(item);
        });      

        let data =
        {
            labels: users,
            datasets: result

        }

        let chart = <MultBar
            multBarData={data}
            text="Processos por usuário"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
            backgroundColor='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ multBar: chart })
    }


    getChartLineData(response) {
        let predefinedDates = {};

        let filter = "";
        let values = []

        let daysRange = Array.from(response.map(item => item.day_range).filter(item => item != undefined));
        let processes = Array.from(new Set(response.map(item => item.process).filter(item => item != undefined)));

        //make a method
        predefinedDates.thisMonth = daysRange.filter(item => item == (30 || 31 || 29 || 28)).length;
        predefinedDates.lastWeek = daysRange.filter(item => item == 7).length;
        predefinedDates.lastTwoDays = daysRange.filter(item => item == 2).length;
        predefinedDates.yesterday = daysRange.filter(item => item == 1).length;
        predefinedDates.today = daysRange.filter(item => item == 0).length;

        let lineLabel = Array.from(Object.keys(predefinedDates));
        let lineDataSet = Object.keys(predefinedDates).map(item => predefinedDates[item]);

        let data =
        {
            labels: lineLabel,

            //add more dataset to have() more bars (i.e. for each process)
            datasets: [{
                backgroundColor: this._setColors(1),
                data: lineDataSet,
            }]
        }



        let chart = <LineBar
            lineData={data}
            text="Processo mais pedido por data"
            legendPosition="bottom"
            color='rgba(95, 174, 95, 0.6)'
            backgroundColor='rgba(95, 174, 95, 0.6)'
        />

        this.setState({ lineBar: chart })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <div style={{ width: 'auto', flexDirection: 'row' }}>
                    <div id='barChart' style={{ marginRight: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.bar}
                    </div>
                    <div id="doughnutChart" style={{ marginLeft: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.doughnut}
                    </div>
                </div>
                <div style={{ width: 'auto', flexDirection: 'row' }}>
                    <div style={{ width: 'auto', flexDirection: 'row', width: '90%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        <SelectField
                            style={{ float: "left" }}
                            floatingLabelText="Owner"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {this.loadMenuItem()}
                        </SelectField>
                    </div>

                    <div id='multBarChart' style={{ marginRight: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>

                        {this.state.multBar}
                    </div>
                    <div id='lineChart' style={{ marginLeft: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.lineBar}
                    </div>

                </div>


            </div>
        );
    }

}

export default Analytcs;