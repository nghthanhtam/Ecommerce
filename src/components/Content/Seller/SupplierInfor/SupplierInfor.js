import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import "./SupplierInfor.css";
import { getShopById, updateShop } from "../../../../state/actions/shopActions";

const mapStateToProps = (state) => ({
  shop: state.shop.shop,
  idShop: state.auth.role.idShop,
  isLoaded: state.shop.isLoaded,
  isUpdated: state.shop.isUpdated,
  permissions: state.auth.permissions,
});

const SupplierInfor = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    props.getShopById(props.idShop);
  }, [props.idShop]);
  useEffect(() => {
    if (!disabled) document.getElementById("name").focus();
  }, [disabled]);
  useEffect(() => {
    if (props.isUpdated) {
      setDisabled(true);
      setShow(false);
    }
  }, [props.isUpdated]);

  const changeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue([name], value);

    let url = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    url = url.replace(/\s+/g, "-");
    setFieldValue("url", url);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.shop}
      onSubmit={(values, actions) => {
        props.updateShop({ newShop: values, type: "seller" });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 50 kí tự")
          .required("Bắt buộc nhập!"),
        city: Yup.string()
          .max(50, "Chỉ được phép nhập ít hơn 50 kí tự")
          .required("Bắt buộc nhập!"),
        url: Yup.string()
          .max(50, "Chỉ được phép nhập ít hơn 50 kí tự")
          .required("Bắt buộc nhập!"),
        phone: Yup.string()
          .max(20, "Chỉ được phép nhập ít hơn 20 kí tự")
          .required("Required")
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
        busLicenseId: Yup.string()
          .max(20, "Chỉ được phép nhập ít hơn 20 kí tự")
          .required("Bắt buộc nhập!"),
      })}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Fragment>
          <section className="content-header">
            <h1>Thông tin nhà bán</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/seller">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/seller/supplierinfor">Thông tin nhà bán</a>
              </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                    <div className="row-flex">
                      <div style={{ width: "100%", padding: "5px" }}>
                        <div className="label-text1" htmlFor="name">
                          Tên gian hàng
                        </div>
                        <input
                          id="name"
                          className="form-control"
                          disabled={disabled}
                          name="name"
                          type="text"
                          onChange={(e) => changeName(e, setFieldValue)}
                          onBlur={handleBlur}
                          value={values.name}
                          style={{
                            borderColor:
                              errors.name && touched.name ? "red" : "",
                          }}
                        />
                        {errors.name && touched.name ? (
                          <div className="errors">{errors.name}</div>
                        ) : null}

                        <p className="label-text" htmlFor="id">
                          Mã gian hàng
                        </p>
                        <input
                          className="form-control"
                          name="id"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.id}
                          disabled
                        />

                        <p className="label-text" htmlFor="phone">
                          Điện thoại liên lạc{" "}
                        </p>
                        <input
                          className="form-control"
                          disabled={disabled}
                          name="phone"
                          type="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          style={{
                            borderColor:
                              errors.phone && touched.phone ? "red" : "",
                          }}
                        />
                        {errors.phone && touched.phone ? (
                          <div className="errors">{errors.phone}</div>
                        ) : null}
                      </div>
                      <div style={{ width: "100%", padding: "3px" }}>
                        <p className="label-text1" htmlFor="busLicenseId">
                          Mã đăng ký kinh doanh
                        </p>
                        <input
                          className="form-control"
                          disabled={disabled}
                          name="busLicenseId"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.busLicenseId}
                          style={{
                            borderColor:
                              errors.busLicenseId && touched.busLicenseId
                                ? "red"
                                : "",
                          }}
                        />
                        {errors.busLicenseId && touched.busLicenseId ? (
                          <div className="errors">{errors.busLicenseId}</div>
                        ) : null}

                        <p className="label-text" htmlFor="city">
                          Tỉnh/Thành phố
                        </p>
                        <input
                          className="form-control"
                          disabled={disabled}
                          name="city"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          style={{
                            borderColor:
                              errors.city && touched.city ? "red" : "",
                          }}
                        />
                        {errors.city && touched.city ? (
                          <div className="errors">{errors.city}</div>
                        ) : null}

                        <p className="label-text" htmlFor="url">
                          Đường dẫn
                        </p>
                        <input
                          className="form-control"
                          name="url"
                          type="url"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.url}
                          disabled
                        />
                      </div>
                    </div>
                    {isShow ? (
                      <div
                        className="box-footer"
                        style={{
                          display: "flex",
                          marginTop: "25px",
                          marginBottom: "15px",
                          padding: 0,
                        }}
                      >
                        <div
                          className="cancel-btn"
                          onClick={() => {
                            setDisabled(true);
                            setShow(!isShow);
                          }}
                        >
                          Hủy
                        </div>
                        <button
                          type="submit"
                          className="btn btn-info pull-left"
                          style={{ height: "38px", backgroundColor: "#3571a7" }}
                        >
                          Cập nhật
                        </button>
                      </div>
                    ) : (
                      <>
                        {props.permissions.includes("editShop") && (
                          <div className="box-footer">
                            <button
                              tye="button"
                              className="edit-btn"
                              onClick={() => {
                                setDisabled(false);
                                setShow(!isShow);
                              }}
                            >
                              Chỉnh sửa
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="content" style={{ marginTop: "-30px" }}>
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a href="#activity" data-toggle="tab">
                    Activity
                  </a>
                </li>
                <li>
                  <a href="#timeline" data-toggle="tab">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#settings" data-toggle="tab">
                    Settings
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="active tab-pane" id="activity">
                  <div className="post">
                    <div className="user-block">
                      <img
                        className="img-circle img-bordered-sm"
                        src="../../dist/img/user1-128x128.jpg"
                        alt="user image"
                      />
                      <span className="username">
                        <a href="#">Jonathan Burke Jr.</a>
                        <a href="#" className="pull-right btn-box-tool">
                          <i className="fa fa-times"></i>
                        </a>
                      </span>
                      <span className="description">
                        Shared publicly - 7:30 PM today
                      </span>
                    </div>
                    <p>
                      Lorem ipsum represents a long-held tradition for
                      designers, typographers and the like. Some people hate it
                      and argue for its demise, but others ignore the hate as
                      they create awesome tools to help create filler text for
                      everyone from bacon lovers to Charlie Sheen fans.
                    </p>
                    <ul className="list-inline">
                      <li>
                        <a href="#" className="link-black text-sm">
                          <i className="fa fa-share margin-r-5"></i> Share
                        </a>
                      </li>
                      <li>
                        <a href="#" className="link-black text-sm">
                          <i className="fa fa-thumbs-o-up margin-r-5"></i> Like
                        </a>
                      </li>
                      <li className="pull-right">
                        <a href="#" className="link-black text-sm">
                          <i className="fa fa-comments-o margin-r-5"></i>{" "}
                          Comments (5)
                        </a>
                      </li>
                    </ul>

                    <input
                      className="form-control input-sm"
                      type="text"
                      placeholder="Type a comment"
                    />
                  </div>

                  <div className="post clearfix">
                    <div className="user-block">
                      <img
                        className="img-circle img-bordered-sm"
                        src="../../dist/img/user7-128x128.jpg"
                        alt="User Image"
                      />
                      <span className="username">
                        <a href="#">Sarah Ross</a>
                        <a href="#" className="pull-right btn-box-tool">
                          <i className="fa fa-times"></i>
                        </a>
                      </span>
                      <span className="description">
                        Sent you a message - 3 days ago
                      </span>
                    </div>
                    <p>
                      Lorem ipsum represents a long-held tradition for
                      designers, typographers and the like. Some people hate it
                      and argue for its demise, but others ignore the hate as
                      they create awesome tools to help create filler text for
                      everyone from bacon lovers to Charlie Sheen fans.
                    </p>

                    <form className="form-horizontal">
                      <div className="form-group margin-bottom-none">
                        <div className="col-sm-9">
                          <input
                            className="form-control input-sm"
                            placeholder="Response"
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            type="submit"
                            className="btn btn-danger pull-right btn-block btn-sm"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="post">
                    <div className="user-block">
                      <img
                        className="img-circle img-bordered-sm"
                        src="../../dist/img/user6-128x128.jpg"
                        alt="User Image"
                      />
                      <span className="username">
                        <a href="#">Adam Jones</a>
                        <a href="#" className="pull-right btn-box-tool">
                          <i className="fa fa-times"></i>
                        </a>
                      </span>
                      <span className="description">
                        Posted 5 photos - 5 days ago
                      </span>
                    </div>

                    <input
                      className="form-control input-sm"
                      type="text"
                      placeholder="Type a comment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </Fragment>
      )}
    </Formik>
  );
};

SupplierInfor.propTypes = {
  getShopById: PropTypes.func.isRequired,
  updateShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getShopById, updateShop })(
  SupplierInfor
);
