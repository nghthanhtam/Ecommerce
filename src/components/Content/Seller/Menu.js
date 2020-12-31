import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  employee: state.auth.employee,
  admin: state.authAdmin.admin,
  permissions: state.auth.permissions,
  permissionAdmins: state.authAdmin.permissions,
});

class Menu extends React.Component {
  render() {
    const {
      employee,
      admin,
      isAdmin,
      permissions,
      permissionAdmins,
    } = this.props;
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src="../img/avatar2.png"
                  className="img-circle"
                  alt="User"
                />
              </div>
              <div className="pull-left info">
                <p>{isAdmin ? admin.username : employee.username}</p>
                <a href="fake_url">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            {isAdmin ? (
              <ul className="sidebar-menu" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                <li>
                  <Link to="/admin">
                    <i className="fa fa-home" /> <span>Trang chủ</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/order">
                    <i className="fa fa-cart-arrow-down" />{" "}
                    <span>Đơn hàng</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/product">
                    <i className="fa fa-circle-o" /> <span>Sản phẩm</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/promotion">
                    <i className="fa fa-gift" /> <span>Mã giảm giá</span>
                  </Link>
                </li>
                <li className="treeview">
                  <a href="javascript:void(0);">
                    <i className="fa fa-th" />
                    <span>Quản lý người dùng</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <Link to="/admin/admin">
                        <i className="fa fa-circle-o" /> Nhân viên
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/user">
                        <i className="fa fa-circle-o" /> Khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/shop">
                        <i className="fa fa-circle-o" /> Nhà bán
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="treeview">
                  <a href="javascript:void(0);">
                    <i className="fa fa-th" />
                    <span>Quản lý bài viết</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <Link to="/admin/rating">
                        <i className="fa fa-question" />
                        Nhật xét
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/comment">
                        <i className="fa fa-reply"></i>Trả lời nhận xét
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/question">
                        <i className="fa fa-question" /> Câu hỏi
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/answer">
                        <i className="fa fa-reply" /> Trả lời câu hỏi
                      </Link>
                    </li>
                  </ul>
                </li>
                {permissionAdmins &&
                  permissionAdmins.includes("getAdminRoles") && (
                    <li>
                      <Link to="/admin/role">
                        <i className="fa fa-users" />{" "}
                        <span>Quản lý phân quyền </span>
                      </Link>
                    </li>
                  )}
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-pie-chart" />
                    <span>Thống kê</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <Link to="/admin/sale-report">
                        <i className="fa fa-circle-o" /> Thống kê doanh thu
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/warehouse-report">
                        <i className="fa fa-circle-o" /> Thống kê tồn kho
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="pages/mailbox/mailbox.html">
                    <i className="fa fa-envelope" /> <span>Mailbox</span>
                    <span className="pull-right-container">
                      <small className="label pull-right bg-yellow">12</small>
                      <small className="label pull-right bg-green">16</small>
                      <small className="label pull-right bg-red">5</small>
                    </span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="sidebar-menu" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                <li>
                  <Link to="/seller">
                    <i className="fa fa-home" /> <span>Trang chủ</span>
                  </Link>
                </li>

                <li>
                  <Link to="/seller/order">
                    <i className="fa fa-cart-arrow-down" />{" "}
                    <span>Đơn hàng</span>
                  </Link>
                </li>
                <li className="treeview">
                  <a href="/seller/product">
                    <i className="fa fa-th" />
                    <span>Sản phẩm</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>

                  <ul className="treeview-menu">
                    <li>
                      <Link to="/seller/product">
                        <i className="fa fa-circle-o" /> Danh sách sản phẩm
                      </Link>
                    </li>
                    {permissions.includes("createProductVar") && (
                      <li>
                        <Link to="/seller/add-product">
                          <i className="fa fa-circle-o" /> Đăng ký sản phẩm mới
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                {permissions.includes("getPayslips") && (
                  <li>
                    <Link to="/seller/payslip">
                      <i className="fa fa-credit-card" /> <span>Phiếu chi</span>
                    </Link>
                  </li>
                )}
                {permissions.includes("getEmployees") && (
                  <li>
                    <Link to="/seller/employee">
                      <i className="fa fa-users" />{" "}
                      <span>Quản lý nhân viên</span>
                    </Link>
                  </li>
                )}
                {permissions.includes("getRoles") && (
                  <li>
                    <Link to="/seller/role">
                      <i className="fa fa-users" />
                      <span>Phân quyền nhân viên</span>
                      {/* <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span> */}
                    </Link>
                  </li>
                )}
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-pie-chart" />
                    <span>Thống kê</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    {permissions.includes("getGrossRevenue") && (
                      <li>
                        <Link to="/seller/sale-report">
                          <i className="fa fa-circle-o" /> Thống kê doanh thu
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link to="/seller/warehouse-report">
                        <i className="fa fa-circle-o" /> Thống kê lợi nhuận
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/seller/supplierinfor">
                    <i className="fa fa-building" />{" "}
                    <span>Thông tin nhà bán</span>
                  </Link>
                </li>
                <li>
                  <a href="pages/mailbox/mailbox.html">
                    <i className="fa fa-envelope" /> <span>Mailbox</span>
                    <span className="pull-right-container">
                      <small className="label pull-right bg-yellow">12</small>
                      <small className="label pull-right bg-green">16</small>
                      <small className="label pull-right bg-red">5</small>
                    </span>
                  </a>
                </li>
              </ul>
            )}
          </section>
        </aside>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Menu);
