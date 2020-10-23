import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addShop } from '../../../../state/actions/shopActions';
import './Register.css';
import { Link } from 'react-router-dom';

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
            <h3>Thân chào bạn,</h3>
            <div>
              Bạn đã hoàn thành quy trình đăng ký bán hàng trên shopnow.vn.
              <br />
              <div className="reg-acc-infor">
                <div>Tài khoản đăng nhập của bạn là:</div>
                <div style={{ fontWeight: '600', marginLeft: '5px' }}>
                  TamNHTT
                </div>
              </div>
              <br />
              Hãy bấm vào đường dẫn phía dưới để đăng nhập vào tài khoản bán
              hàng của bạn và bắt đầu kinh doanh.
            </div>
          </div>
          <Link to="/login">
            <button
              style={{ marginTop: '20px' }}
              className="btn btn-primary"
              type="submit"
            >
              Đăng nhập để bán hàng
            </button>
          </Link>
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
