import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addShop } from '../../../../state/actions/shopActions';

const mapStateToProps = (state) => ({
  shop: state.shop,
});

class AShopModal extends Component {
  state = {
    name: '',
    busLicenseId: '',
    city: '',
    url: '',
    phone: '',
    inputErrors: false,
    msg: '',
    roles: [{ value: 1 }, { value: 2 }, { value: 3 }],
  };

  onChange = (e) => {
    const { name, value } = e.target;
    let msg = '';
    //Validation
    let isPassed = true;
    if (name == 'phone') isPassed = this.validatePhone(value);
    let inputErrors = isPassed ? false : true;
    if (!isPassed && name == 'phone') {
      msg = 'Số điện thoại chưa hợp lệ';
    }
    this.setState({ [name]: value, msg, inputErrors });
  };

  validatePhone = (phone) => {
    return new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/).test(phone);
  };

  resetField() {
    this.setState({
      name: '',
      busLicenseId: '',
      city: '',
      url: '',
      phone: '',
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      busLicenseId,
      city,
      url,
      phone,
    } = this.state;
    let newItem = {};
    newItem = {
      name,
      busLicenseId,
      city,
      url,
      phone,
    };

    this.props.addShop(newItem);
    this.resetField();

    // Close modal
    document.getElementById('triggerButton').click();
  };

  onCancel = (e) => {
    this.resetField();
  };

  render() {
    const {
      name,
      busLicenseId,
      city,
      url,
      phone,
    } = this.state;

    return (
      <React.Fragment>
        {/* Button trigger modal */}
        <button
          type="button"
          id="triggerButton"
          style={{ float: 'right' }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Thêm nhà bán mới
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
                    Thêm nhà bán mới
                  </h3>
                </span>
                <span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </span>
              </div>
              <div className="modal-body">
                {this.state.msg ? (
                  <div className="alert alert-danger alert-dismissible">
                    {this.state.msg}
                  </div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="fullname" className="col-form-label">
                    Tên nhà bán:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên nhà bán..."
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="col-form-label">
                    Mã kinh doanh:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập mã kinh doanh..."
                    name="busLicenseId"
                    value={busLicenseId}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Thành phố/Tỉnh:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                    name="city"
                    value={city}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Đường dẫn:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập đường dẫn..."
                    name="url"
                    value={url}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="col-form-label">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại..."
                    name="phone"
                    value={phone}
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
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                  disabled={
                    !this.state.inputErrors && this.state.name !== ''
                      ? false
                      : true
                  }
                >
                  Thêm nhân viên
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { addShop })(AShopModal);
