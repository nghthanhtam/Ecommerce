import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { updateAuth } from "../state/actions/authActions";
import { updateAuthUser } from "../state/actions/authUserActions";
import { updateAuthAdmin } from "../state/actions/authAdminActions";
import { connect } from "react-redux";
import { PrivateRoute } from "../components/Content/Seller/PrivateRoute";
import { Notify } from "react-redux-notify";

import Header from "../components/Content/Admin/Header";
import Footer from "../components/Content/Seller/Footer";
import Menu from "../components/Content/Seller/Menu";
import ProductVarEdit from "../components/Content/Seller/Product/ProductVarEdit";
import AProductVarEdit from "../components/Content/Admin/Product/ProductVarEdit";
import APurchase from "../components/Content/Admin/Order/APurchase";
import AOrdersByPurchase from "../components/Content/Admin/Order/AOrdersByPurchase";
import OrderDetail from "../components/Content/Admin/Order/AOrderDetail";
import APromotion from "../components/Content/Admin/Promotion/APromotion";
import APromotionEdit from "../components/Content/Admin/Promotion/APromotionEdit";
import PropTypes from "prop-types";
import ARole from "../components/Content/Admin/Role/ARole";
import ARoleEdit from "../components/Content/Admin/Role/ARoleEdit";
import ALogin from "../components/Content/Admin/Auth/ALogin";
import AHome from "../components/Content/Admin/Home/AHome";
import AProduct from "../components/Content/Admin/Product/AProduct";
import AComment from "../components/Content/Admin/Comment/AComment";
import AQuestion from "../components/Content/Admin/Question/AQuestion";
import AAnswer from "../components/Content/Admin/Answer/AAnswer";
import ARating from "../components/Content/Admin/Rating/ARating";
import ModalProductDetails from "../components/Content/Modal/ModalProductDetails";
import ModalCancel from "../components/Content/Modal/ModalCancel";
import ModalExpire from "../components/Content/Modal/ModalExpire";
import ProductInforEdit from "../components/Content/Admin/Product/ProductInforEdit";
import AEmployee from "../components/Content/Admin/Employee/AEmployee";
import AEmployeeEdit from "../components/Content/Admin/Employee/AEmployeeEdit";
import AShopEmployee from "../components/Content/Admin/Shop/AShopEmployee";
import AShopEmployeeEdit from "../components/Content/Admin/Shop/AShopEmployeeEdit";
import AShop from "../components/Content/Admin/Shop/AShop";
import AShopEdit from "../components/Content/Admin/Shop/AShopEdit";
import AUser from "../components/Content/Admin/User/AUser";
import AUserEdit from "../components/Content/Admin/User/AUserEdit";
import LogAdmin from "../components/Content/Admin/LogAdmin/ALogAdmin";
import AMovie from "../components/Content/Admin/Movie/AMovie";
import AMovieEdit from "../components/Content/Admin/Movie/AMovieEdit";
import AMovieCate from "../components/Content/Admin/MovieCate/AMovieCate";
import AMovieCateEdit from "../components/Content/Admin/MovieCate/AMovieCateEdit";

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  history: state.history,
  isLoaded: state.auth.isLoaded,
  role: state.auth.role,
  adminToken: state.authAdmin.token,
  token: state.auth.token,
  userToken: state.authUser.token,
  show: state.modal.show,
  modalName: state.modal.modalName,
  showNoti: state.noti.showNoti,
});

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
    if (userToken) {
      updateAuthUser(userToken);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { showNoti, adminToken, show, modalName } = this.props;
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
              {showNoti && <Notify position="BottomRight" />}
              {show && modalName == "modalExpire" && <ModalExpire />}
              {show && modalName == "modalCancel" && <ModalCancel />}
              {show && modalName == "productDetails" && <ModalProductDetails />}
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
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/question"
                    component={AQuestion}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/answer"
                    component={AAnswer}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/rating"
                    component={ARating}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/product"
                    component={AProduct}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/promotion"
                    component={APromotion}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/promotion/edit"
                    component={APromotionEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/movie"
                    component={AMovie}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/movie/edit"
                    component={AMovieEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/moviecate"
                    component={AMovieCate}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/moviecate/edit"
                    component={AMovieCateEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/productvar/edit/:id"
                    component={AProductVarEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/product/edit/:id"
                    component={ProductInforEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/role"
                    component={ARole}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/role/edit/:id"
                    component={ARoleEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/employee/shop/:idShop"
                    component={AShopEmployee}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/employee/edit/:id"
                    component={AEmployeeEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/employee/shop/edit/:id"
                    component={AShopEmployeeEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/shop"
                    component={AShop}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/shop/edit/:id"
                    component={AShopEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/user"
                    component={AUser}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/user/edit/:id"
                    component={AUserEdit}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/order"
                    component={APurchase}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/order/purchase/:id"
                    component={AOrdersByPurchase}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/employee"
                    component={AEmployee}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/order/warningdetails/:id"
                    component={OrderDetail}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/admin/logadmin"
                    component={LogAdmin}
                  ></PrivateRoute>
                  <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
              </div>
              <Footer />
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
