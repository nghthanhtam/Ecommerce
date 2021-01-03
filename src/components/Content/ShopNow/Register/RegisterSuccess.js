import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Register.css";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  shopAdded: state.shop.shopAdded,
  isAdded: state.shop.isAdded,
});

const RegisterSuccess = (props) => {
  const { isAdded, shopAdded } = props;
  return (
    <Fragment>
      {isAdded && (
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
              <p className="reg-title">Cảm ơn bạn đã lựa chọn ShopNow</p>
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
                Bạn đã hoàn thành quy trình đăng ký bán hàng trên shopnow.vn.
                <br />
                <div className="reg-acc-infor">
                  <div>Tài khoản đăng nhập của bạn là:</div>
                  <div style={{ fontWeight: "600", marginLeft: "5px" }}>
                    {shopAdded.owner.username}
                  </div>
                </div>
                <br />
                Hãy bấm vào đường dẫn phía dưới để đăng nhập vào tài khoản bán
                hàng của bạn và bắt đầu kinh doanh.
              </div>
            </div>
            <Link to="/seller/login">
              <button
                style={{ marginTop: "70px" }}
                className="btn btn-primary"
                type="submit"
              >
                Đăng nhập để bán hàng
              </button>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

RegisterSuccess.propTypes = {
  shopAdded: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(RegisterSuccess);
