import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineBar extends Component {
  

  static defaultProps = {

    displayTitle: true,
    //legend settings
    displayLegend: false,
    legendPosition: 'right',
    //responsive: true,

    //location:'City'
  }

  render() {
    return (
      <div className="line">
        <Line
          data={this.props.lineData}
          options={{
            fill: false,
            display: true,
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

export default LineBar;