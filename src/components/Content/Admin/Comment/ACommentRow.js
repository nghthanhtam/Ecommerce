import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteComment,
  updateCommentStatus,
} from "../../../../state/actions/commentActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class ACommentRow extends Component {
  state = {
    statuses: [
      { value: "accepted", label: "Duyệt" },
      { value: "declined", label: "Không duyệt" },
    ],
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  handleDelete = (id) => {
    this.props.deleteComment(id);
  };

  render() {
    const { comment, index } = this.props;
    const { statuses } = this.state;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{comment.idUser}</td>
        <td>
          <div style={{ fontWeight: "500" }}>{comment.Rating.title}</div>
          {comment.Rating.review}
        </td>
        <td>{comment.content}</td>
        <td>{this.convertDate(comment.createdAt)}</td>
        <td>
          <div className="btn-group">
            <div className="btn-group">
              <button type="button" className="btn btn-info">
                Duyệt
              </button>
              <button
                type="button"
                className="btn btn-info dropdown-toggle"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {statuses.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      this.props.updateCommentStatus({
                        id: comment.id,
                        status: item.value,
                      });
                      window.location.reload();
                    }}
                  >
                    <a href="javascript:void(0);"> {item.label} </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => this.handleDelete(comment.id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, {
  deleteComment,
  pushHistory,
  updateCommentStatus,
})(ACommentRow);
