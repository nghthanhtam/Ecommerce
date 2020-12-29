import React, { Component } from "react";

class ModalAddressAdd extends Component {
  state = {};

  render() {
    return (
      <div className="modal-wrapper">
        <div
          className="login-box"
          style={{
            background: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          <h2>Phiên đã hết hạn</h2>
          <div>Phiên đăng nhập của bạn đã kết thúc.</div>
          <div>Hệ thống sẽ tự động đăng xuất.</div>
        </div>
      </div>
    );
  }
}

export default ModalAddressAdd;
