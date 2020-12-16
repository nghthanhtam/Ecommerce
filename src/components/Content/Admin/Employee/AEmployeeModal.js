import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../../../../state/actions/employeeActions';
import * as Yup from 'yup';
import { Formik } from 'formik';
import styles from '../../../../assets/css/helper.module.css'

const mapStateToProps = (state) => ({
  employee: state.employee,
});

const AEmployeeModal = (props) => {

  return (
    <Formik
      initialValues={{
        idRole: '',
        username: '',
        password: '',
        fullname: '',
        phone: '',
        identityCard: ''
      }}
      onSubmit={(values, actions) => {
        props.addEmployee(values)
      }}
      validationSchema={Yup.object().shape({
        idRole: Yup.string()
          .required('Bắt buộc nhập'),
        username: Yup.string()
          .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
          .required('Bắt buộc nhập'),
        password: Yup.string()
          .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
          .required('Bắt buộc nhập'),
        fullname: Yup.string()
          .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
          .required('Bắt buộc nhập'),
        phone: Yup.string()
          .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
          .required('Bắt buộc nhập')
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'),
        identityCard: Yup.string()
          .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
          .required('Bắt buộc nhập')
      })} >
      {({ values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <React.Fragment>
          <button
            type="button"
            id="triggerButton"
            style={{ float: 'right' }}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Thêm nhân viên mới
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
                        Thêm nhân viên mới
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
                      <label htmlFor="idRole" className="col-form-label">
                        Vai trò:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Chọn vai trò..."
                        name="idRole"
                        value={values.idRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.idRole && touched.idRole
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput}
                      />
                      {touched.idRole && errors.idRole ? (
                        <div className={styles.inputfeedback}>{errors.idRole}</div>
                      ) : null}
                    </div>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username && touched.username
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput}
                      />
                      {touched.username && errors.username ? (
                        <div className={styles.inputfeedback}>{errors.username}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label">
                        Mật khẩu:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu..."
                        name="city"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput}
                      />
                      {touched.password && errors.password ? (
                        <div className={styles.inputfeedback}>{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullname" className="col-form-label">
                        Họ tên:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        className={errors.fullname && touched.fullname
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput} />
                      {touched.fullname && errors.fullname ? (
                        <div className={styles.inputfeedback}>{errors.fullname}</div>
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
                        className={errors.phone && touched.phone
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput}
                      />
                      {touched.phone && errors.phone ? (
                        <div className={styles.inputfeedback}>{errors.phone}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="identityCard" className="col-form-label">
                        Số CMND:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="identityCard"
                        placeholder="Số CMND..."
                        name="identityCard"
                        value={values.identityCard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.identityCard && touched.identityCard
                          ? `${styles.formikinput} ${styles.error}`
                          : styles.formikinput}
                      />
                      {touched.identityCard && errors.identityCard ? (
                        <div className={styles.inputfeedback}>{errors.identityCard}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        !errors.name && !errors.busLicenseId && !errors.city && !errors.phone ? false : true
                      } >
                      Thêm nhân viên
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

export default connect(mapStateToProps, { addEmployee })(AEmployeeModal);
