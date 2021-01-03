import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import mongoose from "mongoose";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addShop, clearShop } from "../../../../state/actions/shopActions";
import "./Register.css";

const mapStateToProps = (state) => ({
  isAdded: state.shop.isAdded,
  history: state.history.history,
});

class Register extends React.Component {
  state = {};

  componentDidMount() {
    this.props.clearShop();
  }
  componentDidUpdate(prevState, prevProps) {
    console.log("componentDidUpdate");
    const { isAdded, history } = this.props;
    if (isAdded && prevProps.isAdded !== isAdded)
      history.push("/shopnow/register-success");
  }

  render() {
    const SignupForm = () => {
      const [isChecked, setCheck] = useState(false);
      const formik = useFormik({
        initialValues: {
          fullname: "",
          employeePhone: "",
          shopPhone: "",
          username: "",
          password: "",
          name: "",
          email: "",
          busLicenseId: "",
          buscode: "",
          city: "",
          identityCard: "",
          url: "",
        },
        validationSchema: Yup.object({
          fullname: Yup.string()
            .max(255, "Chỉ được phép nhập ít hơn 255 kí tự")
            .required("Bắt buộc nhập!"),
          employeePhone: Yup.string()
            .max(10, "Chỉ được phép nhập ít hơn 10 kí tự")
            .required("Bắt buộc nhập!")
            .matches(
              /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              "Số điện thoại không hợp lệ"
            ),
          shopPhone: Yup.string()
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
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              "Mật khẩu phải bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số"
            ),
          name: Yup.string()
            .max(255, "Chỉ được phép nhập ít hơn 255 kí tự")
            .required("Bắt buộc nhập!"),
          username: Yup.string()
            .max(255, "Chỉ được phép nhập ít hơn 255 kí tự")
            .required("Bắt buộc nhập!"),
          busLicenseId: Yup.string()
            .max(25, "Chỉ được phép nhập ít hơn 25 kí tự")
            .required("Bắt buộc nhập!"),
          city: Yup.string()
            .max(50, "Chỉ được phép nhập ít hơn 50 kí tự")
            .required("Bắt buộc nhập!"),
          identityCard: Yup.string()
            .min(9, "Số CMND phải có ít nhất 9 số")
            .required("Bắt buộc nhập!"),
          email: Yup.string()
            .email("Địa chỉ email không hợp lệ")
            .required("Bắt buộc nhập!"),
        }),

        onSubmit: (values) => {
          const {
            fullname,
            username,
            password,
            employeePhone,
            shopPhone,
            identityCard,
            email,
            name,
            busLicenseId,
            city,
          } = values;

          const employee = {
            idRole: 1,
            password,
            fullname,
            phone: employeePhone,
            identityCard,
            email,
            busLicenseId,
            city,
            username,
            id: mongoose.Types.ObjectId(),
          };
          const shop = {
            busLicenseId,
            city,
            phone: shopPhone,
            name,
            id: mongoose.Types.ObjectId(),
          };

          this.props.addShop({ shop, employee, type: "user" });
        },
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
        //if shop name changes
        if (name === "name") {
          let url = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          url = url.replace(/\s+/g, "-");
          formik.setFieldValue("url", url);

          if (value !== "") {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/urlcheck/`,
                { name: value }
              )
              .then((res) => {
                if (res) {
                  console.log(res.status);
                  if (res.status == 200) setCheck(true);
                }
              })
              .catch((er) => {
                let error = { ...er };
                if (error.response.status == 400) setCheck(false);
              });
          }
        }
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
              <label htmlFor="fullname">Họ và tên chủ cửa hàng: </label>
              <div className="reg-input">
                <input
                  style={{ width: "300px", borderRadius: "3px" }}
                  className="form-control"
                  id="fullname"
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
              <label htmlFor="shopPhone"> Số điện thoại cửa hàng: </label>
              <div className="reg-input">
                <input
                  style={{ width: "300px", borderRadius: "3px" }}
                  className="form-control"
                  id="shopPhone"
                  name="shopPhone"
                  type="text"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shopPhone}
                />
                {formik.errors.shopPhone && formik.touched.shopPhone ? (
                  <div className="errors">{formik.errors.shopPhone}</div>
                ) : null}
              </div>
            </div>
            <div className="reg-inp-wrap">
              <label htmlFor="identityCard"> Số CMND: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="identityCard"
                  name="identityCard"
                  type="identityCard"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identityCard}
                />
                {formik.errors.identityCard && formik.touched.identityCard ? (
                  <div className="errors">{formik.errors.identityCard}</div>
                ) : null}
              </div>
            </div>
            <div className="reg-inp-wrap">
              <label htmlFor="employeePhone">
                {" "}
                Số điện thoại chủ cửa hàng:{" "}
              </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="employeePhone"
                  name="employeePhone"
                  type="employeePhone"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employeePhone}
                />
                {formik.errors.employeePhone && formik.touched.employeePhone ? (
                  <div className="errors">{formik.errors.employeePhone}</div>
                ) : null}
              </div>
            </div>
            <div className="reg-inp-wrap">
              <label htmlFor="email"> Địa chỉ email của chủ cửa hàng: </label>
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

            <div className="reg-inp-wrap">
              <label htmlFor="name">Tên cửa hàng:</label>
              <div className="col-flex">
                <div className="reg-shopname">
                  <div className="form-control">
                    <input
                      //className="form-control"
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {isChecked ? (
                      <i
                        style={{ color: "#52c41a", marginLeft: "auto" }}
                        className="fa fa-check-circle"
                        aria-hidden="true"
                      ></i>
                    ) : formik.values.name !== "" ? (
                      <i
                        style={{ color: "red", marginLeft: "auto" }}
                        className="fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        style={{ color: "red", marginLeft: "auto" }}
                        className="fa fa-shopping-basket"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {formik.errors.name && formik.touched.name ? (
                    <div className="errors">{formik.errors.name}</div>
                  ) : null}
                  {!isChecked && formik.values.name !== "" ? (
                    <div className="errors">Tên đã được sử dụng</div>
                  ) : null}
                </div>
                <div className="reg-url-input">
                  <input
                    className="form-control"
                    id="url"
                    name="url"
                    type="text"
                    disabled
                    onChange={handleChange}
                    value={"shopnow/cua-hang/" + formik.values.url}
                  />
                </div>
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="busLicenseId">Mã số đăng ký kinh doanh: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="busLicenseId"
                  name="busLicenseId"
                  type="text"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.busLicenseId}
                />
                {formik.errors.busLicenseId && formik.touched.busLicenseId ? (
                  <div className="errors">{formik.errors.busLicenseId}</div>
                ) : null}
              </div>
            </div>

            <div className="reg-inp-wrap">
              <label htmlFor="city">Tỉnh/thành phố: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="city"
                  name="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.errors.city && formik.touched.city ? (
                  <div className="errors">{formik.errors.city}</div>
                ) : null}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Đăng ký bán hàng
          </button>
        </form>
      );
    };

    return (
      <div>
        <div className="reg-container">
          <div className="reg-card">
            <div className="reg-title-wrapper">
              <div className="reg-text">
                <p className="reg-title">Đăng ký bán hàng cùng ShopNow</p>
                <p>
                  Cảm ơn đối tác đã tin tưởng và lựa chọn đồng hành cùng Tiki!
                </p>
                <p>
                  Vui lòng hoàn tất thông tin để tạo tài khoản đăng nhập Trung
                  Tâm Bán Hàng.
                </p>
              </div>
              <div className="reg-ava">
                <img src="./img/spiderman.png" alt="ava" />
              </div>
            </div>

            <SignupForm />
            <p className="reg-commit">
              Bằng cách gửi đơn đăng ký của bạn, bạn đồng ý với Thỏa thuận dịch
              vụ của chúng tôi và xác nhận rằng thông tin bạn cung cấp đã hoàn
              chỉnh và chính xác.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  addShop: PropTypes.func.isRequired,
  //isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { addShop, clearShop })(Register);
