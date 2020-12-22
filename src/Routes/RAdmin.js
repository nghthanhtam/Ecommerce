import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { updateAuth } from "../state/actions/authActions";
import { updateAuthUser } from "../state/actions/authUserActions";
import { updateAuthAdmin } from "../state/actions/authAdminActions";
import { connect } from "react-redux";

import Header from "../components/Content/Seller/Header";
import Footer from "../components/Content/Seller/Footer";
import Menu from "../components/Content/Seller/Menu";
import ProductVarEdit from "../components/Content/Seller/Product/ProductVarEdit";
import Order from "../components/Content/Seller/Order/Order";
import OrderDetail from "../components/Content/Seller/Order/OrderDetail";
import APromotion from "../components/Content/Admin/Promotion/APromotion";
import APromotionEdit from "../components/Content/Admin/Promotion/APromotionEdit";
import PropTypes from "prop-types";
import Role from "../components/Content/Seller/Role/Role";
import RoleEdit from "../components/Content/Seller/Role/RoleEdit";
import { PrivateRoute } from "../components/Content/Seller/PrivateRoute";

import ALogin from "../components/Content/Admin/Auth/ALogin";
import AHome from "../components/Content/Admin/Home/AHome";
import AProduct from "../components/Content/Admin/Product/AProduct";
import AComment from "../components/Content/Admin/Comment/AComment";
import AQuestion from "../components/Content/Admin/Question/AQuestion";
import AAnswer from "../components/Content/Admin/Answer/AAnswer";
import ARating from "../components/Content/Admin/Rating/ARating";
import ModalProductDetails from "../components/Content/Modal/ModalProductDetails";
import ProductInforEdit from "../components/Content/Admin/Product/ProductInforEdit";
import AEmployee from "../components/Content/Admin/Employee/AEmployee";
import EmployeeEdit from "../components/Content/Admin/Employee/AEmployeeEdit";
import AShop from "../components/Content/Admin/Shop/AShop";
import AShopEdit from "../components/Content/Admin/Shop/AShopEdit";
import AUser from "../components/Content/Admin/User/AUser";
import AUserEdit from "../components/Content/Admin/User/AUserEdit";

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  history: state.history,
  isLoaded: state.auth.isLoaded,
  role: state.auth.role,
  adminToken: state.authAdmin.token,
  show: state.modal.show,
  modalName: state.modal.modalName,
});

const roles = {
  employee: "employeeManagement",
  role: "roleManagement",
  member: "memberManagement",
  product: "productManagement",
  user: "userManagement",
  invoice: "invoiceManagement",
  supplier: "supplierManagement",
  payslip: "payslipManagement",
  order: "orderManagement",
  material: "materialManagement",
  materialReceiptNote: "materialReceiptNoteManagement",
  SuperAdmin: "SuperAdmin",
};

class RAdmin extends Component {
  state = {};

  componentWillMount() {
    //update user và role trong store, vì khi f5 hoặc tắt browser thì store bị xóa, chỉ còn token ở localstorage
    const {
      token,
      userToken,
      adminToken,
      updateAuth,
      updateAuthUser,
      updateAuthAdmin,
    } = this.props;

    if (adminToken) {
      console.log("adminToken: ", adminToken);
      updateAuthAdmin(adminToken);
    }
    if (token) {
      updateAuth(token);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { token, userToken, adminToken, show, modalName } = this.props;
    return (
      <Fragment>
        <Switch>
          {/* LOGIN */}
          <Route
            exact
            path="/admin/login"
            render={() => {
              return adminToken != null ? <Redirect to="/admin" /> : <ALogin />;
            }}
          />
          <Route
            exact
            path="/"
            render={() => {
              return !adminToken ? (
                <Redirect to="/admin/login" />
              ) : (
                <Redirect to="/admin" />
              );
            }}
          />
          <Route
            exact
            path="/admin/login"
            render={() => {
              return !adminToken ? <ALogin /> : <Redirect to="/admin" />;
            }}
          />
          {/* LOGIN */}

          {/* ADMIN */}
          {adminToken && (
            <Fragment>
              <Fragment>
                {show && modalName == "productDetails" && (
                  <ModalProductDetails />
                )}
                <Header isAdmin={true} />
                <Menu isAdmin={true} />
                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/admin">
                      <AHome />
                    </Route>
                    <PrivateRoute
                      exact
                      path="/admin/comment"
                      component={AComment}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/question"
                      component={AQuestion}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/answer"
                      component={AAnswer}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/rating"
                      component={ARating}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/product"
                      component={AProduct}
                      role={roles.product}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/promotion"
                      component={APromotion}
                      role={roles.promotion}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/promotion/edit"
                      component={APromotionEdit}
                      role={roles.promotion}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/productvar/edit/:id"
                      component={ProductVarEdit}
                      role={roles.product}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/product/edit/:id"
                      component={ProductInforEdit}
                      role={roles.product}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/role"
                      component={Role}
                      role={roles.employee}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/role/edit/:id"
                      component={RoleEdit}
                      role={roles.role}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/employee/shop/:id"
                      component={AEmployee}
                      role={roles.employee}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/employee/edit/:id"
                      component={EmployeeEdit}
                      role={roles.employee}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/shop"
                      component={AShop}
                      role={roles.shop}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/shop/edit/:id"
                      component={AShopEdit}
                      role={roles.shop}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/user"
                      component={AUser}
                      role={roles.user}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/user/edit/:id"
                      component={AUserEdit}
                      role={roles.user}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/order"
                      component={Order}
                      role={roles.order}
                      token={adminToken}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/order/edit/:id"
                      component={OrderDetail}
                      role={roles.order}
                      token={adminToken}
                    ></PrivateRoute>
                    <Route path="*" render={() => <Redirect to="/404" />} />
                  </Switch>
                </div>
                <Footer />
              </Fragment>
            </Fragment>
          )}
          <Route path="*" render={() => <Redirect to="/admin/login" />} />
        </Switch>
      </Fragment>
    );
  }
}

RAdmin.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  admin: PropTypes.object,
};

export default connect(mapStateToProps, {
  updateAuth,
  updateAuthUser,
  updateAuthAdmin,
})(RAdmin);
