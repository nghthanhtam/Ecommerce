import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateAdmin,
  getAdminById,
} from "../../../../state/actions/adminActions";
import Select from "react-select";
import { getRoleAdmins } from "../../../../state/actions/roleAdminActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.admin.isLoaded,
    isRolesLoaded: state.roleAdmin.isLoaded,
    roleAdmins: state.roleAdmin.roleAdmins,
    isUpdated: state.admin.isUpdated,
    admin: state.admin.admin,
  };
};

const AEmployeeEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { match, getAdminById, getRoleAdmins } = props;
    getAdminById(match.params.id);
    getRoleAdmins({ limit: 1000, page: 1, query: "" });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/admin/employee");
  }, [props.isUpdated]);

  const handleChangeSelect = (selectedItem, setFieldValue) => {
    setFieldValue("idRole", selectedItem.id);
  };

  return !props.isLoaded && !props.isRolesLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.admin}
      onSubmit={(values, actions) => {
        props.updateAdmin(values);
      }}
      validationSchema={Yup.object().shape({
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
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/employee">Nhân viên</a>
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
                        options={props.roleAdmins}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Loading..."
                        onBlur={handleBlur}
                        value={props.roleAdmins.filter(
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
                          props.history.push("/admin/employee");
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
  updateAdmin,
  getAdminById,
  getRoleAdmins,
})(AEmployeeEdit);
