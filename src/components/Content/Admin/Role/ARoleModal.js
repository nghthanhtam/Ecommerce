import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addRoleAdmin } from "../../../../state/actions/roleAdminActions";
import { getPermissions } from "../../../../state/actions/permissionActions";

const mapStateToProps = (state) => ({
  permissions: state.permission.permissions,
  idShop: state.auth.role.idShop,
});

class ARoleModal extends Component {
  state = {
    permissions: [],
    name: "",
    all: false,
    createAdminRole: false,
    editShop: false,
    editAdminRole: false,
    getAdminRoles: false,
    deleteAdminRole: false,
    createEmployee: false,
    editEmployee: false,
    getEmployees: false,
    deleteEmployee: false,
    updateOrderStatus: false,
    getDoneOrders: false,
    getUndoneOrders: false,
    updateOrderShippingInformatio: false,
    getGrossRevenue: false,
    getExpenses: false,
    createProductVar: false,
    editProductVar: false,
    getProductVars: false,
    pendProductVar: false,
    createPromotion: false,
    editPromotion: false,
    getPromotions: false,
    deletePromotion: false,
    createMovieCategory: false,
    editMovieCategory: false,
    getMovieCategory: false,
    deleteMovieCategory: false,
    createMovie: false,
    editMovie: false,
    getMovie: false,
    deleteMovie: false,
    deleteOrderPromotionInfo: false,
  };

  componentDidMount() {
    this.props.getPermissions({
      limit: 1000,
      page: 1,
      query: "",
      type: "admin",
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
      value = e.target.checked;
      if (name == "all") {
        this.setState({
          all: !all,
          createAdminRole: !all,
          editShop: !all,
          editAdminRole: !all,
          getAdminRoles: !all,
          deleteAdminRole: !all,
          createEmployee: !all,
          editEmployee: !all,
          getEmployees: !all,
          deleteEmployee: !all,
          updateOrderStatus: !all,
          getDoneOrders: !all,
          getUndoneOrders: !all,
          updateOrderShippingInformatio: !all,
          getGrossRevenue: !all,
          getExpenses: !all,
          createProductVar: !all,
          editProductVar: !all,
          getProductVars: !all,
          pendProductVar: !all,
          createPromotion: !all,
          editPromotion: !all,
          getPromotions: !all,
          deletePromotion: !all,
          createMovieCategory: !all,
          editMovieCategory: !all,
          getMovieCategory: !all,
          deleteMovieCategory: !all,
          createMovie: !all,
          editMovie: !all,
          getMovie: !all,
          deleteMovie: !all,
          deleteOrderPromotionInfo: !all,
        });
        let permissionIds = permissions.map(({ id }) => id);
        this.setState({ permissions: permissionIds });
      } else {
        this.setState({ [name]: value });
        for (let i in permissions) {
          if (permissions[i].permission == name) {
            if (
              !this.state.permissions.some((item) => item == permissions[i].id)
            ) {
              this.setState(
                (prevState) => ({
                  permissions: [...prevState.permissions, permissions[i].id],
                }),
                () => console.log(this.state.permissions)
              );
            } else {
              this.setState(
                {
                  permissions: statePermission.filter(
                    (item) => item !== permissions[i].id
                  ),
                },
                () => console.log(this.state.permissions)
              );
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
    const { idShop, addRoleAdmin, pages } = this.props;
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

    addRoleAdmin(newPer);
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
                  value={66}
                  name="createAdminRole"
                  type="checkbox"
                  checked={this.state.createAdminRole}
                  onChange={this.onChange}
                />
                <p>Tạo phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={67}
                  name="editAdminRole"
                  type="checkbox"
                  checked={this.state.editAdminRole}
                  onChange={this.onChange}
                />
                <p>Chính sửa phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={68}
                  name="getAdminRoles"
                  type="checkbox"
                  checked={this.state.getAdminRoles}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phân quyền</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={69}
                  name="deleteAdminRole"
                  type="checkbox"
                  checked={this.state.deleteAdminRole}
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
                  value={9}
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
                  value={10}
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
                  value={11}
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
                  value={12}
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
            <h4 className="role-cate">Quản lý mã giảm giá</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={31}
                  name="createPromotion"
                  type="checkbox"
                  checked={this.state.createPromotion}
                  onChange={this.onChange}
                />
                <p>Tạo mã giảm giá</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={32}
                  name="editPromotion"
                  type="checkbox"
                  checked={this.state.editPromotion}
                  onChange={this.onChange}
                />
                <p>Sửa mã giảm giá</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={33}
                  name="getPromotions"
                  type="checkbox"
                  checked={this.state.getPromotions}
                  onChange={this.onChange}
                />
                <p>Xem danh sách mã giảm giá</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={34}
                  name="deletePromotion"
                  type="checkbox"
                  checked={this.state.deletePromotion}
                  onChange={this.onChange}
                />
                <p>Xóa mã giảm giá</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý sản phẩm</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={51}
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
                  value={55}
                  name="pendProductVar"
                  type="checkbox"
                  checked={this.state.pendProductVar}
                  onChange={this.onChange}
                />
                <p>Duyệt sản phẩm</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={52}
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
                  value={53}
                  name="getProductVars"
                  type="checkbox"
                  checked={this.state.getProductVars}
                  onChange={this.onChange}
                />
                <p>Xem danh sản phẩm</p>
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý thể loại phim</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={35}
                  name="createMovieCategory"
                  type="checkbox"
                  checked={this.state.createMovieCategory}
                  onChange={this.onChange}
                />
                <p>Tạo thể loại phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={36}
                  name="editMovieCategory"
                  type="checkbox"
                  checked={this.state.editMovieCategory}
                  onChange={this.onChange}
                />
                <p>Sửa thể loại phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={37}
                  name="getMovieCategory"
                  type="checkbox"
                  checked={this.state.getMovieCategory}
                  onChange={this.onChange}
                />
                <p>Xem danh sách thể loại phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={38}
                  name="deleteMovieCategory"
                  type="checkbox"
                  checked={this.state.deleteMovieCategory}
                  onChange={this.onChange}
                />
                <p>Xóa thể loại phim</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý phim</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={39}
                  name="createMovie"
                  type="checkbox"
                  checked={this.state.createMovie}
                  onChange={this.onChange}
                />
                <p>Tạo phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={40}
                  name="editMovie"
                  type="checkbox"
                  checked={this.state.editMovie}
                  onChange={this.onChange}
                />
                <p>Sửa phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={41}
                  name="getMovie"
                  type="checkbox"
                  checked={this.state.getMovie}
                  onChange={this.onChange}
                />
                <p>Xem danh sách phim</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={42}
                  name="deleteMovie"
                  type="checkbox"
                  checked={this.state.deleteMovie}
                  onChange={this.onChange}
                />
                <p>Xóa phim</p>
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý bài đánh giá</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={56}
                  name="getRatings"
                  type="checkbox"
                  checked={this.state.getRatings}
                  onChange={this.onChange}
                />
                <p>Xem danh sách bài đánh giá </p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={57}
                  name="pendRating"
                  type="checkbox"
                  checked={this.state.pendRating}
                  onChange={this.onChange}
                />
                <p>Duyệt bài đánh giá</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý phần bình luận</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={59}
                  name="getComments"
                  type="checkbox"
                  checked={this.state.getComments}
                  onChange={this.onChange}
                />
                <p>Xem danh sách comments</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={60}
                  name="pendComment"
                  type="checkbox"
                  checked={this.state.pendComment}
                  onChange={this.onChange}
                />
                <p>Duyệt comment</p>
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="role-label">
            <h4 className="role-cate">Quản lý câu hỏi</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={61}
                  name="getQuestions"
                  type="checkbox"
                  checked={this.state.getQuestions}
                  onChange={this.onChange}
                />
                <p>Xem danh sách câu hỏi </p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={62}
                  name="pendQuestion"
                  type="checkbox"
                  checked={this.state.pendQuestion}
                  onChange={this.onChange}
                />
                <p>Duyệt câu hỏi</p>
              </label>
            </div>
          </div>
          <div className="role-label">
            <h4 className="role-cate">Quản lý các câu trả lời</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={63}
                  name="createAnswer"
                  type="checkbox"
                  checked={this.state.createAnswer}
                  onChange={this.onChange}
                />
                <p>Trả lời cho câu hỏi của khách</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={64}
                  name="getAnswers"
                  type="checkbox"
                  checked={this.state.getAnswers}
                  onChange={this.onChange}
                />
                <p>Xem danh sách câu trả lời</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={65}
                  name="pendAnswers"
                  type="checkbox"
                  checked={this.state.pendAnswers}
                  onChange={this.onChange}
                />
                <p>Duyệt câu trả lời</p>
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
                  value={13}
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
                  value={14}
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
            <h4 className="role-cate">Khác</h4>
            <div>
              <label className="label-wrapper">
                <input
                  value={1}
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
                  value={78}
                  name="deleteOrderPromotionInfo"
                  type="checkbox"
                  checked={this.state.deleteOrderPromotionInfo}
                  onChange={this.onChange}
                />
                <p>Hủy mã giảm giá đơn hàng</p>
              </label>
            </div>
            <div>
              <label className="label-wrapper">
                <input
                  value={79}
                  name="getAdminLogs"
                  type="checkbox"
                  checked={this.state.getAdminLogs}
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

export default connect(mapStateToProps, { addRoleAdmin, getPermissions })(
  ARoleModal
);
