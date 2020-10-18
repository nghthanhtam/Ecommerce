import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside className="main-sidebar">
          {/* sidebar: style can be found in sidebar.less */}
          <section className="sidebar">
            {/* Sidebar user panel */}
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle"
                  alt="User"
                />
              </div>
              <div className="pull-left info">
                <p>Alexander Pierce</p>
                <a href="fake_url">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            {/* sidebar menu: : style can be found in sidebar.less */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <Link to="/home">
                  <i className="fa fa-home" /> <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link to="/order">
                  <i className="fa fa-cart-arrow-down" /> <span>Đơn hàng</span>
                </Link>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-th" />
                  <span>Sản phẩm</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>

                <ul className="treeview-menu">
                  <li>
                    <a href="product">
                      <i className="fa fa-circle-o" /> Quản lý sản phẩm
                    </a>
                  </li>
                  <li>
                    <Link to="/add-product">
                      <i className="fa fa-circle-o" /> Đăng ký sản phẩm mới
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/category">
                  <i className="fa fa-archive" /> <span>Quản lý kho</span>
                  {/* <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span> */}
                </Link>
              </li>
              <li>
                <Link to="/employee">
                  <i className="fa fa-users" /> <span>Quản lý nhân viên</span>
                  {/* <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span> */}
                </Link>
              </li>
              <li>
                <Link to="/role">
                  <i className="fa fa-users" />{" "}
                  <span>Phân quyền nhân viên</span>
                  {/* <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span> */}
                </Link>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-pie-chart" />
                  <span>Thống kê</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/sale-report">
                      <i className="fa fa-circle-o" /> Thống kê doanh thu
                    </Link>
                  </li>
                  <li>
                    <Link to="/warehouse-report">
                      <i className="fa fa-circle-o" /> Thống kê tồn kho
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/supplierinfor">
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

              {/* <li>
                <Link to="/member">
                  <i className="fa fa-th" /> <span>Member</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/orderScreen">
                  <i className="fa fa-th" /> <span>Order</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dailycheck">
                  <i className="fa fa-th" /> <span>Daily Check</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/storageReport">
                  <i className="fa fa-th" /> <span>Storage Report</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/saleReport">
                  <i className="fa fa-th" /> <span>Sale Report</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/invoice">
                  <i className="fa fa-th" /> <span>Invoice</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/payslip">
                  <i className="fa fa-th" /> <span>Payslip</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>

              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-laptop" />
                  <span>UI Elements</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/UI/general.html">
                      <i className="fa fa-circle-o" /> General
                    </a>
                  </li>
                  <li>
                    <a href="pages/UI/icons.html">
                      <i className="fa fa-circle-o" /> Icons
                    </a>
                  </li>
                  <li>
                    <a href="pages/UI/buttons.html">
                      <i className="fa fa-circle-o" /> Buttons
                    </a>
                  </li>
                  <li>
                    <a href="pages/UI/sliders.html">
                      <i className="fa fa-circle-o" /> Sliders
                    </a>
                  </li>
                  <li>
                    <a href="pages/UI/timeline.html">
                      <i className="fa fa-circle-o" /> Timeline
                    </a>
                  </li>
                  <li>
                    <a href="pages/UI/modals.html">
                      <i className="fa fa-circle-o" /> Modals
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-edit" /> <span>Forms</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/forms/general.html">
                      <i className="fa fa-circle-o" /> General Elements
                    </a>
                  </li>
                  <li>
                    <a href="pages/forms/advanced.html">
                      <i className="fa fa-circle-o" /> Advanced Elements
                    </a>
                  </li>
                  <li>
                    <a href="pages/forms/editors.html">
                      <i className="fa fa-circle-o" /> Editors
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-table" /> <span>Tables</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/tables/simple.html">
                      <i className="fa fa-circle-o" /> Simple tables
                    </a>
                  </li>
                  <li>
                    <a href="pages/tables/data.html">
                      <i className="fa fa-circle-o" /> Data tables
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="pages/calendar.html">
                  <i className="fa fa-calendar" /> <span>Calendar</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-red">3</small>
                    <small className="label pull-right bg-blue">17</small>
                  </span>
                </a>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-folder" /> <span>Examples</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/examples/invoice.html">
                      <i className="fa fa-circle-o" /> Invoice
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/profile.html">
                      <i className="fa fa-circle-o" /> Profile
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/login.html">
                      <i className="fa fa-circle-o" /> Login
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/register.html">
                      <i className="fa fa-circle-o" /> Register
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/lockscreen.html">
                      <i className="fa fa-circle-o" /> Lockscreen
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/404.html">
                      <i className="fa fa-circle-o" /> 404 Error
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/500.html">
                      <i className="fa fa-circle-o" /> 500 Error
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/blank.html">
                      <i className="fa fa-circle-o" /> Blank Page
                    </a>
                  </li>
                  <li>
                    <a href="pages/examples/pace.html">
                      <i className="fa fa-circle-o" /> Pace Page
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="fake_url">
                  <i className="fa fa-share" /> <span>Multilevel</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-circle-o" /> Level One
                    </a>
                  </li>
                  <li className="treeview">
                    <a href="fake_url">
                      <i className="fa fa-circle-o" /> Level One
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right" />
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="fake_url">
                          <i className="fa fa-circle-o" /> Level Two
                        </a>
                      </li>
                      <li className="treeview">
                        <a href="fake_url">
                          <i className="fa fa-circle-o" /> Level Two
                          <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right" />
                          </span>
                        </a>
                        <ul className="treeview-menu">
                          <li>
                            <a href="fake_url">
                              <i className="fa fa-circle-o" /> Level Three
                            </a>
                          </li>
                          <li>
                            <a href="fake_url">
                              <i className="fa fa-circle-o" /> Level Three
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-circle-o" /> Level One
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="https://adminlte.io/docs">
                  <i className="fa fa-book" /> <span>Documentation</span>
                </a>
              </li> */}
            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
