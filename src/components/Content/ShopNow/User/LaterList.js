import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";
import { connect } from "react-redux";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LaterListDetail from "./LaterListDetail";
import UserProfile from "./UserProfile";
import { getLaterlists } from "../../../../state/actions/laterListActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  laterLists: state.laterList.laterLists,
  isLoaded: state.laterList.isLoaded,
  user: state.authUser.user,
});

class LaterList extends React.Component {
  state = {
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    limit: 5,
    page: 1,
    pages: [],
    start: 1,
    end: 5,
    isNextBtnShow: true,
    profileItemList: [
      { name: "Thông tin khách hàng" },
      { name: "Sản phẩm mua sau" },
    ],
  };

  componentDidMount() {
    const { getLaterlists, user } = this.props;
    getLaterlists({ limit: 1000, page: 1, idUser: user.id });
  }
  render() {
    const {} = this.state;
    const { isLoaded, laterLists } = this.props;

    return (
      <div>
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="nohome-section"></div>
          {isLoaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <UserProfile selectedLink="/shopnow/user/laterlist" />
              <div className="later-order-list">
                {laterLists.map((item) => {
                  return <LaterListDetail key={item.id} item={item} />;
                })}
              </div>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, { getLaterlists })(LaterList);
