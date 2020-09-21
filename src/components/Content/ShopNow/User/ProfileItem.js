import React from "react";
import "../../../../assets/css/user-profile.css";
import history from "../history";

class ProfileItem extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let { item, selectedItem } = this.props;

    return (
      <div
        onClick={() => {
          history.push(item.link, { selectedItem: item.link });
        }}
        className={
          selectedItem === item.link ? "pro-item-selected" : "pro-item"
        }
      >
        <div>{item.name}</div>
        <i className="fa fa-angle-right"></i>
      </div>
    );
  }
}

export default ProfileItem;
