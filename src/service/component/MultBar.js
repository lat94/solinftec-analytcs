import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class MultBar extends Component {

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
      <div className="multBar">
        <Bar
          data={this.props.multBarData}
          options={{
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            },
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

export default MultBar;