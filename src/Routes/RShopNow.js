import React, { Component, Fragment } from 'react';

import { updateAuth } from '../state/actions/authActions';
import { updateAuthUser } from '../state/actions/authUserActions';
import { updateAuthAdmin } from '../state/actions/authAdminActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Role from '../components/Content/Seller/Role/Role';
import RoleEdit from '../components/Content/Seller/Role/RoleEdit';
import { PrivateRoute } from '../components/Content/Seller/PrivateRoute';

//SHOPNOW
import HomePage from '../components/Content/ShopNow/HomePage';
import ProductList from '../components/Content/ShopNow/Product/ProductList';
import ProductDetail from '../components/Content/ShopNow/Product/ProductDetail';
import Register from '../components/Content/ShopNow/Register/Register';
import RegisterSuccess from '../components/Content/ShopNow/Register/RegisterSuccess';
import Cart from '../components/Content/ShopNow/Checkout/Cart';
import CartDetail from '../components/Content/ShopNow/Checkout/CartDetail';
import Payment from '../components/Content/ShopNow/Checkout/Payment';
import OrderReceipt from '../components/Content/ShopNow/Checkout/OrderReceipt';
import UserProfile from '../components/Content/ShopNow/User/UserProfile';
import Account from '../components/Content/ShopNow/User/Account';
import LaterList from '../components/Content/ShopNow/User/LaterList';
import LaterListDetail from '../components/Content/ShopNow/User/LaterListDetail';
import OrderHistory from '../components/Content/ShopNow/User/OrderHistory';
import AddressBook from '../components/Content/ShopNow/User/AddressBook';
import Review from '../components/Content/ShopNow/User/Review';
import Watchlist from '../components/Content/ShopNow/User/Watchlist';
import Wishlist from '../components/Content/ShopNow/User/Wishlist';
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
  materialReceiptNote: 'materialReceiptNoteManagement',
  SuperAdmin: 'SuperAdmin'
};

class RShopNow extends Component {
  state = {
  };

  componentWillMount() {
    //update user và role trong store, vì khi f5 hoặc tắt browser thì store bị xóa, chỉ còn token ở localstorage
    const { token, userToken, adminToken, updateAuth, updateAuthUser, updateAuthAdmin } = this.props;
    if (token) {
      updateAuth(token);
    }
    if (userToken) {
      updateAuthUser(userToken);
    }
    if (adminToken) {
      console.log('adminToken: ', adminToken);
      updateAuthAdmin(adminToken);
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
          <Route exact path="/shopnow/register">
            <Register />
          </Route>
          <Route exact path="/shopnow/register-success">
            <RegisterSuccess />
          </Route>
          <Route exact path="/shopnow">
            <HomePage />
          </Route>
          <Route exact path="/shopnow/product-list">
            <ProductList />
          </Route>
          <Route path={`/shopnow/product-list/idMovieCat/:idMovieCat`} component={ProductList} />
          <Route path={`/shopnow/product-detail/idProduct/:idProduct/idShop/:idShop`} component={ProductDetail} />
          <Route
            exact
            path="/shopnow/checkout/cart"
            render={() => {
              return userToken ? <Cart /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/checkout/payment"
            render={() => {
              return userToken ? <Payment /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/order-receipt"
            render={() => {
              return userToken ? <OrderReceipt /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/account"
            render={() => {
              return userToken ? <Account /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/sales/order/history"
            render={() => {
              return userToken ? <OrderHistory /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/laterlist"
            render={() => {
              return userToken ? <LaterList /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/address-book"
            render={() => {
              return userToken ? <AddressBook /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/review"
            render={() => {
              return userToken ? <Review /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/watchlist"
            render={() => {
              return userToken ? <Watchlist /> : <Redirect to="/shopnow" />;
            }} />
          <Route
            exact
            path="/shopnow/user/wishlist"
            render={() => {
              return userToken ? <Wishlist /> : <Redirect to="/shopnow" />;
            }} />
        </Switch>
      </Fragment>
    );
  }
}

RShopNow.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps, { updateAuth, updateAuthUser, updateAuthAdmin })(RShopNow);
