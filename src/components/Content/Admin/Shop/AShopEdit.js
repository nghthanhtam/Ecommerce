import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { updateShop, getShopById } from "../../../../state/actions/shopActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.shop.isLoaded,
    isUpdated: state.shop.isUpdated,
    shop: state.shop.shop,
  };
};

const AShopEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { match, getShopById } = props;
    getShopById(match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/admin/shop");
  }, [props.isUpdated]);

  const changeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    //if shop name changes
    if (name === "name") {
      let url = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      url = url.replace(/\s+/g, "-");
      setFieldValue("url", url);
    }
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.shop}
      onSubmit={(values, actions) => {
        props.updateShop(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Required"),
        busLicenseId: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required"),
        city: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required"),
        phone: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required")
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
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
            <h1>
              Nhà bán
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/shop">Nhà bán</a>
              </li>
              <li>
                <a href="javascript:void(0);">Chỉnh sửa</a>
              </li>
            </ol>
          </section>
          <section
            className="content"
            style={{ width: "165vw", marginTop: "10px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="box box-info">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="box-body">
                      <label className={styles.formiklabel} htmlFor="firstName">
                        {" "}
                        Tên nhà bán
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={(event) => changeName(event, setFieldValue)}
                        onBlur={handleBlur}
                        value={values.name}
                        className={
                          errors.name && touched.name
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.name && errors.name ? (
                        <div className={styles.inputfeedback}>
                          {errors.name}
                        </div>
                      ) : null}
                      <label
                        className={styles.formiklabel}
                        htmlFor="busLicenseId"
                      >
                        {" "}
                        Mã kinh doanh
                      </label>
                      <input
                        name="busLicenseId"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.busLicenseId}
                        className={
                          errors.busLicenseId && touched.busLicenseId
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.busLicenseId && errors.busLicenseId ? (
                        <div className={styles.inputfeedback}>
                          {errors.busLicenseId}
                        </div>
                      ) : null}
                      <label className={styles.formiklabel} htmlFor="city">
                        {" "}
                        Thành phố/Tỉnh
                      </label>
                      <input
                        name="city"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        className={
                          errors.city && touched.city
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.city && errors.city ? (
                        <div className={styles.inputfeedback}>
                          {errors.city}
                        </div>
                      ) : null}
                      <label className={styles.formiklabel} htmlFor="url">
                        {" "}
                        Đường dẫn
                      </label>
                      <input
                        name="url"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.url}
                        disabled
                        className={styles.formikinput}
                      />
                      <label className={styles.formiklabel} htmlFor="phone">
                        {" "}
                        Số điện thoại
                      </label>
                      <input
                        name="phone"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className={
                          errors.phone && touched.phone
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.phone && errors.phone ? (
                        <div className={styles.inputfeedback}>
                          {errors.phone}
                        </div>
                      ) : null}
                    </div>
                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/admin/shop");
                        }}
                      >
                        Hủy
                      </button>
                      <button type="submit" className="btn btn-info pull-right">
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, {
  pushHistory,
  updateShop,
  getShopById,
})(AShopEdit);
