import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMovie } from "../../../../state/actions/movieActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class AMovieRow extends Component {
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
      pathname: "/admin/movie/edit",
      search: `?id=${id}`,
    });
  };

  handleDelete = (id) => {
    this.props.deleteMovie(id);
  };

  render() {
    const { movie } = this.props;

    return (
      <tr>
        <td>{movie.idMovieType}</td>
        <td>{movie.name}</td>
        <td>{movie.couponCode}</td>
        <td>
          {this.convertDate(movie.timeStart)}-{this.convertDate(movie.timeEnd)}
        </td>
        <td>{movie.minAmount}</td>
        <td>{movie.maxDiscount}</td>
        <td>{movie.percentage}%</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(movie.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(movie.id)}
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

export default connect(null, { deleteMovie, pushHistory })(AMovieRow);
