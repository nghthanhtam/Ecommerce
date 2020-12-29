import React, { Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { getShops } from "../../../state/actions/shopActions";
import "./modal.css";

const mapStateToProps = (state) => ({
  history: state.history.history,
  details: state.modal.details,
});

class ModalShopList extends Component {
  state = {};

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  changeShop = (idShop) => {
    this.props.showModal({ show: false });
    this.props.details.changeShop(idShop);
    this.props.history.push(
      `/shopnow/product-detail/idProduct/2/idShop/${idShop}`
    );
  };

  visitShop = (idShop, shopName) => {
    this.props.history.push(`/shopnow/shop/${idShop}/${shopName}`);
  };

  render() {
    const { showModal, details } = this.props;
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "10px",
          }}
          className="shoplist-box"
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
            {details.otherShops.map((shop) => {
              return (
                <div className="shoplist-wrapper">
                  <div className="ava-reply">
                    <img src="./img/ava.png" alt="ava" />
                  </div>
                  <div className="shoplist-infor">
                    <h4 onClick={() => this.visitShop(shop.id, shop.name)}>
                      {shop.name}
                    </h4>
                    {/* <p style={{ fontSize: "17px" }}>150,000đ</p> */}
                    <p style={{ fontSize: "17px" }}>
                      {this.convertPrice(shop.minPrice)}đ
                    </p>
                  </div>
                  <button
                    className="btn btn-default"
                    onClick={() => this.changeShop(shop.id)}
                  >
                    Chọn
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, showModal, getShops })(
  ModalShopList
);
