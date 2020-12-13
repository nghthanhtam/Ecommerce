import React from "react";
import "../../../../assets/css/user-profile.css";
import ProfileItem from "./ProfileItem";

class UserProfile extends React.Component {

  state = {
    profileItemList: [
      { name: "Thông tin khách hàng", link: "/shopnow/user/account" },
      { name: "Quản lý đơn hàng", link: "/shopnow/sales/order/history" },
      { name: "Sổ địa chỉ", link: "/shopnow/user/address-book" },
      { name: "Nhận xét sản phẩm đã mua", link: "/shopnow/user/review" },
      { name: "Sản phẩm mua sau", link: "/shopnow/user/laterlist" },
      { name: "Sản phẩm yêu thích", link: "/shopnow/user/wishlist" },
      { name: "Sản phẩm đã xem", link: "/shopnow/user/watchlist" },
    ],
  };

  componentDidMount() {
    // console.log(this.props.selectedItem)
  }
  render() {
    let { profileItemList } = this.state;
    // let selectedItem = !this.props.selectedItem.location.state
    //   ? ""
    //   : this.props.location.state.selectedItem;
    let selectedItem = {}

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
