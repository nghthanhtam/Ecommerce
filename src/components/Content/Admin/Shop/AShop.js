import React, { Component, Fragment } from "react";
import ADoneList from "./Tab/ADoneList";
import APendingList from "./Tab/APendingList";
import { connect } from "react-redux";
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS,
} from "react-redux-notify";
import { Notify } from "react-redux-notify";

const mySuccessNotification = {
  message: "Dữ liệu cập nhật thành công!",
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 2000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

const mapStateToProps = (state) => ({
  shops: state.shop.shops,
  isLoaded: state.shop.isLoaded,
  totalDocuments: state.shop.totalDocuments,
  isUpdated: state.shop.isUpdated,
});

class AShop extends Component {
  state = {
    block: <APendingList />,
  };

  onTabClick = (name) => {
    if (name == "pending") this.setState({ block: <APendingList /> });
    else if (name == "done") this.setState({ block: <ADoneList /> });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isUpdated !== prevProps.isUpdated && this.props.isUpdated) {
      const { createNotification } = this.props;
      createNotification(mySuccessNotification);
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <Notify position="BottomRight" />
        </div>
        <section className="content-header">
          <h1></h1>
          <ol className="breadcrumb" style={{ float: "right" }}>
            <li>
              <a href="/admin">
                <i className="fa fa-dashboard" /> Trang chủ
              </a>
            </li>
            <li>
              <a href="/admin/shop">Nhà bán</a>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li onClick={() => this.onTabClick("pending")} className="active">
                <a href="#pendinglist" data-toggle="tab">
                  Nhà bán chờ duyệt
                </a>
              </li>
              <li onClick={() => this.onTabClick("done")}>
                <a href="#list" data-toggle="tab">
                  Nhà bán đang hoạt động
                </a>
              </li>
            </ul>
            <div className="tab-content">{this.state.block}</div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { createNotification })(AShop);
