import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { updateOrder } from "../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
});

class ModalCancel extends Component {
  state = {
    cancelReason: "",
    msg: null,
    inputErrors: false,
  };

  validateCancelReason = (fullname) => {
    return !new RegExp(
      /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
    ).test(fullname);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let msg = "";

    //Validation
    let isPassed = true;
    isPassed = this.validateCancelReason(value);
    const inputErrors = isPassed ? false : true;
    if (!isPassed) msg = "Bạn chỉ được nhập chữ cái, số và gạch dưới";

    if (value === "") msg = "";
    this.setState({ [name]: value, msg, inputErrors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { details, showModal, updateOrder, user, idShop } = this.props;
    const { cancelReason } = this.state;

    if (details) {
      const newOrder = {
        ...details.order,
        status: "canceled",
        cancelReason: cancelReason,
        type: "user",
        id: details.order.id,
        idUser: user.id,
        pages: details.pages ? details.pages : {},
      };

      // newOrder.status = "canceled";
      // newOrder.cancelReason = cancelReason;
      // newOrder.type = "user";
      // newOrder.id = details.order.id;
      // newOrder.idUser = user.id;
      // if(details.pages) newOrder.pages = details.pages
      updateOrder(newOrder);
      showModal({ show: false });
      //window.location.reload()
    }
  };

  render() {
    const { cancelReason, inputErrors } = this.state;
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
            <h3 className="login-box-msg">Lý do hủy đơn hàng </h3>
            {details && <p>{details.msg}</p>}
            {this.state.msg ? (
              <div className="alert alert-danger alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                  onClick={() => showModal({ show: false })}
                >
                  ×
                </button>
                {this.state.msg}
              </div>
            ) : null}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <input
                  type="text"
                  name="cancelReason"
                  className="form-control"
                  placeholder="Lý do hủy đơn"
                  required
                  value={cancelReason}
                  onChange={this.handleChange}
                />
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                    disabled={!inputErrors ? false : true}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-default btn-block btn-flat"
                    disabled={!this.state.inputErrors ? false : true}
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
  updateOrder,
})(ModalCancel);
