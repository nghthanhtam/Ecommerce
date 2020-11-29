import React from "react";
import "../../../../assets/css/user-profile.css";
import history from "../history";
import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';

class ProfileItem extends React.Component {
  state = {}

  render() {
    let { item, selectedItem, pushHistory } = this.props;

    return (
      <div
        onClick={() => {
          pushHistory(item.link, { selectedItem: item.link });
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

export default connect(null, { pushHistory })(ProfileItem);
