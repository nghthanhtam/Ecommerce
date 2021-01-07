import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateEmployee,
  getEmployeeById,
} from "../../../../state/actions/employeeActions";
import Select from "react-select";
import { getRoles } from "../../../../state/actions/roleActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.employee.isLoaded,
    isRolesLoaded: state.role.isLoaded,
    roles: state.role.roles,
    isUpdated: state.employee.isUpdated,
    employee: state.employee.employee,
  };
};

const AShopEmployeeEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { match, location, getEmployeeById, getRoles } = props;
    getEmployeeById(match.params.id);
    getRoles({ limit: 1000, page: 1, query: "", idShop: location.idShop });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/employee/employee");
  }, [props.isUpdated]);

  const handleChangeSelect = (selectedItem, setFieldValue) => {
    setFieldValue("idRole", selectedItem.id);
  };

  return !props.isLoaded && !props.isRolesLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.employee}
      onSubmit={(values, actions) => {
        props.updateEmployee(values);
      }}
      validationSchema={Yup.object().shape({
        identityCard: Yup.string()
          .max(20, "Chỉ được phép nhập ít hơn 20 kí tự")
          .required("Required"),
        fullname: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Required"),
        username: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required"),
        idRole: Yup.string().required("Required"),
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
            <h1>Nhân viên {/* <small>Preview</small> */}</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/employee">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/employee/employee">Nhân viên</a>
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
                        Tên nhân viên
                      </label>
                      <input
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
                        <div className={styles.inputfeedback}>
                          {errors.fullname}
                        </div>
                      ) : null}

                      <label
                        className={styles.formiklabel}
                        htmlFor="busLicenseId"
                      >
                        {" "}
                        Vai trò
                      </label>
                      <Select
                        name="idRole"
                        onChange={(event) =>
                          handleChangeSelect(event, setFieldValue)
                        }
                        isSearchable={true}
                        options={props.roles}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Loading..."
                        onBlur={handleBlur}
                        value={props.roles.filter(
                          (option) => option.id === values.idRole
                        )}
                        className={
                          errors.idRole && touched.idRole
                            ? `${styles.formikinput} ${styles.error}`
                            : ""
                        }
                      />
                      {touched.idRole && errors.idRole ? (
                        <div className={styles.inputfeedback}>
                          {errors.idRole}
                        </div>
                      ) : null}

                      <label
                        className={styles.formiklabel}
                        htmlFor="identityCard"
                      >
                        {" "}
                        CMND
                      </label>
                      <input
                        name="identityCard"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.identityCard}
                        className={
                          errors.identityCard && touched.identityCard
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.identityCard && errors.identityCard ? (
                        <div className={styles.inputfeedback}>
                          {errors.identityCard}
                        </div>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="username">
                        {" "}
                        Tên đăng nhập
                      </label>
                      <input
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
                        <div className={styles.inputfeedback}>
                          {errors.username}
                        </div>
                      ) : null}

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
                          props.history.push("/employee/employee");
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
  updateEmployee,
  getEmployeeById,
  getRoles,
})(AShopEmployeeEdit);
