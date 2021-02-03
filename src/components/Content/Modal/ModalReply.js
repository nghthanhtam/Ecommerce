import React, { Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { addComment } from "../../../state/actions/commentActions";
import { addAnswer } from "../../../state/actions/answerActions";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
});

class ModalReply extends Component {
  state = {
    replyContent: "",
    msg: null,
    inputErrors: false,
  };

  validate = (value) => {
    return !new RegExp(
      /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
    ).test(value);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let msg = "";

    //Validation
    let isPassed = true;
    //isPassed = this.validate(value);
    const inputErrors = isPassed ? false : true;
    if (!isPassed) msg = "Bạn chỉ được nhập chữ cái, số và gạch dưới";

    this.setState({ [name]: value, msg, inputErrors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { showModal, user, details, addComment, addAnswer } = this.props;
    const { replyContent } = this.state;
    console.log(details);
    if (details.type == "comment") {
      const newReply = {
        idRating: details.idRating,
        idUser: user.id,
        content: replyContent,
      };
      addComment(newReply);
    } else {
      const newReply = {
        idQuestion: details.idQuestion,
        idUser: user.id,
        answer: replyContent,
      };
      addAnswer(newReply);
    }

    showModal({ show: false });
  };

  render() {
    const { replyContent, inputErrors } = this.state;
    const { showModal } = this.props;
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "20px 20px 20px 20px",
            transition: "opacity 0.5s linear",
          }}
          className="login-box"
        >
          <button
            onClick={() => this.props.showModal({ show: false })}
            style={{ float: "right", marginTop: "-10px" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="login-box-body">
            <h3 className="login-box-msg">Phản hồi của ShopNow </h3>

            {this.state.msg ? (
              <div className="alert alert-danger alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                  onClick={() => showModal({ show: false })}
                >
                  ×
                </button>
                {this.state.msg}
              </div>
            ) : null}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <textarea
                  type="text"
                  name="replyContent"
                  className="form-control"
                  placeholder="Nội dung phản hồi"
                  required
                  value={replyContent}
                  onChange={this.handleChange}
                />
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                    disabled={!inputErrors ? false : true}
                  >
                    Gửi
                  </button>
                  <button
                    className="btn btn-default btn-block btn-flat"
                    disabled={!this.state.inputErrors ? false : true}
                    onClick={() => showModal({ show: false })}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  pushHistory,
  showModal,
  addComment,
  addAnswer,
})(ModalReply);
