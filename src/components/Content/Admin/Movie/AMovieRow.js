import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMovie } from "../../../../state/actions/movieActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  permissionAdmins: state.authAdmin.permissions,
});

class AMovieRow extends Component {
  handleEdit = (id) => {
    this.props.history.push({
      pathname: "/admin/movie/edit",
      search: `?id=${id}`,
    });
  };

  handleDelete = (id) => {
    this.props.deleteMovie(id);
  };

  render() {
    const { movie, permissionAdmins } = this.props;

    return (
      <tr>
        <td>{movie.MovieCat.name}</td>
        <td>{movie.name}</td>
        <td>{movie.author}</td>
        {(permissionAdmins.includes("editMovie") ||
          permissionAdmins.includes("deleteMovie")) && (
          <td>
            <div className="btn-group">
              {permissionAdmins.includes("editMovie") && (
                <button
                  onClick={() => this.handleEdit(movie.id)}
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              )}
              {permissionAdmins.includes("deleteMovie") && (
                <button
                  onClick={() => this.handleDelete(movie.id)}
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

export default connect(mapStateToProps, { deleteMovie, pushHistory })(
  AMovieRow
);
