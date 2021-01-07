import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateRoleAdmin,
  getRoleAdminById,
} from "../../../../state/actions/roleAdminActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.roleAdmin.isLoaded,
    isUpdated: state.roleAdmin.isUpdated,
    roleAdmin: state.roleAdmin.roleAdmin,
    rolePermissions: state.roleAdmin.rolePermissions,
  };
};

const ARoleEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { match, getRoleAdminById } = props;
    getRoleAdminById(match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/admin/role");
  }, [props.isUpdated]);

  const handleCheck = (e, setFieldValue, values) => {
    let checkedArr = values.checked;
    const { name, value } = e.target;
    if (checkedArr.includes(Number(value)))
      checkedArr = checkedArr.filter((item) => item != value);
    else checkedArr.push(Number(value));
    setFieldValue("checked", checkedArr);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={{
        checked: props.rolePermissions,
        name: props.roleAdmin.name,
      }}
      onSubmit={(values, actions) => {
        const { name, checked } = values;
        props.updateRoleAdmin({
          id: props.match.params.id,
          name,
          permissions: checked,
        });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(200, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Bắt buộc nhập"),
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
            <h1>Phân quyền</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/role">Phân quyền</a>
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
                      <label className={styles.formiklabel} htmlFor="name">
                        Tên phân quyền
                      </label>
                      <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={
                          errors.name && touched.name
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {touched.name && errors.name ? (
                          <div className={styles.inputfeedback}>
                            {errors.name}
                          </div>
                        ) : null}
                        <div
                          style={{
                            display: "inline-block",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý phân quyền</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={66}
                                  checked={values.checked.includes(66)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo phân quyền</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={67}
                                  checked={values.checked.includes(67)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Chỉnh sửa phân quyền</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={68}
                                  checked={values.checked.includes(68)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách phân quyền</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(69)}
                                  value={69}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xóa phân quyền</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý nhân viên</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={6}
                                  checked={values.checked.includes(6)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo nhân viên</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={7}
                                  checked={values.checked.includes(7)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Chỉnh sửa nhân viên</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(8)}
                                  value={8}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách nhân viên</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(9)}
                                  value={9}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xóa nhân viên</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý sản phẩm</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(23)}
                                  value={23}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo sản phẩm</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(24)}
                                  value={24}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Sửa sản phẩm</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(25)}
                                  value={25}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sản phẩm</p>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "inline-block",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý mã giảm giá</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(31)}
                                  value={31}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo mã giảm giá</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(32)}
                                  value={32}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Sửa mã giảm giá</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(33)}
                                  value={33}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách mã giảm giá</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý thể loại phim</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(35)}
                                  value={35}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo thể loại phim</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(36)}
                                  value={36}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Sửa thể loại phim</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(37)}
                                  value={37}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách thể loại phim</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(38)}
                                  value={38}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xóa thể loại phim</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý phim</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(39)}
                                  value={39}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Tạo phim</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(40)}
                                  value={40}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Sửa phim</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(41)}
                                  value={41}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách phim</p>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            justifyContent: "flex-start",
                          }}
                        ></div>
                        <div
                          style={{
                            display: "inline-block",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý bài đánh giá</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(37)}
                                  value={56}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách bài đánh giá</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(57)}
                                  value={57}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Duyệt bài đánh giá</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">
                              Quản lý phần bình luận
                            </h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(59)}
                                  value={59}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách bình luận</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(60)}
                                  value={60}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Duyệt bình luận</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý câu hỏi</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(37)}
                                  value={56}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách các câu hỏi</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(57)}
                                  value={57}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Duyệtcâu hỏi</p>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý câu trả lời</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(64)}
                                  value={64}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem danh sách các câu trả lời</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(65)}
                                  value={65}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Duyệt câu trả lời</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Quản lý đơn hàng</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(10)}
                                  value={10}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Cập nhật trạng thái đơn hàng</p>
                              </label>
                            </div>

                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(13)}
                                  value={13}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Cập nhật thông tin giao hàng</p>
                              </label>
                            </div>
                          </div>
                          <div className="role-label">
                            <h4 className="role-cate">Khác</h4>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(1)}
                                  value={1}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Chỉnh sửa thông tin shop</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(78)}
                                  value={78}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Hủy mã giảm giá đơn hàng</p>
                              </label>
                            </div>
                            <div>
                              <label className="label-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  checked={values.checked.includes(79)}
                                  value={79}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <p>Xem lịch sử hoạt động</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="box-footer">
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={() => {
                            props.history.push("/admin/role");
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="btn btn-info pull-right"
                        >
                          Lưu
                        </button>
                      </div>
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
  updateRoleAdmin,
  getRoleAdminById,
})(ARoleEdit);
