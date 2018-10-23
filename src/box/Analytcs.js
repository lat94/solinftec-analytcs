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
import MenuItem from 'material-ui/MenuItem';


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
                this.setState({ logs: r });
                this.getChartBarData();
                this.getChartDoughnutData();
            }
            );

        this.loadMultBarChart({});
    };

    componentDidMount() {

    };

    loadMultBarChart({ owner = "amaggi" }) {
        LoggerService.getLogsBy(owner)
            .then(response => {
                this.setState({ logsOwner: response })
                this.getChartMultBarData(response);
                console.log("====response====");
                console.log(response);
                console.log("================");


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
        this.loadMultBarChart({ "owner": value });
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

        //call the endpoint
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

        console.log(data);


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
        //call the endpoint
        let filter = "";

        //criar um obj processes com o filtro de usuário, depois recuperar os usuários, e a quantidade
        //a quantidade de datasets será de acordo com a quantidade de processos        

        let users = Array.from(new Set(response.map(item => item.user).filter(item => item != undefined)));
        let processes = Array.from(new Set(response.map(item => item.process)));
        let colors = this._setColors(3);

        console.log("getChartMultBarData:response");
        console.log(response);
        console.log("============");

        let datasetList = _.map(
            _.groupBy(response, data => [data["user"]]), user =>
                _.groupBy(user, process => [process["process"]])
        );

        let datasetListNew = [];

        console.log("======datasetList=======");
        console.log(datasetList);
        console.log("============");
        datasetList.forEach((item) => {
            datasetListNew.push({
                "label": datasetList.map((item)  => item ),
                "backgroundColor": this._dynamicColors(),
                "data": Array.from(datasetList.map(item => item.length))

            })

        });

        console.log("=====datasetListNew=========");
        console.log(datasetListNew);        
        console.log("==============");

        

        let data =
        {            
            labels: users,
            //datasets: []


            datasets: [{
                label: processes[0],
                backgroundColor: colors[0],
                data: [
                    2045,
                    1230,
                    2325
                ]
            }, {
                label: processes[1],
                backgroundColor: colors[1],
                data: [
                    10,
                    2368,
                    5134

                ]
            }, {
                label: processes[2],
                backgroundColor: colors[2],
                data: [
                    986,
                    5236,
                    3521

                ]
            }]

        }

        //let select = 


        let chart = <MultBar
            multBarData={data}
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
                    <div id='barChart' style={{ marginRight: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.bar}
                    </div>
                    <div id="doughnutChart" style={{ marginLeft: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        {this.state.doughnut}
                    </div>
                </div>
                <div style={{ width: 'auto', flexDirection: 'row' }}>
                    <div id='multBarChart' style={{ marginRight: '2px', width: '80%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                        <SelectField
                            floatingLabelText="Owner"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {this.loadMenuItem()}
                        </SelectField>
                        {this.state.multBar}
                    </div>
                    <div id='anyChart' style={{ marginLeft: '2px', width: '45%', flex: 1, display: 'inline-block', backgroundColor: 'white' }}>
                    </div>

                </div>


            </div>
        );
    }

}

export default Analytcs;