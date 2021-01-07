import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMovieCate } from "../../../../state/actions/movieCateActions";

class AMovieCateRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  handleEdit = (id) => {
    this.props.history.push({
      pathname: "/admin/moviecate/edit",
      search: `?id=${id}`,
    });
  };

  handleDelete = (id) => {
    this.props.deleteMovieCate(id);
  };

  render() {
    const { movieCate } = this.props;

    return (
      <tr>
        <td>{movieCate.name}</td>
        <td>{movieCate.description}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(movieCate.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(movieCate.id)}
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

export default connect(null, { deleteMovieCate })(AMovieCateRow);
