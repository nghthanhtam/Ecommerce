import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAdmin } from "../../../../state/actions/adminActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class ALogAdminRow extends Component {
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
    const { logAdmin, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{logAdmin.action}</td>
        <td>{logAdmin.actionDetail}</td>
        <td>{logAdmin.username}</td>
        <td>{this.convertDate(logAdmin.createdAt)}</td>
      </tr>
    );
  }
}

export default connect(null, { deleteAdmin, pushHistory })(ALogAdminRow);
