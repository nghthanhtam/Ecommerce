import jwt from 'jwt-decode';
////Seller PAGE
import React, { Component, Fragment } from 'react';
import Header from './components/Content/Seller/Header';
import Footer from './components/Content/Seller/Footer';
import Menu from './components/Content/Seller/Menu';
import Employee from './components/Content/Seller/Employee/Employee';
import ProductAdd from './components/Content/Seller/Product/ProductAdd';
import ProductAddNextPage from './components/Content/Seller/Product/ProductAddNextPage';
import Product from './components/Content/Seller/Product/Product';
import OrderEdit from './components/Content/Seller/Order/OrderEdit';
import EmployeeEdit from './components/Content/Seller/Employee/EmployeeEdit';
import StorageReport from './components/Content/Seller/Report/StorageReport';
import SaleReport from './components/Content/Seller/Report/SaleReport';
import DailyCheck from './components/Content/Seller/Report/DailyCheck';
import SupplierInfor from './components/Content/Seller/SupplierInfor/SupplierInfor';
import SupplierEdit from './components/Content/Seller/Supplier/SupplierEdit';
import ErrorPage from './components/Content/Seller/ErrorPage/ErrorPage';
import Login from './components/Content/Seller/Auth/Login';
import Home from './components/Content/Seller/Home/Home';

import { loadUser, updateAuth } from './state/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Route, Switch, Redirect } from 'react-router-dom';
import Role from './components/Content/Seller/Role/Role';
import RoleEdit from './components/Content/Seller/Role/RoleEdit';
import { PrivateRoute } from './components/Content/Seller/PrivateRoute';
import NoPermissionPage from './components/Content/Seller/ErrorPage/NoPermissionPage';

//SHOPNOW
import HomePage from './components/Content/ShopNow/HomePage';
import ProductList from './components/Content/ShopNow/Product/ProductList';
import ProductDetail from './components/Content/ShopNow/Product/ProductDetail';
import Register from './components/Content/ShopNow/Register/Register';
import RegisterSuccess from './components/Content/ShopNow/Register/RegisterSuccess';
import Cart from './components/Content/ShopNow/Checkout/Cart';
import CartDetail from './components/Content/ShopNow/Checkout/CartDetail';
import Payment from './components/Content/ShopNow/Checkout/Payment';
import OrderReceipt from './components/Content/ShopNow/Checkout/OrderReceipt';
import Account from './components/Content/ShopNow/User/Account';
import LaterList from './components/Content/ShopNow/User/LaterList';
import LaterListDetail from './components/Content/ShopNow/User/LaterListDetail';
import OrderHistory from './components/Content/ShopNow/User/OrderHistory';
import AddressBook from './components/Content/ShopNow/User/AddressBook';
import Review from './components/Content/ShopNow/User/Review';
import Watchlist from './components/Content/ShopNow/User/Watchlist';
import Wishlist from './components/Content/ShopNow/User/Wishlist';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  history: state.history,
  isLoaded: state.auth.isLoaded,
  user: state.auth.user,
  token: state.auth.token,
  role: state.auth.role,
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
};
class CoffeShop extends Component {
  state = {
    //firstPathname: '/',
  };
  componentWillMount() {
    // this.setState({
    //   firstPathname: this.props.history.history.location.pathname,
    // });
    //update uer và role trong store, vì khi f5 hoặc tắt browser thì store bị xóa, chỉ còn token ở localstorage
    const { token, updateAuth } = this.props;
    if (token) {
      updateAuth(token);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { token } = this.props;
    return (
      <Fragment>
        {/* {!this.props.isLoaded ? (
          <Loader></Loader>
        ) : ( */}
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/register-success">
            <RegisterSuccess />
          </Route>
          <Route exact path="/shopnow">
            <HomePage />
          </Route>
          <Route exact path="/product-list">
            <ProductList />
          </Route>
          <Route exact path="/product-detail">
            <ProductDetail />
          </Route>
          <Route exact path="/checkout/cart">
            <Cart />
          </Route>
          <Route
            exact
            path="/"
            render={() => {
              return !token ? (
                <Redirect to="/login" />
              ) : (
                  <Redirect to="/home" />
                );
            }}
          />

          <Route
            exact
            path="/login"
            render={() => {
              return !token ? <Login /> : <Redirect to="/home" />;
            }}
          />
          {token && (
            <Fragment>
              <Header />
              <Menu />

              <div className="content-wrapper">
                <Switch>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route path="/404">
                    <ErrorPage />
                  </Route>
                  <Route path="/403">
                    <NoPermissionPage />
                  </Route>
                  <PrivateRoute
                    exact
                    path="/employee"
                    component={Employee}
                    role={roles.employee}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/add-product"
                    component={ProductAdd}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/add-product/photos"
                    component={ProductAddNextPage}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/product"
                    component={Product}
                    role={roles.product}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/role"
                    component={Role}
                    role={roles.role}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/supplierinfor"
                    component={SupplierInfor}
                    // role={roles.supplier}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/role/edit/:id"
                    component={RoleEdit}
                    role={roles.role}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/employee/edit/:id"
                    component={EmployeeEdit}
                    role={roles.employee}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/order/edit/:id"
                    component={OrderEdit}
                    role={roles.order}
                    token={token}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/supplier/edit/:id"
                    component={SupplierEdit}
                    role={roles.supplier}
                    token={token}
                  ></PrivateRoute>
                  <Route
                    exact
                    path="/dailycheck"
                    component={DailyCheck}
                  ></Route>
                  <Route
                    exact
                    path="/warehouse-report"
                    component={StorageReport}
                  ></Route>
                  <Route
                    exact
                    path="/sale-report"
                    component={SaleReport}
                  ></Route>

                  <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          )}

          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
        {/* )} */}
      </Fragment>
    );
  }
}

Employee.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps, { loadUser, updateAuth })(CoffeShop);
