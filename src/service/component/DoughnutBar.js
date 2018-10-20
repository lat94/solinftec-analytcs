import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DoughnutBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doughnutData: props.doughnutData
        }
    }

    static defaultProps = {

        displayTitle: true,
        //legend settings
        displayLegend: true,
        legendPosition: 'right',
        //location:'City'
    }

    render() {
        return (
            <div className="doughnut">
                <Doughnut
                    data={this.state.doughnutData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.props.text,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}

                />
            </div>
        )
    }
}

export default DoughnutBar;