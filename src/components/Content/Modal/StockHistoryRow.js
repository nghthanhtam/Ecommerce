import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStockHis } from "../../../state/actions/stockHistoryActions";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";

class StockHistoryRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + "-" + month + "-" + dt;
  };

  handleEdit = (id) => {
    this.props.showModal({
      show: true,
      modalName: "modalUpdateQty",
      details: {
        id,
        pages: this.props.pages,
      },
    });
  };

  handleDelete = (id) => {
    this.props.deleteStockHis(id);
  };

  render() {
    const { stockHis, index, pages } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{stockHis.amount}</td>
        <td>{stockHis.total}</td>
        <td>{stockHis.idEmployee}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(stockHis.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(stockHis.id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteStockHis, pushHistory, showModal })(
  StockHistoryRow
);
