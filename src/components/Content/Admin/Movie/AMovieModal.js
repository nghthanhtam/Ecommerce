import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addMovie } from "../../../../state/actions/movieActions";
import * as Yup from "yup";
import Select from "react-select";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";
import { getMovies } from "../../../../state/actions/movieActions";
import { getMovieCates } from "../../../../state/actions/movieCateActions";

const mapStateToProps = (state) => ({
  movieCates: state.movieCate.movieCates,
  isLoaded: state.movieCate.isLoaded,
});

const AMovieModal = (props) => {
  useEffect(() => {
    props.getMovieCates({ limit: 1000, page: 1, query: "" });
  }, []);

  const handleChangeSelect = (selectedItem, setFieldValue) => {
    setFieldValue("idMovieCat", selectedItem.id);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        author: "",
        idMovieCat: "",
      }}
      onSubmit={(values, actions) => {
        values = { ...values, pages: props.pages };
        props.addMovie(values);
        document.getElementById("triggerButton").click();
      }}
      validationSchema={Yup.object().shape({
        //idMovieCat: Yup.string().required("Bắt buộc nhập"),
        name: Yup.string()
          .min(3, "Mô tả phải dài hơn 3 kí tự")
          .max(100, "Chỉ được phép nhập ít hơn 100 kí tự")
          .required("Bắt buộc nhập"),
        author: Yup.string().required("Bắt buộc nhập"),
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
            Thêm phim mới
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
                        Thêm phim mới
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
                      <label htmlFor="idMovieCat" className="col-form-label">
                        Thể loại phim:
                      </label>
                      {props.isLoaded && (
                        <Select
                          name="idMovieCat"
                          onChange={(event) =>
                            handleChangeSelect(event, setFieldValue)
                          }
                          name="idMovieCat"
                          isSearchable={true}
                          options={props.movieCates}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          placeholder="Chọn thể loại phim"
                          onBlur={handleBlur}
                          value={props.movieCates.filter(
                            (option) => option.id === values.idMovieCat
                          )}
                          className={
                            errors.idMovieCat && touched.idMovieCat
                              ? `${styles.formikinput} ${styles.error}`
                              : ""
                          }
                        />
                      )}

                      {touched.idMovieCat && errors.idMovieCat ? (
                        <div className={styles.inputfeedback}>
                          {errors.idMovieCat}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="name" className="col-form-label">
                        Tên phim:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên phim..."
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
                      <label htmlFor="author" className="col-form-label">
                        Tên đạo diễn:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên đạo diễn..."
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.author && touched.author
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.author && errors.author ? (
                        <div className={styles.inputfeedback}>
                          {errors.author}
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
                        !errors.idMovieCat &&
                        !errors.name &&
                        !errors.couponCode &&
                        !errors.timeStart &&
                        !errors.timeEnd &&
                        !errors.minAmount &&
                        !errors.maxDiscount &&
                        !errors.percentage
                          ? false
                          : true
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

export default connect(mapStateToProps, { addMovie, getMovies, getMovieCates })(
  AMovieModal
);
