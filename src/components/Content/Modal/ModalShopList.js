import React, { Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { getShops } from "../../../state/actions/shopActions";
import "./modal.css";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
  shops: state.shop.shops,
});

class ModalShopList extends Component {
  state = {
    cancelReason: "",
    msg: null,
    inputErrors: false,
  };

  componentDidMount() {
    this.props.getShops({ limit: 1000, page: 1 });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { details, showModal, updateOrder } = this.props;
    const { cancelReason } = this.state;

    if (details) {
      const newOrder = details.order;
      newOrder.status = "canceled";
      newOrder.cancelReason = cancelReason;
      updateOrder(newOrder);
      showModal({ show: false });
      window.location.reload();
    }
  };

  render() {
    const { showModal } = this.props;
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
            <h2 className="login-box-msg">Các nhà bán khác</h2>
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

            <div className="shoplist-wrapper">
              <div className="ava-reply">
                <img src="./img/ava.png" alt="ava" />
              </div>
              <div className="shoplist-infor">
                <h4>Tiki notTrading</h4>
                <p style={{ fontSize: "17px" }}>150,000đ</p>
              </div>
              <button
                className="btn btn-default"
                onClick={() => showModal({ show: false })}
              >
                {" "}
                Chọn
              </button>
            </div>
            <div className="shoplist-wrapper">
              <div className="ava-reply">
                <img src="./img/ava.png" alt="ava" />
              </div>
              <div className="shoplist-infor">
                <h4>Tiki notTrading</h4>
                <p style={{ fontSize: "17px" }}>150,000đ</p>
              </div>
              <button
                className="btn btn-default"
                onClick={() => showModal({ show: false })}
              >
                {" "}
                Chọn
              </button>
            </div>
            <div className="shoplist-wrapper">
              <div className="ava-reply">
                <img src="./img/ava.png" alt="ava" />
              </div>
              <div className="shoplist-infor">
                <h4>Tiki notTrading</h4>
                <p style={{ fontSize: "17px" }}>150,000đ</p>
              </div>
              <button
                className="btn btn-default"
                onClick={() => showModal({ show: false })}
              >
                {" "}
                Chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, showModal, getShops })(
  ModalShopList
);
