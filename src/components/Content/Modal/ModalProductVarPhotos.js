import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../../state/actions/modalActions";
import "./modal.css";

const mapStateToProps = (state) => ({
  history: state.history.history,
  details: state.modal.details,
});

class ModalProductVarPhotos extends Component {
  state = {};

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { showModal, details } = this.props;
    return (
      <div className="modal-wrapper">
        <div className="photolist-box">
          <button
            onClick={() => showModal({ show: false })}
            style={{ float: "right", marginTop: "-10px" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="login-box-body">
            <h3 className="login-box-msg">Danh sách hình ảnh</h3>
            <div className="photo-box">
              {details.photos.map((photo, index) => {
                return (
                  <div key={index} className="photo-productvar">
                    <img src={photo.url} alt="photo" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { showModal })(ModalProductVarPhotos);
