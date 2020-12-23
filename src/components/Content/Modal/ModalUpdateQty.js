import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { showModal } from "../../../state/actions/modalActions";
import {
  addStockHis,
  updateStockHis,
} from "../../../state/actions/stockHistoryActions";

const mapStateToProps = (state) => ({
  employee: state.auth.employee,
  details: state.modal.details,
  token: state.auth.token,
});

class ModalUpdateQty extends Component {
  state = {
    price: 0,
    total: 0,
    amount: 0,
    inputErrors: false,
    msg: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name == "amount") this.setState({ total: value * this.state.price });
    if (name == "price") this.setState({ total: value * this.state.amount });
  };

  componentDidMount() {
    if (this.props.details.id) {
      const { details, token } = this.props;
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/${details.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          let { amount, price, idEmployee } = res.data;
          this.setState({
            amount,
            price,
            total: price * amount,
            amount,
            idEmployee,
          });
        })
        .catch((er) => console.log(er.res));
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { amount, price } = this.state;
    const {
      employee,
      details,
      addStockHis,
      updateStockHis,
      showModal,
    } = this.props;
    let newItem = {};
    newItem = {
      amount,
      price,
      idEmployee: employee.id,
      idProductVar: details.pages.idProductVar,
      pages: details.pages,
    };
    if (details.id) {
      newItem.id = details.id;
      updateStockHis(newItem);
    } else {
      addStockHis(newItem);
    }

    showModal({
      show: false,
      modalName: "modalStockHis",
      details: details.pages,
    });
  };

  render() {
    const { amount, price, total } = this.state;
    const { details } = this.props;

    return (
      <div className="modal-wrapper1">
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ marginTop: "60px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <span>
                <h3 className="modal-title" id="exampleModalLongTitle">
                  Nhập kho {" - "} {details.name}
                </h3>
              </span>
              <span>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  ×
                </button>
              </span>
            </div>
            <div className="modal-body">
              {this.state.msg ? (
                <div className="alert alert-danger alert-dismissible">
                  {this.state.msg}
                </div>
              ) : null}
              {/* <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <label className="col-form-label">Thời gian:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  value={createdAt}
                  onChange={this.onChange}
                />
              </div> */}
              <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <label htmlFor="amount" className="col-form-label">
                  Số lượng:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Nhập số lượng cần thêm vào kho..."
                  name="amount"
                  value={amount}
                  onChange={this.onChange}
                />
              </div>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <label htmlFor="price" className="col-form-label">
                  Giá nhập:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Nhập giá tiền..."
                  name="price"
                  value={price}
                  onChange={this.onChange}
                />
              </div>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <label htmlFor="total" className="col-form-label">
                  Thành tiền:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="total"
                  disabled
                  name="total"
                  value={total}
                  placeholder="0 VND"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() =>
                  this.props.showModal({
                    show: false,
                    modalName: "modalStockHis",
                    details: { pages: details.pages },
                  })
                }
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
                disabled={
                  !this.state.inputErrors && this.state.name !== ""
                    ? false
                    : true
                }
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  showModal,
  addStockHis,
  updateStockHis,
})(ModalUpdateQty);
