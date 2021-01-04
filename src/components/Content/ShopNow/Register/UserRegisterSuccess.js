import React, { Fragment } from "react";
import { connect } from "react-redux";
import qs from "qs";
import axios from "axios";
import "./Register.css";
import { showModal } from "../../../../state/actions/modalActions";
import Loader from "react-loader";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class RegisterSuccess extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    if (this.props.location) {
      const url = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      }).url;

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/authentication/verify?url=${url}`,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response) this.setState({ isLoaded: true });
        })
        .catch((er) => console.log(er.response));
    }
  }

  render() {
    return (
      <Fragment>
        {!this.state.isLoaded ? (
          <Loader />
        ) : (
          <div className="regsc-container">
            <div className="reg-card">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "70px",
                  width: "100%",
                }}
              >
                <p className="reg-title">Xác nhận tài khoản thành công</p>
                <div className="reg-ava">
                  <img src="./img/spiderman.png" alt="ava" />
                </div>
              </div>

              <div
                style={{
                  margin: 0,
                  padding: "0px 70px 0 70px",
                }}
              >
                {/* <p className="reg-title">Cảm ơn bạn đã lựa chọn ShopNow</p> */}
                <h3>Thân chào bạn,</h3>
                <div>
                  Bạn đã đăng ký thành công tài khoản mua hàng trên shopnow.vn.
                  <br />
                  <br />
                  Hãy bấm vào đường dẫn phía dưới để đăng nhập vào tài khoản của
                  mình
                </div>
              </div>

              <button
                style={{ marginTop: "70px" }}
                className="btn btn-primary"
                type="submit"
                onClick={() => this.props.history.push("/shopnow")}
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { showModal })(RegisterSuccess);
