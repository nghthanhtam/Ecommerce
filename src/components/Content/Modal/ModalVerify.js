import React, { Component } from "react";
import { showModal } from "../../../state/actions/modalActions";
import { connect } from "react-redux";

class ModalVerify extends Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div
          className="login-box"
          style={{
            background: "#fff",
            padding: "0 40px 40px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          <div className="verify-img">
            <img src="./img/emailconfirm.png" alt="ava" />
          </div>
          <h2>Xác nhận email của bạn!</h2>
          <div>Một tin nhắn xác nhận đã được gửi đến email mà bạn đăng ký</div>
          <div>Hãy truy cập vào hòm thư điện tử để xác nhận nhé</div>
          <div style={{ marginTop: "10px" }}>
            <a
              className="verify-btnhome"
              onClick={() => this.props.showModal({ show: false })}
              href="/shopnow"
            >
              Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { showModal })(ModalVerify);
