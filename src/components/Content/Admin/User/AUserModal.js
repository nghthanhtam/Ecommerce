import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addUser } from "../../../../state/actions/userActions";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";

const mapStateToProps = (state) => ({
  user: state.user,
});

const AUserModal = (props) => {
  const changeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    //if user name changes
    if (name === "name") {
      let url = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      url = url.replace(/\s+/g, "-");
      setFieldValue("url", url);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        fullname: "",
        phone: "",
        email: "",
        isDeactivated: false,
      }}
      onSubmit={(values, actions) => {
        props.addUser(values);
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Bắt buộc nhập"),
        password: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập"),
        fullname: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập"),
        phone: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập")
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
        email: Yup.string()
          .max(100, "Chỉ được phép nhập ít hơn 100 kí tự")
          .email("Email không hợp lệ")
          .required("Bắt buộc nhập"),
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
        <React.Fragment>
          <button
            type="button"
            id="triggerButton"
            style={{ float: "right" }}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Thêm khách hàng mới
          </button>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <form onSubmit={handleSubmit}>
                <div className="modal-content">
                  <div className="modal-header">
                    <span>
                      <h3 className="modal-title" id="exampleModalLongTitle">
                        Thêm khách hàng mới
                      </h3>
                    </span>
                    <span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </span>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="username" className="col-form-label">
                        Tên tài khoản:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên tài khoản..."
                        name="username"
                        value={values.username}
                        onChange={(event) => changeName(event, setFieldValue)}
                        onBlur={handleBlur}
                        className={
                          errors.username && touched.username
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.username && errors.username ? (
                        <div className={styles.inputfeedback}>
                          {errors.username}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label">
                        Mật khẩu:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới..."
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.password && errors.password ? (
                        <div className={styles.inputfeedback}>
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullname" className="col-form-label">
                        Họ tên:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ tên..."
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.fullname && touched.fullname
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.fullname && errors.fullname ? (
                        <div className={styles.inputfeedback}>
                          {errors.fullname}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="col-form-label">
                        Số điện thoại:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Nhập số điện thoại..."
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    <div className="form-group">
                      <label htmlFor="email" className="col-form-label">
                        Email:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Nhập email..."
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.email && errors.email ? (
                        <div className={styles.inputfeedback}>
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        !errors.name &&
                        !errors.busLicenseId &&
                        !errors.city &&
                        !errors.phone
                          ? false
                          : true
                      }
                    >
                      Thêm khách hàng
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, { addUser })(AUserModal);
