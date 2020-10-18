import React from 'react';
import mongoose from 'mongoose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addShop } from '../../../../actions/shopActions';
import './Register.css';

const mapStateToProps = (state) => ({
  shop: state.shop,
});

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="regsc-container">
        <div className="reg-card">
          <div className="reg-ava">
            <img src="./img/spiderman.png" alt="ava" />
          </div>

          <div>
            <p className="reg-title">Cảm ơn bạn đã lựa chọn ShopNow</p>
            <h3>Thân chào bạn</h3>
            <p>
              Bạn đã hoàn thành quy trình đăng ký bán hàng trên shopnow.vn.
              <br />
              Thông tin đăng nhập chi tiết
            </p>
            <div className="row-flex">
              <h4>Tài khoản:</h4>
              <div>hahaha</div>
            </div>
            <p>
              Hãy bấm vào đường dẫn phía dưới để đăng nhập vào tài khoản bán
              hàng của bạn.
            </p>
          </div>

          <button className="btn btn-primary" type="submit">
            Đăng nhập để bán hàng
          </button>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  addShop: PropTypes.func.isRequired,
  //isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { addShop })(Register);
