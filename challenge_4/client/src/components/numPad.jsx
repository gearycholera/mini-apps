import React from 'react';
import ReactDOM from 'react-dom';

class NumPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var pad = [];
    for (var i = 0; i < 11; i++) {
      var numID = `${i}`;
      pad.push(<button id={numID} key={numID} onClick={this.props.handleClick}>{numID} pins</button>)
    }

    return (
      <div>
        {pad}
      </div>
    )
  }
}

export default NumPad;