import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteShop } from '../../../../state/actions/shopActions';
import { pushHistory } from '../../../../state/actions/historyActions';

class AShopRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + '-' + month + '-' + dt;
  };

  handleEdit = (id) => {
    this.props.pushHistory(`/admin/shop/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteShop(id);
  };

  render() {
    const { shop, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{shop.name}</td>
        <td>{shop.busLicenseId}</td>
        <td>{shop.city}</td>
        <td>{shop.url}</td>
        <td>{shop.phone}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(shop.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(shop.id)}
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

export default connect(null, { deleteShop, pushHistory })(AShopRow);
