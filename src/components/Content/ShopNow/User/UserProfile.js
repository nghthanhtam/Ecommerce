import React from "react";
import "../../../../assets/css/user-profile.css";
import { pushHistory } from "../../../../state/actions/historyActions";
import { logout } from "../../../../state/actions/authUserActions";
import { connect } from "react-redux";

class UserProfile extends React.Component {
  state = {
    profileItemList: [
      { name: "Thông tin khách hàng", link: "/shopnow/user/account" },
      { name: "Quản lý đơn hàng", link: "/shopnow/sales/order/history" },
      { name: "Sổ địa chỉ", link: "/shopnow/user/address-book" },
      { name: "Nhận xét sản phẩm đã mua", link: "/shopnow/user/review" },
      { name: "Sản phẩm mua sau", link: "/shopnow/user/laterlist" },
      // { name: "Sản phẩm đã xem", link: "/shopnow/user/watchlist" },
    ],
  };

  logout = () => {
    this.props.logout();
  };

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) this.pushHistory("/shopnow");
  }

  render() {
    const { profileItemList, selectedLink } = this.state;
    // let selectedItem = !this.props.selectedItem.location.state
    //   ? ""
    //   : this.props.location.state.selectedItem;

    return (
      <div className="pro-list">
        {profileItemList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                console.log(item);
                this.props.pushHistory(item.link);
              }}
              className={
                item.link === this.props.selectedLink
                  ? "pro-item-selected"
                  : "pro-item"
              }
            >
              <div>{item.name}</div>
              <i className="fa fa-angle-right"></i>
            </div>
          );
        })}
        {/* <div className="pro-item">
          <div>Thông tin thanh toán</div>
          <i className="fa fa-angle-right"></i>
        </div> */}
        <div onClick={this.logout} className="pro-item">
          <div>Đăng xuất</div>
        </div>
      </div>
    );
  }
}

export default connect(null, { pushHistory, logout })(UserProfile);
