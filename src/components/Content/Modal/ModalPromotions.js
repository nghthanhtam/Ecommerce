import React, { Component } from "react";
import { connect } from "react-redux";

import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { updateOrder } from "../../../state/actions/orderActions";
import "./modal.css";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
});

class ModalPromotions extends Component {
  state = {
    cancelReason: "",
    msg: null,
    inputErrors: false,
    idPromo: "",
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

  showMoreInfor = (idPromo) => {
    if (this.state.idPromo !== "") this.setState({ idPromo: "" });
    else this.setState({ idPromo });
  };

  pickPromo = (discountAmount) => {
    this.props.showModal({ show: false });
    this.props.details.pickPromo(discountAmount);
  };

  componentDidMount() {
    console.log(this.props.details);
  }

  render() {
    const { showModal, details } = this.props;
    const { idPromo } = this.state;
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "20px 5px 20px 5px",
            width: "400px",
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
          <div className="promo-modal">
            <h3 className="login-box-msg">Mã khuyến mãi đây nhé!</h3>
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
              </div>
            ) : null}
            {details.promotions.length == 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                Bạn hiện không có mã giảm giá nào
              </div>
            )}
            {details.promotions.map((p, index) => {
              return (
                <div key={index} className="voucher-wrapper">
                  <div className="col-flex">
                    <div className="infor-voucher">
                      <div className="voucher-infor">
                        <h2>{p.couponCode} </h2>
                        <p>Hạn sử dụng {this.convertDate(p.timeEnd)}</p>
                      </div>
                      <div
                        className="more-infor"
                        onClick={() => this.showMoreInfor(p.id)}
                      >
                        i
                      </div>
                      {p.isValid ? (
                        <button
                          className="btn btn-default"
                          onClick={() => this.pickPromo(p)}
                        >
                          Chọn
                        </button>
                      ) : (
                        <button
                          className="btn btn-default"
                          disabled
                          style={{ color: "orange" }}
                        >
                          Chưa thỏa điều kiện
                        </button>
                      )}
                    </div>
                    {idPromo !== "" && idPromo == p.id && (
                      <div className="info-det">{p.name}</div>
                    )}
                  </div>
                </div>
              );
            })}
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
})(ModalPromotions);
