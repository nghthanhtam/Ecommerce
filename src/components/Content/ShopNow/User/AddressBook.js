import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";
import { connect } from "react-redux";
import {
  addAddress,
  updateAddress,
  getAddresses,
  deleteAddress,
} from "../../../../state/actions/addressActions";
import { showModal } from "../../../../state/actions/modalActions";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserProfile from "./UserProfile";
import ModalAddressAdd from "../../Modal/ModalAddressAdd";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    show: state.modal.show,
    modalName: state.modal.modalName,
    user: state.authUser.user,
    isLoaded: state.address.isLoaded,
    addresses: state.address.addresses,
  };
};

class AddressBook extends React.Component {
  state = {
    header: "header",
    picLink: "./img/blue.png",
    section: "section-blue",
    left: 0,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const { getAddresses, user } = this.props;
    getAddresses({ limit: 1000, page: 1, idUser: user.id, type: "user" });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 10) {
      this.setState({ header: "header1" });
    } else {
      this.setState({ header: "header" });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + "px",
    });
  };

  render() {
    const { show, modalName, showModal, addresses, deleteAddress } = this.props;
    return (
      <div>
        <Header />
        {show && (modalName == "addressAdd" || modalName == "addressEdit") && (
          <ModalAddressAdd />
        )}
        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="nohome-section"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <UserProfile selectedLink="/shopnow/user/address-book" />

            <div className="acc-container">
              <div
                className="edit-text"
                onClick={() =>
                  showModal({ show: true, modalName: "addressAdd" })
                }
              >
                + Thêm địa chỉ
              </div>
              {addresses.map((item, index) => {
                return (
                  <div key={index} className="address-det">
                    <div className="address-box">
                      <p className="add-name">{item.fullname}</p>
                      <div className="add">
                        <p className="add1">Địa chỉ:</p>
                        <p>
                          {" "}
                          {item.numberAndStreet +
                            ", " +
                            item.Ward.ward +
                            ", " +
                            item.Ward.District.district +
                            ", " +
                            item.Ward.District.City.city}
                        </p>
                      </div>
                      <div className="row-flex">
                        <p className="tel1">Điện thoại:</p>
                        <p>{item.phone}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div
                        className="edit-text"
                        onClick={() =>
                          showModal({
                            show: true,
                            modalName: "addressEdit",
                            details: { id: item.id },
                          })
                        }
                      >
                        Chỉnh sửa
                      </div>
                      <div
                        className="edit-text"
                        onClick={() => deleteAddress(item.id)}
                      >
                        Xóa
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  showModal,
  addAddress,
  updateAddress,
  getAddresses,
  deleteAddress,
})(AddressBook);
