import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      header: 'header',
      left: 0,
      hideSearchBar: 'hidden',
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY > 10) {
      this.setState({ header: 'header1' });
      this.setState({ hideSearchBar: 'visible' });
    } else {
      this.setState({ header: 'header' });
      this.setState({ hideSearchBar: 'hidden' });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + 'px',
    });
  };

  render() {
    let { hideSearchBar } = this.state;
    return (
      <div className={this.state.header}>
        <Link className="logo" to="/home">
          Logo
        </Link>

        <div
          className="searchbar"
          style={{
            marginLeft: '50px',
            width: '55%',
            height: '48px',
            visibility: hideSearchBar,
          }}
          class="ui action input"
        >
          <button style={searchBtn} class="ui icon button">
            <i class="search icon"></i>
          </button>
          <input
            style={searchInput}
            type="text"
            placeholder="Nhập từ khóa tìm kiếm ..."
          />
        </div>
        <ul className="row-flex-center">
          <li>
            <Link className="item">
              <div style={itemIcon}>
                <i className="fa fa-heart"></i>
              </div>

              <div>My Wishlist</div>
            </Link>
          </li>
          <li>
            <Link className="item" style={cartWrapper} to="/checkout/cart">
              <div style={{ color: 'white' }}>My Cart</div>
              <div style={cartInfor}>1</div>
            </Link>
          </li>
          <li>
            <Link className="item" to="/">
              <div style={itemIcon}>
                <i className="fa fa-user"></i>
              </div>
              <div>Profile</div>
            </Link>
          </li>
          <li>
            <Link className="item" to="/">
              Need Help
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;

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
