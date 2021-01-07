import React from "react";
import { connect } from "react-redux";
import { addMovieCate } from "../../../../state/actions/movieCateActions";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";

const mapStateToProps = (state) => ({
  movieCates: state.movieCate.movieCates,
  isLoaded: state.movieCate.isLoaded,
});

const AMovieCateModal = (props) => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      onSubmit={(values, actions) => {
        values = { ...values, pages: props.pages };
        props.addMovie(values);
        document.getElementById("triggerButton").click();
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(100, "Chỉ được phép nhập ít hơn 100 kí tự")
          .required("Bắt buộc nhập"),
        description: Yup.string().required("Bắt buộc nhập"),
      })}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
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
            Thêm thể loại phim mới
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
                        Thêm thể loại phim mới
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
                      <label htmlFor="name" className="col-form-label">
                        Tên thể loại phim:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên thể loại phim..."
                        name="name"
                        value={values.name}
                        onChange={handleChange}
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
                      <label htmlFor="description" className="col-form-label">
                        Mô tả:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mô tả..."
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.description && touched.description
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.description && errors.description ? (
                        <div className={styles.inputfeedback}>
                          {errors.description}
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
                        !errors.name && !errors.description ? false : true
                      }
                    >
                      Thêm mới
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

export default connect(mapStateToProps, { addMovieCate })(AMovieCateModal);
