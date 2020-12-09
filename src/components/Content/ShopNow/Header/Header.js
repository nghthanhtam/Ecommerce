import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModal } from '../../../../state/actions/modalActions'
import { getCartsByIdUser } from '../../../../state/actions/cartActions'

const mapStateToProps = (state) => ({
  user: state.authUser.user,
  userToken: state.authUser.token,
  totalCount: state.cart.totalCount,
  isLoaded: state.cart.isLoaded
});

class Header extends React.Component {
  state = {
    header: 'sheader',
    left: 0,
    hideSearchBar: 'hidden',
    cartWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0d1136',
      padding: '8px',
      borderRadius: '7px',
      backgroundColor: 'transparent'
    },
    isLogoText: false,
    // logo: {
    //   width: '150px',
    //   height: '150px',
    //   transition: '0.75s',
    // },
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setHeader()
    const { getCartsByIdUser, user, userToken } = this.props
    if (userToken) getCartsByIdUser({ limit: 1000, page: 1, idUser: user.id })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setHeader = () => {
    if (window.scrollY > 10) {
      this.setState({ header: 'header1' });
      this.setState({
        cartWrapper: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0d1136',
          padding: '8px',
          borderRadius: '7px',
        }
      });
      this.setState({ isLogoText: true })

      this.setState({ hideSearchBar: 'visible' });
    } else {
      this.setState({ header: 'sheader' });
      this.setState({ hideSearchBar: 'hidden' });
      this.setState({ isLogoText: false })
      this.setState({
        cartWrapper: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0d1136',
          padding: '8px',
          borderRadius: '7px',
          backgroundColor: 'transparent'
        }
      });

    }
  }

  handleScroll = () => {
    this.setHeader();
    this.setState({
      left: (-window.scrollY * 0.5).toString() + 'px',
    });
  };

  render() {
    const { hideSearchBar, cartWrapper, isLogoText } = this.state;
    const { user, totalCount, isLoaded } = this.props

    return (
      <div className={this.state.header}>
        <Link className="logo" to="/shopnow">
          {isLogoText ? 'ShopNow' :
            <div style={logo}>
              <img style={{ width: '100%', height: '100%' }} src="../img/logo.png" alt="ava" />
            </div>}
        </Link>

        <div
          className="searchbar"
          style={{
            marginLeft: '50px',
            width: '50%',
            height: '48px',
            visibility: hideSearchBar,
          }}
          className="ui action input">
          <button style={searchBtn} className="ui icon button">
            <i className="search icon"></i>
          </button>
          <input
            style={searchInput}
            type="text"
            placeholder="Nhập từ khóa tìm kiếm ..."
          />
        </div>
        <ul className="row-flex-center">
          <li>
            <Link className="item" to="/shopnow/user/laterlist">
              <div style={itemIcon}>
                <i className="fa fa-heart"></i>
              </div>
              <div>Mua sau</div>
            </Link>
          </li>
          <li>
            <Link style={cartWrapper} className="item" to="/shopnow/checkout/cart">
              <div style={{ color: 'white' }}>Giỏ hàng</div>
              {!totalCount ? <div style={cartInfor}>0</div> : <div style={cartInfor}>{totalCount}</div>}
            </Link>
          </li>
          <li>
            {user ?
              <Link className="item" to="/shopnow/user/account">
                <div style={itemIcon}>
                  <i className="fa fa-user"></i>
                </div>
                <div>Tài khoản</div>
              </Link> :
              <Link onClick={() => this.props.showModal({ show: true, modalName: 'login' })} className="item">
                <div style={{ marginTop: '5px' }}>Join</div>
              </Link>}
          </li>

          <li>
            <Link className="item" to="/">
              <div style={itemIcon}>
                <i className="fa fa-question-circle"></i>
              </div>
              <div>Hỗ trợ</div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, { showModal, getCartsByIdUser })(Header);

const searchBtn = {
  background: '#f5f5f5',
  borderRadius: '20px 0 0 20px',
};
const searchInput = {
  background: '#f5f5f5',
  border: 'none',
  borderRadius: '0 20px 20px 0',
};
const itemIcon = {
  width: '28px',
  height: '28px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '13px',
};
const cartInfor = {
  marginLeft: '5px',
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid white',
  width: '17px',
  height: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '13px',
};
const cartWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0d1136',
  padding: '8px',
  borderRadius: '7px',
};
const cartWrapper1 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0d1136',
  padding: '8px',
  borderRadius: '7px',
  backgroundColor: 'transparent',
};
const logo = {
  width: '150px',
  height: '150px',
  transition: '0.75s'
}