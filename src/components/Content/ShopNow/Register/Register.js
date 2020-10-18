import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import mongoose from 'mongoose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addShop } from '../../../../actions/shopActions';
import './Register.css';

const mapStateToProps = (state) => ({
  shop: state.shop,
});

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      replyBoxHidden: false,
    };
  }

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };

  render() {
    const SignupForm = () => {
      const formik = useFormik({
        initialValues: {
          fullname: '',
          employeePhone: '',
          shopPhone: '',
          password: '',
          name: '',
          email: '',
          busLicenseId: '',
          buscode: '',
          city: '',
          identityCard: '',
          url: '',
        },
        validationSchema: Yup.object({
          fullname: Yup.string()
            .max(255, 'Chỉ được phép nhập ít hơn 255 kí tự')
            .required('Bắt buộc nhập!'),
          employeePhone: Yup.string()
            .max(10, 'Chỉ được phép nhập ít hơn 10 kí tự')
            .required('Bắt buộc nhập!')
            .matches(
              /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              'Số điện thoại không hợp lệ'
            ),
          shopPhone: Yup.string()
            .max(10, 'Chỉ được phép nhập ít hơn 10 kí tự')
            .required('Bắt buộc nhập!')
            .matches(
              /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              'Số điện thoại không hợp lệ'
            ),
          password: Yup.string()
            .max(50, 'Chỉ được phép nhập ít hơn 50 kí tự')
            .required('Bắt buộc nhập!')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              'Mật khẩu bao gồm 8 kí tự: Một kí tự viết hoa, Một kí tự viết thường, Một kí tự số và Một kí tự đặc biệt'
            ),
          name: Yup.string()
            .max(255, 'Chỉ được phép nhập ít hơn 255 kí tự')
            .required('Bắt buộc nhập!'),
          busLicenseId: Yup.string()
            .max(25, 'Chỉ được phép nhập ít hơn 25 kí tự')
            .required('Bắt buộc nhập!'),
          city: Yup.string()
            .max(50, 'Chỉ được phép nhập ít hơn 50 kí tự')
            .required('Bắt buộc nhập!'),
          identityCard: Yup.string()
            .max(20, 'Chỉ được phép nhập ít hơn 20 kí tự')
            .required('Bắt buộc nhập!'),
          email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Bắt buộc nhập!'),
        }),

        convertToNonAccentVNese(str) {
          str = str.toLowerCase();
          str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
          str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
          str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
          str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
          str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
          str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
          str = str.replace(/đ/g, 'd');
          // Some system encode vietnamese combining accent as individual utf-8 characters
          str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
          str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
          return str;
        },

        onSubmit: (values) => {
          const {
            fullname,
            password,
            employeePhone,
            shopPhone,
            identityCard,
            email,
            name,
            busLicenseId,
            city,
          } = values;

          function convertToNonAccentVNese(str) {
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
            str = str.replace(/đ/g, 'd');
            // Some system encode vietnamese combining accent as individual utf-8 characters
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
            return str;
          }
          let res = values.fullname.split(' ');
          let firstName = res.pop(); //remove last element
          firstName = convertToNonAccentVNese(firstName);
          values.fullname = res.join(' '); //join back together

          let matches = convertToNonAccentVNese(values.fullname).match(
            /\b(\w)/g
          ); //take first letter each word
          let surName = matches.join('').toUpperCase();
          console.log(firstName + surName);

          const employee = {
            idRole: 1,
            password,
            fullname,
            phone: employeePhone,
            identityCard,
            email,
            busLicenseId,
            city,
            username: firstName + surName,
            id: mongoose.Types.ObjectId(),
          };
          const shop = {
            busLicenseId,
            city,
            phone: shopPhone,
            name,
            id: mongoose.Types.ObjectId(),
          };

          this.props.addShop({ shop, employee });
        },
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
        if (name === 'name') {
          let url = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          url = url.replace(/\s+/g, '-');
          formik.setFieldValue('url', url);
        }
      };
      return (
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '600px', padding: '5px' }}>
            <div className="reg-inp-wrap">
              <label htmlFor="fullname">Họ và tên chủ cửa hàng: </label>
              <div className="reg-input">
                <input
                  style={{ width: '300px', borderRadius: '3px' }}
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
                  style={{ width: '300px', borderRadius: '3px' }}
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
                {' '}
                Số điện thoại chủ cửa hàng:{' '}
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
              <label htmlFor="password"> Mật khẩu: </label>
              <div className="reg-input">
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  type="text"
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
                    <i
                      style={{ color: '#52c41a', marginLeft: 'auto' }}
                      class="fa fa-check-circle"
                      aria-hidden="true"
                    ></i>
                  </div>

                  {formik.errors.name && formik.touched.name ? (
                    <div className="errors">{formik.errors.name}</div>
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
                    value={'shopnow/cua-hang/' + formik.values.url}
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
            <div className="reg-ava">
              <img src="./img/spiderman.png" alt="ava" />
            </div>

            <p className="reg-title">Đăng ký bán hàng cùng ShopNow</p>
            <p>Cảm ơn đối tác đã tin tưởng và lựa chọn đồng hành cùng Tiki!</p>
            <p>
              Vui lòng hoàn tất thông tin để tạo tài khoản đăng nhập Trung Tâm
              Bán Hàng.
            </p>
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

export default connect(mapStateToProps, { addShop })(Register);
