import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser, clearUser } from "../../../../state/actions/userActions";
import { showModal } from "../../../../state/actions/modalActions";

const mapStateToProps = (state) => ({
  isAdded: state.user.isAdded,
});

class UserRegister extends React.Component {
  state = {};

  componentDidMount() {
    this.props.clearUser();
    this.props.showModal({ show: false });
  }

  componentDidUpdate(prevState, prevProps) {
    const { isAdded, showModal } = this.props;
    if (isAdded && prevProps.isAdded !== isAdded)
      showModal({ show: true, modalName: "modalVerify" });
  }

  render() {
    const SignupForm = () => {
      const formik = useFormik({
        initialValues: {
          fullname: "",
          username: "",
          password: "",
          email: "",
          phone: "",
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
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
              "Mật khẩu gồm 6 kí tự, bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số"
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
        },
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
      };

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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
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
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
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
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
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
                  onChange={handleChange}
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
    );
  }
}

UserRegister.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addUser, clearUser, showModal })(
  UserRegister
);
