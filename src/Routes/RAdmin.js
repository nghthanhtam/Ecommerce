////Seller PAGE
import React, { Component, Fragment } from 'react';
import Header from '../components/Content/Seller/Header';
import Footer from '../components/Content/Seller/Footer';
import Menu from '../components/Content/Seller/Menu';
import Employee from '../components/Content/Seller/Employee/Employee';
import ProductAdd from '../components/Content/Seller/Product/ProductAdd';
import ProductAddNextPage from '../components/Content/Seller/Product/ProductAddNextPage';
import ProductVarEdit from '../components/Content/Seller/Product/ProductVarEdit'
import Product from '../components/Content/Seller/Product/Product';
import Order from '../components/Content/Seller/Order/Order';
import OrderDetail from '../components/Content/Seller/Order/OrderDetail';
import EmployeeEdit from '../components/Content/Seller/Employee/EmployeeEdit';

import { updateAuth } from '../state/actions/authActions';
import { updateAuthUser } from '../state/actions/authUserActions';
import { updateAuthAdmin } from '../state/actions/authAdminActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Role from '../components/Content/Seller/Role/Role';
import RoleEdit from '../components/Content/Seller/Role/RoleEdit';
import { PrivateRoute } from '../components/Content/Seller/PrivateRoute';

////ADMIN
import ALogin from '../components/Content/Admin/Auth/ALogin';
import AHome from '../components/Content/Admin/Home/AHome';
import AProduct from '../components/Content/Admin/Product/AProduct';
import AComment from '../components/Content/Admin/Comment/AComment';
import AQuestion from '../components/Content/Admin/Question/AQuestion';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  history: state.history,
  isLoaded: state.auth.isLoaded,
  token: state.auth.token,
  role: state.auth.role,
  userToken: state.authUser.token,
  adminToken: state.authAdmin.token,
  show: state.modal.show,
  modalName: state.modal.modalName
});

const roles = {
  employee: 'employeeManagement',
  role: 'roleManagement',
  member: 'memberManagement',
  product: 'productManagement',
  user: 'userManagement',
  invoice: 'invoiceManagement',
  supplier: 'supplierManagement',
  payslip: 'payslipManagement',
  order: 'orderManagement',
  material: 'materialManagement',
  materialReceiptNote: 'materialReceiptNoteManagement',
  SuperAdmin: 'SuperAdmin'
};

class RAdmin extends Component {
  state = {
  };

  componentWillMount() {
    //update user và role trong store, vì khi f5 hoặc tắt browser thì store bị xóa, chỉ còn token ở localstorage
    const { token, userToken, adminToken, updateAuth, updateAuthUser, updateAuthAdmin } = this.props;

    if (adminToken) {
      console.log('adminToken: ', adminToken);
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
            }} />
          <Route
            exact
            path="/"
            render={() => {
              return !token ? (
                <Redirect to="/admin/login" />
              ) : (
                  <Redirect to="/admin" />
                );
            }} />
          <Route
            exact
            path="/admin/login"
            render={() => {
              return !token ? <ALogin /> : <Redirect to="/admin" />;
            }} />
          {/* LOGIN */}


          {/* ADMIN */}
          {adminToken && (
            <Fragment>
              <Fragment>
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
                      path="/admin/product"
                      component={AProduct}
                      role={roles.product}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/productvar/edit/:id"
                      component={ProductVarEdit}
                      role={roles.product}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/role"
                      component={Role}
                      role={roles.employee}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/role/edit/:id"
                      component={RoleEdit}
                      role={roles.role}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/employee/edit/:id"
                      component={EmployeeEdit}
                      role={roles.employee}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/order"
                      component={Order}
                      role={roles.order}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/admin/order/edit/:id"
                      component={OrderDetail}
                      role={roles.order}
                      token={token}
                    ></PrivateRoute>
                  </Switch>
                </div>
                <Footer />
              </Fragment>
            </Fragment>
          )}

          <Route path="*" render={() => <Redirect to="/admin/login" />} />
        </Switch>
        {/* )} */}
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

export default connect(mapStateToProps, { updateAuth, updateAuthUser, updateAuthAdmin })(RAdmin);
