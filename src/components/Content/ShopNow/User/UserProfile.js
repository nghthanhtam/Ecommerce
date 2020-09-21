import React from "react";

import "../../../../assets/css/user-profile.css";

import ProfileItem from "./ProfileItem";

class UserProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profileItemList: [
        { name: "Thông tin khách hàng", link: "/user/account" },
        { name: "Quản lý đơn hàng", link: "/user/order-his" },
        { name: "Sổ địa chỉ", link: "/user/address-book" },
        { name: "Nhận xét sản phẩm đã mua", link: "/user/review" },
        { name: "Sản phẩm mua sau", link: "/user/later-list" },
        { name: "Sản phẩm yêu thích", link: "/user/wishlist" },
        { name: "Sản phẩm đã xem", link: "/user/watchlist" },
      ],
    };
  }

  render() {
    let { profileItemList } = this.state;
    let selectedItem = !this.props.selectedItem.location.state
      ? ""
      : this.props.selectedItem.location.state.selectedItem;

    return (
      <div className="pro-list">
        {profileItemList.map((item, index) => {
          return (
            <ProfileItem key={index} item={item} selectedItem={selectedItem} />
          );
        })}

        <div className="pro-item">
          <div>Thông tin thanh toán</div>
          <i className="fa fa-angle-right"></i>
        </div>
      </div>
    );
  }
}

export default UserProfile;
