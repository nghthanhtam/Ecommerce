import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { updateUser, getUserById } from "../../../../state/actions/userActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    isLoaded: state.user.isLoaded,
    isUpdated: state.user.isUpdated,
    user: state.user.user,
  };
};

const AUserEdit = (props) => {
  const history = useHistory(),
    [statuses, setStatuses] = useState([
      { label: "Hoạt động", value: "active" },
      { label: "Không hoạt động", value: "inactive" },
    ]);

  useEffect(() => {
    const { match, getUserById } = props;
    getUserById({ id: match.params.id, type: "admin" });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/admin/user");
  }, [props.isUpdated]);

  const onChangeSelect = (selectedItem, setFieldValue) => {
    if (selectedItem.value == "active") {
      setFieldValue("isDeactivated", false);
    } else setFieldValue("isDeactivated", true);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.user}
      onSubmit={(values, actions) => {
        props.updateUser(values);
      }}
      validationSchema={Yup.object().shape({
        fullname: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Required"),
        username: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required"),
        // password: Yup.string()
        //   .max(50, "Chỉ được phép nhập ít hơn 50 kí tự")
        //   .required("Bắt buộc nhập!")
        //   .matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        //     "Mật khẩu phải bao gồm ít nhất: 1 kí tự viết hoa, 1 kí tự viết thường, 1 kí tự số"
        //   ),
        phone: Yup.string()
          .max(30, "Chỉ được phép nhập ít hơn 30 kí tự")
          .required("Required")
          .matches(
            /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
        email: Yup.string()
          .email("Địa chỉ email không hợp lệ")
          .required("Bắt buộc nhập!"),
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
            <h1>Khách hàng</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/user">Khách hàng</a>
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
                      <label className={styles.formiklabel} htmlFor="fullname">
                        {" "}
                        Họ tên khách hàng
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
                      <label className={styles.formiklabel} htmlFor="username">
                        {" "}
                        Tên đăng nhập
                      </label>
                      <input
                        name="username"
                        type="text"
                        disabled
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
                      {/* <label className={styles.formiklabel} htmlFor="password">
                        {" "}
                        Mật khẩu
                      </label>
                      <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
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
                      ) : null} */}
                      <label className={styles.formiklabel} htmlFor="email">
                        {" "}
                        Email
                      </label>
                      <input
                        name="email"
                        type="text"
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
                        <div className={styles.inputfeedback}>
                          {errors.email}
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

                      <label
                        className={styles.formiklabel}
                        htmlFor="isDeactivated"
                      >
                        {" "}
                        Trạng thái hoạt dộng
                      </label>
                      <Select
                        name="isDeactivated"
                        onChange={(e) => onChangeSelect(e, setFieldValue)}
                        isSearchable={true}
                        options={statuses}
                        placeholder="Loading ..."
                        value={statuses.filter((option) => {
                          if (
                            (!values.isDeactivated &&
                              option.value == "active") ||
                            (values.isDeactivated && option.value == "inactive")
                          )
                            return option;
                        })}
                      />
                    </div>

                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/admin/user");
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
  pushHistory,
  updateUser,
  getUserById,
})(AUserEdit);
