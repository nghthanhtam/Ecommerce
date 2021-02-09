import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { pushHistory } from "../../../../state/actions/historyActions";
import {
  updatePayslip,
  getPayslipById,
} from "../../../../state/actions/payslipActions";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    token: state.auth.token,
    isLoaded: state.payslip.isLoaded,
    isUpdated: state.payslip.isUpdated,
    payslip: state.payslip.payslip,
  };
};

const PayslipEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    console.log(props.location.search);
    const { getPayslipById } = props;
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
    getPayslipById(id);
  }, [props.location.search]);
  useEffect(() => {
    if (props.isUpdated) {
      history.push("/seller/payslip");
    }
  }, [props.isUpdated]);

  const [costtypes, setCostTypes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_PRODUCT
        }/api/costtype?limit=${1000}&page=${1}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((res) => {
        setCostTypes(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeSelect = (selectedItem, setFieldValue) => {
    setFieldValue("idCostType", selectedItem.id);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.payslip}
      onSubmit={(values, actions) => {
        props.updatePayslip(values);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .min(3, "Tiêu đề phải dài hơn 3 kí tự")
          .max(100, "Chỉ được phép nhập ít hơn 200 kí tự")
          .required("Bắt buộc nhập"),
        totalAmount: Yup.number()
          .required("Bắt buộc nhập")
          .min(1000, "Tổng chi phải lớn hơn 1000đ"),
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
            <h1>
              Phiếu chi
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/seller/payslip">Phiếu chi</a>
              </li>
              <li>
                <a href="#!">Chỉnh sửa</a>
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
                      <label
                        htmlFor="idCostType"
                        className={styles.formiklabel}
                      >
                        {" "}
                        Loại phiếu chi:
                      </label>
                      <Select
                        name="idCostType"
                        onChange={(e) => handleChangeSelect(e, setFieldValue)}
                        isSearchable={true}
                        options={costtypes}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Chọn loại mã giảm giá"
                        onBlur={handleBlur}
                        value={costtypes.filter(
                          (option) => option.id === values.idCostType
                        )}
                        className={
                          errors.idCostType && touched.idCostType
                            ? `${styles.formikinput} ${styles.error}`
                            : ""
                        }
                      />
                      {touched.idCostType && errors.idCostType ? (
                        <div className={styles.inputfeedback}>
                          {errors.idCostType}
                        </div>
                      ) : null}

                      <label htmlFor="title" className={styles.formiklabel}>
                        {" "}
                        Tiêu đề:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mô tả..."
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.title && touched.title
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.title && errors.title ? (
                        <div className={styles.inputfeedback}>
                          {errors.title}
                        </div>
                      ) : null}

                      <label
                        htmlFor="totalAmount"
                        className={styles.formiklabel}
                      >
                        {" "}
                        Tổng chi phí:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Nhập mã giảm giá..."
                        name="totalAmount"
                        value={values.totalAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.totalAmount && touched.totalAmount
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.totalAmount && errors.totalAmount ? (
                        <div className={styles.inputfeedback}>
                          {errors.totalAmount}
                        </div>
                      ) : null}
                    </div>
                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/seller/payslip");
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
  updatePayslip,
  getPayslipById,
})(PayslipEdit);
