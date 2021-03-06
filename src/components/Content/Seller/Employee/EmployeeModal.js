import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addEmployee } from "../../../../state/actions/employeeActions";
import { getRoles } from "../../../../state/actions/roleActions";
import Select from "react-select";

const mapStateToProps = (state) => ({
  roles: state.role.roles,
  isLoaded: state.role.isLoaded,
  idShop: state.auth.role.idShop,
});

class EmployeeModal extends Component {
  state = {
    fullname: "",
    password: "",
    phone: "",
    identityCard: "",
    idRole: "",
    username: "",
    inputErrors: false,
    msg: "",
  };

  componentDidMount() {
    this.props.getRoles({
      limit: 1000,
      page: 1,
      query: "",
      idShop: this.props.idShop,
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    let msg = "";
    //Validation
    let isPassed = true;
    if (name == "fullname") isPassed = this.validateName(value);
    else if (name == "phone") isPassed = this.validatePhone(value);
    else if (name == "password") isPassed = this.validatePassword(value);

    let inputErrors = isPassed ? false : true;
    if (!isPassed && name == "fullname")
      msg = "Tên chỉ bao gồm chữ cái, số, gạch dưới và khoảng trắng";
    else if (!isPassed && name == "phone") {
      msg = "Số điện thoại chưa hợp lệ";
    } else if (!isPassed && name == "password") {
      msg =
        "Mật khẩu gồm 8 kí tự, bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số, không bao gồm kí tự đặc biệt";
    }
    this.setState({ [name]: value, msg, inputErrors });
  };

  validatePhone = (phone) => {
    return new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/).test(phone);
  };

  validateName = (fullname) => {
    return !new RegExp(
      /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
    ).test(fullname);
  };

  validatePassword = (password) => {
    return new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(password);
  };

  resetField() {
    this.setState({
      password: "",
      fullname: "",
      idRole: "",
      phone: "",
      identityCard: "",
      username: "",
    });
  }

  createUsername = (fullname) => {
    function convertToNonAccentVNese(str) {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
      return str;
    }
    let res = fullname.split(" ");
    let firstName = res.pop(),
      surName = ""; //remove last element
    firstName = convertToNonAccentVNese(firstName);
    if (fullname) {
      fullname = res.join(" "); //join back together
      let matches = convertToNonAccentVNese(fullname).match(/\b(\w)/g); //take first letter each word
      surName = matches.join("").toUpperCase();
    }

    return firstName + surName;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { pages, idShop } = this.props,
      {
        password,
        fullname,
        username,
        idRole,
        phone,
        identityCard,
      } = this.state;
    let newItem = {};
    newItem = {
      password,
      fullname,
      username,
      idRole,
      phone,
      identityCard,
      idShop,
      pages,
    };

    this.props.addEmployee(newItem);
    this.resetField();

    // Close modal
    document.getElementById("triggerButton").click();
  };

  onCancel = (e) => {
    this.resetField();
  };

  handleChangeSelect = (selectedItem) => {
    this.setState({ idRole: selectedItem.id });
  };

  render() {
    const {
      password,
      fullname,
      username,
      idRole,
      phone,
      identityCard,
    } = this.state;
    const { isLoaded, roles } = this.props;

    return (
      <React.Fragment>
        {isLoaded && (
          <Fragment>
            {/* Button trigger modal */}
            <button
              type="button"
              id="triggerButton"
              style={{ float: "right" }}
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
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
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
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
                        {this.state.msg}
                      </div>
                    ) : null}
                    <div className="form-group">
                      <label htmlFor="fullname" className="col-form-label">
                        Họ và tên:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Nhập họ và tên..."
                        name="fullname"
                        value={fullname}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username" className="col-form-label">
                        Tên đăng nhập:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Nhập tên đăng nhập..."
                        name="username"
                        value={username}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label">
                        Mật khẩu:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="idRole" className="col-form-label">
                        Vai trò:
                      </label>
                      <Select
                        name="idRole"
                        onChange={this.handleChangeSelect}
                        isSearchable={true}
                        options={roles}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Chọn quyền truy cập cho nhân viên này"
                        value={roles.filter((option) => option.id === idRole)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="col-form-label">
                        Số điện thoại:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="identityCard" className="col-form-label">
                        Số CMND:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập số CMND..."
                        name="identityCard"
                        value={identityCard}
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
                        !this.state.inputErrors && this.state.name !== ""
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
          </Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { addEmployee, getRoles })(
  EmployeeModal
);
