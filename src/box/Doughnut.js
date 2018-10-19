import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'Data1',
		'Data2'
	],
	datasets: [{
		data: [53.7, 47.3],
		backgroundColor: [
		'green',
		'red'
		],
		hoverBackgroundColor: [
		'green',
		'red'
		]
	}]
};

export default React.createClass({
  displayName: 'DoughnutExample',

  render() {
    return (
      <div>
        <b>Analytcs</b>
        <Doughnut data={data} />
      </div>
    );
  }
});