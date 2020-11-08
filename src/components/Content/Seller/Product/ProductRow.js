import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../../state/actions/productActions';
import { pushHistory } from '../../../../state/actions/historyActions';
import UpdateQtyModal from './UpdateQtyModal';

class ProductRow extends Component {
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
    this.props.pushHistory(`/product/edit/${id}`);
  };

  render() {
    const { name, SKU, price, id, status } = this.props.product;
    const { index, isPending } = this.props

    return (
      <tr>
        <td>{index + 1}</td>
        <td><img src="./img/banner.png" alt="" border='3' height='100' width='200' /> {SKU}</td>
        <td>{name}</td>
        <td>{SKU}</td>
        <td >{price}</td>
        <td>22</td>
        {!isPending ? <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>
            <UpdateQtyModal name={name} />
          </div>
        </td> : status === 1 ?
            <td style={{ color: 'green' }}>
              <i style={{ color: '#52c41a' }} className="fa fa-check-circle" aria-hidden="true"></i> Đã duyệt
            </td > :
            <td style={{ color: 'grey' }}>
              <i style={{ color: '#52c41a' }} className="fa fa-spinner" aria-hidden="true"></i> Chờ duyệt
            </td>}
      </tr>
    );
  }
}

export default connect(null, { deleteProduct, pushHistory })(ProductRow);
