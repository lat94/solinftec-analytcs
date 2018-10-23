import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class MultBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multBarData: props.multBarData
    }
  }

  static defaultProps = {

    displayTitle: true,
    //legend settings
    displayLegend: false,
    legendPosition: 'right',
    //location:'City'
  }

  render() {
    return (
      <div className="multBar">
        <Bar
          data={this.state.multBarData}
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

export default MultBar;