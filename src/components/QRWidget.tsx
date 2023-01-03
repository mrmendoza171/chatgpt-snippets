

import React from "react";
import QRCode from "qrcode.react";

class QRWidget extends React.Component {
  state = {
    value: "",
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <QRCode value={this.state.value} />
      </div>
    );
  }
}

export default QRWidget;