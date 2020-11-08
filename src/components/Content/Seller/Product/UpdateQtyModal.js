import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../../../../state/actions/employeeActions';

class UpdateQtyModal extends Component {
  state = {
    createdAt: '',
    qty: 0,
    price: 0,
    total: 0,
    note: '',
    inputErrors: false,
    msg: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetField() {
    this.setState({
      qty: '',
      price: '',
      total: '',
      createdAt: '',
      note: ''
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { qty, price, total, createdAt, note } = this.state;
    let newItem = {};
    newItem = {
      qty,
      price,
      total,
      createdAt,
      note
    };

    this.props.addEmployee(newItem);
    this.resetField();

    // Close modal
    document.getElementById('triggerButton').click();
  };
  onCancel = (e) => {
    this.resetField();
  };

  render() {
    const {
      qty,
      price,
      total,
      createdAt,
      note
    } = this.state;

    return (
      <React.Fragment>
        {/* Button trigger modal */}
        <button
          type="button"
          id="triggerButton"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Nhập kho
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span>
                  <h3 className="modal-title" id="exampleModalLongTitle">
                    Nhập kho {' - '} {this.props.name}
                  </h3>
                </span>
                <span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div className="modal-body">
                {this.state.msg ? (
                  <div className="alert alert-danger alert-dismissible">
                    {this.state.msg}
                  </div>
                ) : null}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <label className="col-form-label">
                    Thời gian:
                  </label>
                  <input type="datetime-local"
                    className="form-control"
                    id="createdAt"
                    name="createdAt"
                    value={createdAt}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <label htmlFor="qty" className="col-form-label">
                    Số lượng:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="qty"
                    placeholder="Nhập số lượng cần thêm vào kho..."
                    name="qty"
                    value={qty}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <label htmlFor="price" className="col-form-label">
                    Giá nhập:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Nhập giá tiền..."
                    name="price"
                    value={price}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <label htmlFor="total" className="col-form-label">
                    Thành tiền:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="total"
                    disabled
                    name="total"
                    value={total}
                    placeholder="0 VND"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <label htmlFor="note" className="col-form-label">
                    Ghi chú:
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="note"
                    placeholder="Nhập ghi chú..."
                    name="note"
                    value={note}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.onCancel}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                  disabled={
                    !this.state.inputErrors && this.state.name !== '' ? false : true}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  employee: state.employee,
});
export default connect(mapStateToProps, { addEmployee })(UpdateQtyModal);
