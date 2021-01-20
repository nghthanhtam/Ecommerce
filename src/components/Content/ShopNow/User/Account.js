import React, { useEffect, useState, Fragment } from "react";
import "../../../../assets/css/user-profile.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserProfile from "./UserProfile";
import styles from "../../../../assets/css/helper.module.css";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getUserById,
  updateUser,
  updatePass,
} from "../../../../state/actions/userActions";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    id: state.authUser.user.id,
    isLoaded: state.user.isLoaded,
    isUpdated: state.user.isUpdated,
    isUpdatePassError: state.user.isUpdatePassError,
    user: state.user.user,
  };
};

const Account = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [isShow, setShow] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [isPassWrong, setIsPassWrong] = useState(false);

  useEffect(() => {
    props.getUserById({ id: props.id, type: "user" });
  }, [props.user.id]);

  useEffect(() => {
    if (!disabled) document.getElementById("username").focus();
  }, [disabled]);

  useEffect(() => {
    if (props.isUpdated && !props.isUpdatePassError) {
      setDisabled(true);
      setShow(false);
    }
  }, [props.isUpdated]);

  useEffect(() => {
    if (props.isUpdatePassError) {
      setIsPassWrong(true);
    }
  }, [props.isUpdatePassError]);

  const onCheckChangePassword = (e) => {
    setChangePassword(!isChangePassword);
  };

  const changeField = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue("oldPassword", value);
    setIsPassWrong(false);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={{
        ...props.user,
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        if (!(values == props.user)) {
          values.type = "user";
          props.updateUser(values);
          props.updatePass(values);
        }
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(100, "Chỉ được phép nhập ít hơn 100 kí tự")
          .required("Bắt buộc nhập"),
        fullname: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Bắt buộc nhập"),
        phone: Yup.string()
          .max(11, "Chỉ được phép nhập ít hơn 11 kí tự")
          .required("Bắt buộc nhập")
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
        email: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .email("Email không hợp lệ")
          .required("Bắt buộc nhập"),
        newPassword: Yup.string().required("Bắt buộc nhập!"),
        confirmPassword: Yup.string()
          .required("Bắt buộc nhập!")
          .test(
            "passwords-match",
            "Mật khẩu không trùng khớp. Xin hãy nhập lại!",
            function (value) {
              return this.parent.newPassword === value;
            }
          ),
        // .matches(
        //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        //   "Mật khẩu phải bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số"
        // ),
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
        <div>
          <Header />
          <div
            style={{
              zIndex: 10,
              marginBottom: "300px",
              position: "relative",
              backgroundColor: "#f7f7f7",
            }}
          >
            <div className="nohome-section"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <UserProfile selectedLink="/shopnow/user/account" />

              <form className="acc-container" onSubmit={handleSubmit}>
                <label className={styles.formiklabel} htmlFor="username">
                  {" "}
                  Tên đăng nhập
                </label>
                <input
                  disabled={disabled}
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={
                    errors.username && touched.username
                      ? `${styles.formikinput} ${styles.error}`
                      : styles.formikinput
                  }
                />
                {touched.username && errors.username ? (
                  <div className={styles.inputfeedback}>{errors.username}</div>
                ) : null}
                <label className={styles.formiklabel} htmlFor="fullname">
                  {" "}
                  Họ tên
                </label>
                <input
                  disabled={disabled}
                  name="fullname"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  className={
                    errors.fullname && touched.fullname
                      ? `${styles.formikinput} ${styles.error}`
                      : styles.formikinput
                  }
                />
                {touched.fullname && errors.fullname ? (
                  <div className={styles.inputfeedback}>{errors.fullname}</div>
                ) : null}
                <label className={styles.formiklabel} htmlFor="phone">
                  {" "}
                  Số điện thoại liên lạc
                </label>
                <input
                  disabled={disabled}
                  name="phone"
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
                  <div className={styles.inputfeedback}>{errors.phone}</div>
                ) : null}
                <label className={styles.formiklabel} htmlFor="email">
                  {" "}
                  Email
                </label>
                <input
                  disabled={disabled}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    errors.email && touched.email
                      ? `${styles.formikinput} ${styles.error}`
                      : styles.formikinput
                  }
                />
                {touched.email && errors.email ? (
                  <div className={styles.inputfeedback}>{errors.email}</div>
                ) : null}

                <label className="changeps-label">
                  <input
                    name="createEmployee"
                    type="checkbox"
                    checked={isChangePassword}
                    onChange={onCheckChangePassword}
                  />
                  <p>Đổi mật khẩu</p>
                </label>

                <div
                  style={{
                    display: isChangePassword ? "" : "none",
                  }}
                >
                  <label className={styles.formiklabel} htmlFor="oldPassword">
                    {" "}
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    disabled={disabled}
                    name="oldPassword"
                    onChange={(e) => changeField(e, setFieldValue)}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    className={
                      errors.oldPassword && touched.oldPassword
                        ? `${styles.formikinput} ${styles.error}`
                        : styles.formikinput
                    }
                  />
                  {isPassWrong && (
                    <div className={styles.inputfeedback}>
                      Mật khẩu hiện tại chưa chính xác.
                    </div>
                  )}

                  {touched.oldPassword && errors.oldPassword ? (
                    <div className={styles.inputfeedback}>
                      {errors.oldPassword}
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    display: isChangePassword ? "" : "none",
                  }}
                >
                  <label className={styles.formiklabel} htmlFor="newPassword">
                    {" "}
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    disabled={disabled}
                    name="newPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                    className={
                      errors.newPassword && touched.newPassword
                        ? `${styles.formikinput} ${styles.error}`
                        : styles.formikinput
                    }
                  />
                  {touched.newPassword && errors.newPassword ? (
                    <div className={styles.inputfeedback}>
                      {errors.newPassword}
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    display: isChangePassword ? "" : "none",
                  }}
                >
                  <label
                    className={styles.formiklabel}
                    htmlFor="confirmPassword"
                  >
                    {" "}
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    disabled={disabled}
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? `${styles.formikinput} ${styles.error}`
                        : styles.formikinput
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <div className={styles.inputfeedback}>
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>

                {isShow ? (
                  <div
                    className="box-footer"
                    style={{ display: "flex", marginTop: "25px", padding: 0 }}
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
              </form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, {
  getUserById,
  updateUser,
  updatePass,
})(Account);
