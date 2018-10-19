import React, { Component } from 'react';
import './../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import '../style/css/analytcs.css';
import './../style/css/index.css';
import router from '../service/router/History';
import Chart from '../service/component/Chart';

class Analytcs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {}
        }
    };

    componentWillMount() {
        //call method to populate chart

        this.getChartData();

    };

    getChartData() {
        //call the endpoint
        let owner = ["owner1", "owner2"];
        let accessByOwner = [1563, 1336];
        this.setState({
            chartData: {
                labels: [owner[0], owner[1]],
                //add more dataset to have more bars (i.e. for each process)
                datasets: [
                    {
                        //label: 'Population',
                        data: [
                            accessByOwner[0],
                            accessByOwner[1]
                        ],
                        backgroundColor: [
                            'rgba(95, 174, 95, 0.6)',
                            'rgba(195, 217, 195, 0.6)'
                        ]
                    }
                ]
            }
        });

    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <div style={{ width: 'auto' }}>
                    <div style={{ width: 400, flex: 1, flexDirection: 'row' }}>
                        <Chart
                            chartData={this.state.chartData}
                            text="Frequência por owner"
                            legendPosition="bottom"
                        /*width={150}
                        height={150}*/
                        />
                    </div>
                    <div style={{ width: 400, flex: 1, flexDirection: 'row' }}>
                        <Chart
                            chartData={this.state.chartData}
                            text="Quantidade de processo por usuário"
                            legendPosition="bottom"
                        /*width={150}
                        height={150}*/
                        />
                    </div>

                </div>


            </div>
        );
    }

}

export default Analytcs;