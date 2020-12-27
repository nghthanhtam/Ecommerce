import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { updateRole, getRoleById } from "../../../../state/actions/roleActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.role.isLoaded,
    isUpdated: state.role.isUpdated,
    role: state.role.role,
    rolePermissions: state.role.rolePermissions,
  };
};

const ARoleEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { match, getRoleById } = props;
    getRoleById(match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) history.push("/seller/role");
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
      initialValues={{ checked: props.rolePermissions, name: props.role.name }}
      onSubmit={(values, actions) => {
        const { name, checked } = values;
        console.log(values.checked);
        props.updateRole({
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
                      {touched.name && errors.name ? (
                        <div className={styles.inputfeedback}>
                          {errors.name}
                        </div>
                      ) : null}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="role-label">
                          <h4 className="role-cate">Quản lý phân quyền</h4>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                value={2}
                                checked={values.checked.includes(2)}
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
                                value={3}
                                checked={values.checked.includes(3)}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Chính sửa phân quyền</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                value={4}
                                checked={values.checked.includes(4)}
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
                                checked={values.checked.includes(5)}
                                value={5}
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
                              <p>Chính sửa nhân viên</p>
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
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
                                checked={values.checked.includes(11)}
                                value={11}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem lịch sử đơn hàng</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(12)}
                                value={12}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem đơn hàng đang trong giao dịch</p>
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
                          <h4 className="role-cate">Quản lý phiếu chi</h4>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(14)}
                                value={14}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Tạo phiếu chi</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(15)}
                                value={15}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Sửa phiếu chi</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(16)}
                                value={16}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem danh sách phiếu chi</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(17)}
                                value={17}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xóa phiếu chi</p>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="role-label">
                          <h4 className="role-cate">Quản lý sản phẩm</h4>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(20)}
                                value={20}
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
                                checked={values.checked.includes(21)}
                                value={21}
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
                                checked={values.checked.includes(22)}
                                value={22}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem danh sản phẩm</p>
                            </label>
                          </div>
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
                              <p>Tạo phiếu nhập kho</p>
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
                              <p>Sửa phiếu nhập kho</p>
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
                              <p>Xem danh sách phiếu nhập kho</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(26)}
                                value={26}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xóa phiếu nhập kho</p>
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
                                checked={values.checked.includes(18)}
                                value={18}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem doanh thu</p>
                            </label>
                          </div>
                          <div>
                            <label className="label-wrapper">
                              <input
                                name="checked"
                                type="checkbox"
                                checked={values.checked.includes(19)}
                                value={19}
                                onChange={(e) =>
                                  handleCheck(e, setFieldValue, values)
                                }
                              />
                              <p>Xem chi phí</p>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="box-footer">
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={() => {
                            props.history.push("/seller/role");
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
  updateRole,
  getRoleById,
})(ARoleEdit);
