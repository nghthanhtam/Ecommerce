import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addPayslip } from "../../../../state/actions/payslipActions";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";

const mapStateToProps = (state) => ({
  token: state.auth.token,
  employee: state.auth.employee,
  idShop: state.auth.role.idShop,
});

const PayslipModal = (props) => {
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

  return (
    <Formik
      initialValues={{
        title: "",
        totalAmount: "",
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        values = {
          ...values,
          idEmployee: props.employee.id,
          idShop: props.idShop,
          pages: props.pages,
        };

        props.addPayslip(values);
        document.getElementById("triggerButton").click();
      }}
      validationSchema={Yup.object().shape({
        // idCostType: Yup.string().required("Bắt buộc nhập"),
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
        <React.Fragment>
          <button
            type="button"
            id="triggerButton"
            style={{ float: "right" }}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Thêm phiếu chi mới
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
                        Thêm Phiếu chi mới
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
                      <label htmlFor="idCostType" className="col-form-label">
                        Loại Phiếu chi:
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="title" className="col-form-label">
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="totalAmount" className="col-form-label">
                        Tổng chi phí:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Nhập tổng chi..."
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
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        !errors.title && !errors.totalAmount ? false : true
                      }
                    >
                      Thêm phiếu chi
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

export default connect(mapStateToProps, { addPayslip })(PayslipModal);
