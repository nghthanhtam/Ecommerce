import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addRole } from "../../../../state/actions/roleActions";
import { getPermissions } from "../../../../state/actions/permissionActions";
import "./role.css";

const mapStateToProps = (state) => ({
  permissions: state.permission.permissions,
  idShop: state.auth.role.idShop,
});

class RoleModal extends Component {
  state = {
    permissions: [],
    name: "",
    all: false,
    editShop: false,
    createRole: false,
    editRole: false,
    getRoles: false,
    deleteRole: false,
    createEmployee: false,
    editEmployee: false,
    getEmployees: false,
    deleteEmployee: false,
    updateOrderStatus: false,
    getDoneOrders: false,
    getUndoneOrders: false,
    updateOrderShippingInformatio: false,
    createPayslip: false,
    editPayslip: false,
    getPayslips: false,
    deletePayslip: false,
    getGrossRevenue: false,
    getExpenses: false,
    createProductVar: false,
    editProductVar: false,
    getProductVars: false,
    createStockAmount: false,
    editStockAmount: false,
    getStockAmount: false,
    deleteStockAmount: false,
    getShopLogs: false,
  };

  componentDidMount() {
    this.props.getPermissions({
      limit: 1000,
      page: 1,
      query: "",
      type: "seller",
    });
  }

  onChange = (e) => {
    const target = e.target,
      { permissions } = this.props,
      name = target.name;
    let value = "";

    if (target.type == "checkbox") {
      const statePermission = [...this.state.permissions],
        { all } = { ...this.state };
      if (name == "all") {
        this.setState({
          all: !all,
          createRole: !all,
          editShop: !all,
          createRole: !all,
          editRole: !all,
          getRoles: !all,
          deleteRole: !all,
          createEmployee: !all,
          editEmployee: !all,
          getEmployees: !all,
          deleteEmployee: !all,
          updateOrderStatus: !all,
          getDoneOrders: !all,
          getUndoneOrders: !all,
          updateOrderShippingInformatio: !all,
          createPayslip: !all,
          editPayslip: !all,
          getPayslips: !all,
          deletePayslip: !all,
          getGrossRevenue: !all,
          getExpenses: !all,
          createProductVar: !all,
          editProductVar: !all,
          getProductVars: !all,
          createStockAmount: !all,
          editStockAmount: !all,
          getStockAmount: !all,
          deleteStockAmount: !all,
          getShopLogs: !all,
        });
        let permissionIds = permissions.map(({ id }) => id);
        this.setState({ permissions: permissionIds });
      } else {
        for (let i in permissions) {
          if (permissions[i].permission == name) {
            if (
              !this.state.permissions.some((item) => item == permissions[i].id)
            ) {
              this.setState((prevState) => ({
                permissions: [...prevState.permissions, permissions[i].id],
              }));
            } else {
              this.setState({
                permissions: statePermission.filter(
                  (item) => item !== permissions[i].id
                ),
              });
            }
          }
        }
      }
    } else {
      value = target.value;
      let msg = "",
        isPassed = false;

      //Validation
      isPassed = this.validateName(value);
      const inputErrors = isPassed ? false : true;
      if (!isPassed)
        msg = "Tên chỉ bao gồm chữ cái, số, gạch dưới và khoảng trắng";
      this.setState({ [name]: value, msg, inputErrors });
    }
  };

  validateName = (fullname) => {
    return !new RegExp(
      /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
    ).test(fullname);
  };

  onSubmit = (e) => {
    const { idShop, addRole, pages } = this.props;
    const { name, permissions } = this.state;
    e.preventDefault();
    if (!permissions.length > 0) {
      let msg = "Chọn ít nhất 1 phân quyền";
      this.setState({ msg, inputErrors: true });
      return;
    }
    console.log(pages);
    const newPer = {
      idShop,
      name,
      permissions,
      pages,
    };
    addRole(newPer);
    // Close modal
    document.getElementById("triggerButton").click();
  };

  onCancel = (e) => {};

  renderCheckboxes = () => {
    return (
      <Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý phân quyền</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="createRole"
                  type="checkbox"
                  checked={this.state.createRole}
                  onChange={this.onChange}
                />
                <p>Tạo phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="editRole"
                  type="checkbox"
                  checked={this.state.editRole}
                  onChange={this.onChange}
                />
                <p>Chính sửa phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getRoles"
                  type="checkbox"
                  checked={this.state.getRoles}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getRoles"
                  type="checkbox"
                  checked={this.state.getRoles}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="deleteRole"
                  type="checkbox"
                  checked={this.state.deleteRole}
                  onChange={this.onChange}
                />
                <p>Xóa phân quyền</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý nhân viên</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="createEmployee"
                  type="checkbox"
                  checked={this.state.createEmployee}
                  onChange={this.onChange}
                />
                <p>Tạo nhân viên</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="editEmployee"
                  type="checkbox"
                  checked={this.state.editEmployee}
                  onChange={this.onChange}
                />
                <p>Chính sửa nhân viên</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getEmployees"
                  type="checkbox"
                  checked={this.state.getEmployees}
                  onChange={this.onChange}
                />
                <p>Xem danh sách nhân viên</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="deleteEmployee"
                  type="checkbox"
                  checked={this.state.deleteEmployee}
                  onChange={this.onChange}
                />
                <p>Xóa nhân viên</p>
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý đơn hàng</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="updateOrderStatus"
                  type="checkbox"
                  checked={this.state.updateOrderStatus}
                  onChange={this.onChange}
                />
                <p>Cập nhật trạng thái đơn hàng</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getDoneOrders"
                  type="checkbox"
                  checked={this.state.getDoneOrders}
                  onChange={this.onChange}
                />
                <p>Xem lịch sử đơn hàng</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getUndoneOrders"
                  type="checkbox"
                  checked={this.state.getUndoneOrders}
                  onChange={this.onChange}
                />
                <p>Xem đơn hàng đang trong giao dịch</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="updateOrderShippingInformatio"
                  type="checkbox"
                  checked={this.state.updateOrderShippingInformatio}
                  onChange={this.onChange}
                />
                <p>Cập nhật thông tin giao hàng</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý phiếu chi</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="createPayslip"
                  type="checkbox"
                  checked={this.state.createPayslip}
                  onChange={this.onChange}
                />
                <p>Tạo phiếu chi</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="editPayslip"
                  type="checkbox"
                  checked={this.state.editPayslip}
                  onChange={this.onChange}
                />
                <p>Sửa phiếu chi</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getPayslips"
                  type="checkbox"
                  checked={this.state.getPayslips}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phiếu chi</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="deletePayslip"
                  type="checkbox"
                  checked={this.state.deletePayslip}
                  onChange={this.onChange}
                />
                <p>Xóa phiếu chi</p>
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý sản phẩm</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="createProductVar"
                  type="checkbox"
                  checked={this.state.createProductVar}
                  onChange={this.onChange}
                />
                <p>Tạo sản phẩm</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="editProductVar"
                  type="checkbox"
                  checked={this.state.editProductVar}
                  onChange={this.onChange}
                />
                <p>Sửa sản phẩm</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getProductVars"
                  type="checkbox"
                  checked={this.state.getProductVars}
                  onChange={this.onChange}
                />
                <p>Xem danh sản phẩm</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="createStockAmount"
                  type="checkbox"
                  checked={this.state.createStockAmount}
                  onChange={this.onChange}
                />
                <p>Tạo phiếu nhập kho</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="editStockAmount"
                  type="checkbox"
                  checked={this.state.editStockAmount}
                  onChange={this.onChange}
                />
                <p>Sửa phiếu nhập kho</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getStockAmount"
                  type="checkbox"
                  checked={this.state.getStockAmount}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phiếu nhập kho</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="deleteStockAmount"
                  type="checkbox"
                  checked={this.state.deleteStockAmount}
                  onChange={this.onChange}
                />
                <p>Xóa phiếu nhập kho</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Khác</h4>
            <div>
              <label className="label-wrapper">
                <input
                  name="editShop"
                  type="checkbox"
                  checked={this.state.editShop}
                  onChange={this.onChange}
                />
                <p>Chỉnh sửa thông tin shop</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getGrossRevenue"
                  type="checkbox"
                  checked={this.state.getGrossRevenue}
                  onChange={this.onChange}
                />
                <p>Xem doanh thu</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getExpenses"
                  type="checkbox"
                  checked={this.state.getExpenses}
                  onChange={this.onChange}
                />
                <p>Xem chi phí</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  name="getShopLogs"
                  type="checkbox"
                  checked={this.state.getShopLogs}
                  onChange={this.onChange}
                />
                <p>Xem lịch sử hoạt động</p>
              </label>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const { name, permissions } = this.state;
    return (
      <React.Fragment>
        <button
          type="button"
          id="triggerButton"
          style={{ float: "right" }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={this.handleOnClick}
        >
          Tạo quyền mới
        </button>
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
                    Thêm phân quyền mới
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
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-hidden="true"
                    >
                      ×
                    </button>

                    {this.state.msg}
                  </div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tên phân quyền mới:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên phân quyền"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                </div>
                <div className="role-label">
                  <label className="label-wrapper">
                    <input
                      name="all"
                      type="checkbox"
                      onChange={this.onChange}
                    />
                    <p>Chọn tất cả</p>
                  </label>
                </div>
                {this.renderCheckboxes()}
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
                    permissions.length > 0 && name !== "" ? false : true
                  }
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

export default connect(mapStateToProps, { addRole, getPermissions })(RoleModal);
