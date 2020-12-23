import React, { Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { updateShippingFee } from "../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
});

class ModalShippingFee extends Component {
  state = {
    shippingFee: "",
    estimatedDeliveryTime: "",
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + "-" + month + "-" + dt;
  };

  componentDidMount() {
    console.log(this.props.details);
  }
  handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { details, showModal, updateShippingFee } = this.props;
    const { shippingFee, estimatedDeliveryTime } = this.state;

    if (details) {
      const newOrder = {
        shippingFee,
        type: details.type,
        estimatedDeliveryTime,
        id: details.id,
        pages: details.pages ? details.pages : {},
      };
      updateShippingFee(newOrder);
      showModal({ show: false });
    }
  };

  render() {
    const { shippingFee, estimatedDeliveryTime } = this.state;
    const { showModal, details } = this.props;
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "20px 20px 20px 20px",
            transition: "opacity 0.5s linear",
          }}
          className="login-box"
        >
          <button
            onClick={() => this.props.showModal({ show: false })}
            style={{ float: "right", marginTop: "-10px" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="login-box-body">
            <h3 className="login-box-msg">Cập nhật phí vận chuyển </h3>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <input
                  type="number"
                  name="shippingFee"
                  className="form-control"
                  placeholder="Phí vận chuyển"
                  required
                  value={shippingFee}
                  onChange={this.handleChange}
                  style={{ paddingRight: "10px" }}
                />
              </div>
              <div className="form-group has-feedback">
                <input
                  type="date"
                  name="estimatedDeliveryTime"
                  className="form-control"
                  placeholder="Ngày giao hàng dự kiến"
                  required
                  min={this.convertDate(details.createdAt)}
                  value={estimatedDeliveryTime}
                  onChange={this.handleChange}
                  style={{ paddingRight: "5px" }}
                />
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                    disabled={
                      shippingFee !== "" && estimatedDeliveryTime !== ""
                        ? false
                        : true
                    }
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-default btn-block btn-flat"
                    onClick={() => showModal({ show: false })}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  pushHistory,
  showModal,
  updateShippingFee,
})(ModalShippingFee);
