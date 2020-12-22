import React from "react";
import { connect } from "react-redux";
import { addPayslip } from "../../../../state/actions/payslipActions";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";

const mapStateToProps = (state) => ({
  payslip: state.payslip,
});

const APayslipModal = (props) => {
  const changeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    //if payslip name changes
    if (name === "name") {
      let url = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      url = url.replace(/\s+/g, "-");
      setFieldValue("url", url);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        busLicenseId: "",
        city: "",
        url: "",
        phone: "",
      }}
      onSubmit={(values, actions) => {
        props.addPayslip(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Bắt buộc nhập"),
        busLicenseId: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập"),
        city: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập"),
        phone: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Bắt buộc nhập")
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
        <React.Fragment>
          <button
            type="button"
            id="triggerButton"
            style={{ float: "right" }}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Thêm nhà bán mới
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
                        Thêm nhà bán mới
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
                      <label htmlFor="fullname" className="col-form-label">
                        Tên nhà bán:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên nhà bán..."
                        name="name"
                        value={values.name}
                        onChange={(event) => changeName(event, setFieldValue)}
                        onBlur={handleBlur}
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="username" className="col-form-label">
                        Mã kinh doanh:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mã kinh doanh..."
                        name="busLicenseId"
                        value={values.busLicenseId}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label">
                        Thành phố/Tỉnh:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập thành phố..."
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label">
                        Đường dẫn:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="url"
                        value={values.url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                      />
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

export default connect(mapStateToProps, { addPayslip })(APayslipModal);
