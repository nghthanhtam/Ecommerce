import React from "react";
import "../../../../assets/css/user-profile.css";
import ProfileItem from "./ProfileItem";

class UserProfile extends React.Component {

  state = {
    profileItemList: [
      { name: "Thông tin khách hàng", link: "/user/account" },
      { name: "Quản lý đơn hàng", link: "/sales/order/history" },
      { name: "Sổ địa chỉ", link: "/user/address-book" },
      { name: "Nhận xét sản phẩm đã mua", link: "/user/review" },
      { name: "Sản phẩm mua sau", link: "/user/laterlist" },
      { name: "Sản phẩm yêu thích", link: "/user/wishlist" },
      { name: "Sản phẩm đã xem", link: "/user/watchlist" },
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
