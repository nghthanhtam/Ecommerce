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
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return 0;
  };

  changeShop = (idShop) => {
    this.props.showModal({ show: false });
    this.props.details.changeShop(idShop);
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
          }}
          className="shoplist-box"
        >
          <button
            onClick={() => this.props.showModal({ show: false })}
            style={{ float: "right" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="login-box-body">
            <h2 className="login-box-msg">Các nhà bán khác</h2>

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
