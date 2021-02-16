import React, { Fragment, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser, clearUser } from "../../../../state/actions/userActions";
import { showModal } from "../../../../state/actions/modalActions";
import Loading from "../Loading/Loading";

const mapStateToProps = (state) => ({
  isAdded: state.user.isAdded,
  userAdded: state.user.userAdded,
  error: state.error,
});

class UserRegister extends React.Component {
  state = { phoneErrMsg: "", usernameErrMsg: "", isTransition: false };
  componentDidMount() {
    this.props.clearUser();
    this.props.showModal({ show: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAdded, showModal, error } = this.props;
    if (isAdded && prevProps.isAdded !== isAdded) {
      this.setState({ isTransition: false });
      showModal({ show: true, modalName: "modalVerify" });
    }
    if (error && prevProps.error !== error) {
      if (error.id == "ERROR_USERNAME") {
        this.setState({ isTransition: false, usernameErrMsg: error.msg });
      } else if (error.id == "ERROR_PHONE") {
        this.setState({ isTransition: false, phoneErrMsg: error.msg });
      } else if (error.id == "ERROR_EMAIL") {
        this.setState({ isTransition: false, emailErrMsg: error.msg });
      }
    }
  }

  isEmptyObject(value) {
    return (
      value && Object.keys(value).length === 0 && value.constructor === Object
    );
  }

  render() {
    const {
        phoneErrMsg,
        usernameErrMsg,
        emailErrMsg,
        isTransition,
      } = this.state,
      { userAdded } = this.props;
    const SignupForm = (props) => {
      const formik = useFormik({
        initialValues: {
          fullname: this.isEmptyObject(userAdded) ? "" : userAdded.fullname,
          username: this.isEmptyObject(userAdded) ? "" : userAdded.username,
          password: this.isEmptyObject(userAdded) ? "" : userAdded.password,
          email: this.isEmptyObject(userAdded) ? "" : userAdded.email,
          phone: this.isEmptyObject(userAdded) ? "" : userAdded.phone,
        },
        validationSchema: Yup.object({
          fullname: Yup.string()
            .max(255, "Chỉ được phép nhập ít hơn 255 kí tự")
            .required("Bắt buộc nhập!")
            .matches(
              /^[a-zA-Z0-9_ Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ&.-]+$/,
              "Họ tên không được bao gồm các kí tự đặc biệt"
            ),
          phone: Yup.string()
            .max(10, "Chỉ được phép nhập ít hơn 10 kí tự")
            .required("Bắt buộc nhập!")
            .matches(
              /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              "Số điện thoại không hợp lệ"
            ),
          password: Yup.string()
            .max(50, "Chỉ được phép nhập ít hơn 50 kí tự")
            .required("Bắt buộc nhập!")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              "Mật khẩu gồm 8 kí tự, bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số, không bao gồm kí tự đặc biệt"
            ),
          username: Yup.string()
            .matches(
              /^[a-zA-Z0-9_ Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ&.-]+$/,
              "Tên đăng nhập không được bao gồm các kí tự đặc biệt"
            )
            .max(255, "Chỉ được phép nhập ít hơn 255 kí tự")
            .required("Bắt buộc nhập!"),
          email: Yup.string()
            .email("Địa chỉ email không hợp lệ")
            .required("Bắt buộc nhập!"),
        }),

        onSubmit: (values) => {
          const { fullname, username, password, phone, email } = values;
          const newUser = {
            fullname,
            username,
            password,
            phone,
            email,
          };
          newUser.type = "user";
          this.props.addUser(newUser);
          this.setState({
            isTransition: true,
            phoneErrMsg: "",
            emailErrMsg: "",
            usernameErrMsg: "",
          });
        },
      });

      // const handleChange = (e) => {
      //   const { name, value } = e.target;
      //   formik.setFieldValue([name], value);
      // };

      return (
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "600px", padding: "25px" }}>
            <div className="reg-inp-wrap">
              <label htmlFor="fullname">Họ tên: </label>
              <div className="reg-input">
                <input
                  style={{ width: "300px", borderRadius: "3px" }}
                  className="form-control"
                  name="fullname"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname && formik.touched.fullname ? (
                  <div className="errors">{formik.errors.fullname}</div>
                ) : null}
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="phone"> Số điện thoại: </label>
              <div className="reg-input">
                <input
                  style={{ width: "300px", borderRadius: "3px" }}
                  className="form-control"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {phoneErrMsg !== "" &&
                  formik.values.phone != "" &&
                  !formik.errors.phone &&
                  !formik.touched.phone && (
                    <div className="errors">{phoneErrMsg}</div>
                  )}
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="errors">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="email"> Địa chỉ email: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {emailErrMsg !== "" &&
                  formik.values.emailErrMsg != "" &&
                  !formik.errors.email &&
                  !formik.touched.email && (
                    <div className="errors">{emailErrMsg}</div>
                  )}
                {formik.errors.email && formik.touched.email ? (
                  <div className="errors">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="username"> Tên đăng nhập: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {usernameErrMsg !== "" &&
                  formik.values.username != "" &&
                  !formik.errors.username &&
                  !formik.touched.username && (
                    <div className="errors">{usernameErrMsg}</div>
                  )}
                {formik.errors.username && formik.touched.username ? (
                  <div className="errors">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="password"> Mật khẩu: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="errors-pw">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Tạo tài khoản
          </button>
        </form>
      );
    };

    return (
      <Fragment>
        {isTransition && <Loading />}
        <div>
          <div className="reg-container">
            <div className="reg-card">
              <div className="reg-title-wrapper">
                <div className="reguser-text">
                  <p className="reg-title">Tạo tài khoản mua hàng</p>
                  <p>
                    Cảm ơn đối tác đã tin tưởng và lựa chọn đồng hành cùng
                    ShopNow!
                  </p>
                </div>
                <div className="reg-ava">
                  <img src="./img/spiderman.png" alt="ava" />
                </div>
              </div>
              <SignupForm />
              <p className="reg-commit">
                Khi bạn nhấn Đăng ký, bạn đã đồng ý thực hiện mọi giao dịch mua
                bán theo điều kiện sử dụng và chính sách của ShopNow.
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

UserRegister.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addUser, clearUser, showModal })(
  UserRegister
);
