import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DoughnutBar extends Component {
    

    static defaultProps = {

        displayTitle: true,
        //legend settings
        displayLegend: true,
        legendPosition: 'right',
        responsive: true,

        //location:'City'
    }

    render() {
        return (
            <div className="doughnut">
                <Doughnut
                    data={this.props.doughnutData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.props.text,
                            fontSize: 18
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