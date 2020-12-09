////Seller PAGE
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

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
import StorageReport from '../components/Content/Seller/Report/StorageReport';
import SaleReport from '../components/Content/Seller/Report/SaleReport';
import DailyCheck from '../components/Content/Seller/Report/DailyCheck';
import SupplierInfor from '../components/Content/Seller/SupplierInfor/SupplierInfor';
import SupplierEdit from '../components/Content/Seller/Supplier/SupplierEdit';
import ErrorPage from '../components/Content/Seller/ErrorPage/ErrorPage';
import Login from '../components/Content/Seller/Auth/Login';
import Home from '../components/Content/Seller/Home/Home';

import { updateAuth } from '../state/actions/authActions';
import { updateAuthUser } from '../state/actions/authUserActions';
import { updateAuthAdmin } from '../state/actions/authAdminActions';
import Role from '../components/Content/Seller/Role/Role';
import RoleEdit from '../components/Content/Seller/Role/RoleEdit';
import { PrivateRoute } from '../components/Content/Seller/PrivateRoute';
import ModalCancel from '../components/Content/Modal/ModalCancel'

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
  materialReceiptNote: 'materialReceiptNoteManagement'
};

class RSeller extends Component {
  state = {
  };

  componentDidMount() {
    console.log(this.props.adminToken != null);
  }
  componentWillMount() {
    //update user và role trong store, vì khi f5 hoặc tắt browser thì store bị xóa, chỉ còn token ở localstorage
    const { token, userToken, adminToken, updateAuth, updateAuthUser, updateAuthAdmin } = this.props;
    if (token) {
      updateAuth(token);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { token, show, modalName } = this.props;
    return (
      <Fragment>
        <Switch>
          {/* LOGIN */}
          <Route
            exact
            path="/"
            render={() => {
              return !token ? (
                <Redirect to="/seller/login" />
              ) : (
                  <Redirect to="/seller" />
                );
            }} />
          <Route
            exact
            path="/seller/login"
            render={() => {
              return !token ? <Login /> : <Redirect to="/seller" />;
            }} />

          {/* EMPLOYEE */}
          {token && (
            <Fragment>
              {show && modalName == 'modalCancel' && <ModalCancel />}
              <Header isAdmin={false} />
              <Menu isAdmin={false} />
              <div className="content-wrapper">
                <Switch>
                  <Route exact path="/seller">
                    <Home />
                  </Route>
                  <PrivateRoute
                    exact
                    path="/seller/employee"
                    component={Employee}
                    role={roles.employee}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/add-product"
                    component={ProductAdd}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/add-product/photos"
                    component={ProductAddNextPage}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/product"
                    component={Product}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/productvar/edit/:id"
                    component={ProductVarEdit}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/role"
                    component={Role}
                    role={roles.employee}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/supplierinfor"
                    component={SupplierInfor}
                    // role={roles.supplier}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/role/edit/:id"
                    component={RoleEdit}
                    role={roles.role}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/employee/edit/:id"
                    component={EmployeeEdit}
                    role={roles.employee}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/order"
                    component={Order}
                    role={roles.order}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/order/edit/:id"
                    component={OrderDetail}
                    role={roles.order}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/seller/supplier/edit/:id"
                    component={SupplierEdit}
                    role={roles.supplier}
                    token={token}
                  ></PrivateRoute>
                  <Route
                    exact
                    path="/seller/dailycheck"
                    component={DailyCheck}
                  ></Route>
                  <Route
                    exact
                    path="/seller/warehouse-report"
                    component={StorageReport}
                  ></Route>
                  <Route
                    exact
                    path="/seller/sale-report"
                    component={SaleReport}
                  ></Route>
                </Switch>
              </div>
              <Footer />
            </Fragment>
          )}

          <Route path="*" render={() => <Redirect to="/seller/login" />} />
        </Switch>
        {/* )} */}
      </Fragment>
    );
  }
}

RSeller.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  employee: PropTypes.object,
};

export default connect(mapStateToProps, { updateAuth, updateAuthUser, updateAuthAdmin })(RSeller);
