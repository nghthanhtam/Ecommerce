import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import {
  updateMovie,
  getMovieById,
  getMovies,
} from "../../../../state/actions/movieActions";
import { getMovieCates } from "../../../../state/actions/movieCateActions";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";
import qs from "qs";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.movie.isLoaded,
    isUpdated: state.movie.isUpdated,
    movie: state.movie.movie,
    movieCates: state.movieCate.movieCates,
    isLoadedMovieCat: state.movieCate.isLoaded,
  };
};

const AMovieEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const { getMovieById } = props;
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
    getMovieById(id);
    props.getMovieCates({ limit: 1000, page: 1, query: "" });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) {
      history.push("/admin/movie");
    }
  }, [props.isUpdated]);

  const handleChangeSelect = (selectedItem, setFieldValue) => {
    setFieldValue("idMovieCat", selectedItem.id);
  };

  return props.isLoaded && props.isLoadedMovieCat ? (
    <Formik
      initialValues={props.movie}
      onSubmit={(values, actions) => {
        values = { ...values, pages: props.pages };
        props.updateMovie(values);
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
        <Fragment>
          <section className="content-header">
            <h1>
              Nhà bán
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/movie">Mã giảm giá</a>
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
                        className={styles.formiklabel}
                        htmlFor="idMovieCat"
                      >
                        Thể loại phim
                      </label>
                      <Select
                        name="idMovieCat"
                        onChange={(event) =>
                          handleChangeSelect(event, setFieldValue)
                        }
                        isSearchable={true}
                        options={props.movieCates}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Loading..."
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
                      {touched.idMovieCat && errors.idMovieCat ? (
                        <div className={styles.idMovieCat}>
                          {errors.idMovieCat}
                        </div>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="name">
                        {" "}
                        Tên phim:
                      </label>
                      <input
                        type="text"
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

                      <label className={styles.formiklabel} htmlFor="author">
                        Đạo diễn:
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập mã tên đạo diễn..."
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
                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/admin/movie");
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
  ) : (
    <div>Loading...</div>
  );
};

export default connect(mapStateToProps, {
  pushHistory,
  updateMovie,
  getMovieById,
  getMovies,
  getMovieCates,
})(AMovieEdit);
