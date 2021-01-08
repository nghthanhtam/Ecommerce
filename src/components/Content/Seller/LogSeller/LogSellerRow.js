import React, { Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";

class ALogLogSellerRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return (
      dt +
      "/" +
      month +
      "/" +
      year +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getMilliseconds()
    );
  };

  render() {
    const { logSeller, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{logSeller.action}</td>
        <td>{logSeller.actionDetail}</td>
        <td>{logSeller.username}</td>
        <td>{this.convertDate(logSeller.createdAt)}</td>
      </tr>
    );
  }
}

export default connect(null, { pushHistory })(ALogLogSellerRow);
