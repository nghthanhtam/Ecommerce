import React, { Component } from 'react';
import { connect } from 'react-redux';
import mongoose from 'mongoose';
import { addEmployee } from '../../../../actions/employeeActions';

class EmployeeModal extends Component {
  state = {
    name: '',
    _id: 0,
    inputErrors: false,
    msg: '',
  };
  onChange = (e) => {
    const { name, value } = e.target;
    let msg = '';

    //Validation
    const isPassed = this.validateName(value);
    const inputErrors = isPassed ? false : true;
    if (!isPassed)
      msg =
        'Name of category can only contain only letters, numbers, underscores and spaces';

    this.setState({ [name]: value, msg, inputErrors });
  };
  validateName = (name) => {
    return new RegExp(/^[a-zA-Z0-9_-_ ]*$/).test(name);
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;
    const newItem = {
      name,
      createAt: Date.now(),
      _id: mongoose.Types.ObjectId(),
    };

    this.props.addEmployee(newItem);
    this.setState({ name: '' });
    // Close modal
    document.getElementById('triggerButton').click();
  };
  onCancel = (e) => {
    this.setState({ name: '' });
  };

  render() {
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
          onClick={this.handleOnClick}
        >
          Thêm nhân viên mới
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
                    Thêm nhân viên mới
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
                    {/* <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button> */}

                    {this.state.msg}
                  </div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Category name"
                    name="name"
                    value={this.state.name}
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
const mapStateToProps = (state) => ({
  employee: state.employee,
});
export default connect(mapStateToProps, { addEmployee })(EmployeeModal);
