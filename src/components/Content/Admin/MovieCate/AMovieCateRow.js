import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMovieCate } from "../../../../state/actions/movieCateActions";

const mapStateToProps = (state) => ({
  permissionAdmins: state.authAdmin.permissions,
});

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
    const { movieCate, permissionAdmins } = this.props;

    return (
      <tr>
        <td>{movieCate.name}</td>
        <td>{movieCate.description}</td>
        {(permissionAdmins.includes("editMovieCategory") ||
          permissionAdmins.includes("deleteMovieCategory")) && (
          <td>
            <div className="btn-group">
              {permissionAdmins.includes("editMovieCategory") && (
                <button
                  onClick={() => this.handleEdit(movieCate.id)}
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              )}
              {permissionAdmins.includes("deleteMovieCategory") && (
                <button
                  onClick={() => this.handleDelete(movieCate.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Xóa
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }
}

export default connect(mapStateToProps, { deleteMovieCate })(AMovieCateRow);
