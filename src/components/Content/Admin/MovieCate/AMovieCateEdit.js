import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import {
  updateMovieCate,
  getMovieCateById,
} from "../../../../state/actions/movieCateActions";
import { getMovieCates } from "../../../../state/actions/movieCateActions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";
import qs from "qs";
import request from "superagent";

const mapStateToProps = (state) => {
  return {
    isLoaded: state.movieCate.isLoaded,
    isUpdated: state.movieCate.isUpdated,
    movieCate: state.movieCate.movieCate,
    movieCates: state.movieCate.movieCates,
    isLoadedMovieCate: state.movieCate.isLoaded,
  };
};

const AMovieCateEdit = (props) => {
  const history = useHistory(),
    [errUploadMsg, setMsg] = useState(""),
    [isUploading, setUploading] = useState(false);

  useEffect(() => {
    const { getMovieCateById } = props;
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
    getMovieCateById(id);
    props.getMovieCates({ limit: 1000, page: 1, query: "" });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) {
      history.push("/admin/moviecate");
    }
  }, [props.isUpdated]);

  const handleFileSelect = (e) => {
    const validateFile = (file) => {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/x-icon",
      ];
      if (validTypes.indexOf(file.type) === -1) {
        return false;
      }
      return true;
    };

    const url =
      `https://api.cloudinary.com/v1_1/` +
      process.env.REACT_APP_CLOUD_NAME +
      `/upload`;

    let files = e.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          setUploading(true);
          setMsg("Đang tải ảnh lên...");
          const fileName = files[i].name;

          request
            .post(url)
            .field("upload_preset", "ml_default")
            .field("file", files[i])
            .field("multiple", true)
            .field("api_key", process.env.REACT_APP_API_KEY)
            .field(
              "tags",
              fileName ? `myphotoalbum,${fileName}` : "myphotoalbum"
            )
            .field("context", fileName ? `photo=${fileName}` : "")
            .end((error, res) => {
              if (res) {
                setUploading(false);
                setMsg("");

                // setImages((state) => [
                //   ...state,
                //   {
                //     ...files[i],
                //     url: res.body.url,
                //     publicId: res.body.public_id,
                //     isMain: false,
                //   },
                // ]);
                this.setState((prepState) => ({
                  images: [
                    ...prepState.images,
                    {
                      ...files[i],
                      url: res.body.url,
                      publicId: res.body.public_id,
                      isMain: false,
                    },
                  ],
                }));
              } else {
                setMsg("Không thể upload ảnh " + fileName);
              }
            });
        } else {
          files[i]["invalid"] = true;
        }
      }
    }
  };

  return !props.isLoaded && !props.isLoadedMovieCate ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={props.movieCate}
      onSubmit={(values, actions) => {
        values = { ...values, pages: props.pages };
        props.updateMovieCate(values);
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
        <Fragment>
          <section className="content-header">
            <h1>
              Thể loại phim
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/moviecate">Thể loại phim</a>
              </li>
              <li>
                <a href="javascript:void(0)">Chỉnh sửa</a>
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
                        {" "}
                        Tên thể loại phim:
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên thể loại..."
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

                      <label
                        className={styles.formiklabel}
                        htmlFor="description"
                      >
                        Mô tả:
                      </label>
                      <input
                        type="text"
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
                      <div className="form-group">
                        <label htmlFor="exampleInputFile">Hình ảnh</label>
                        <input
                          type="file"
                          id="exampleInputFile"
                          onChange={(e) => {
                            handleFileSelect(e);
                          }}
                        />
                      </div>
                      <div className="productvar-grid">
                        <label className="skuproduct-card">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ width: "210px", height: "240px" }}
                              className="product-pic"
                              src={props.movieCate.imageUrl}
                              alt="sản phẩm"
                            />
                            <button
                              // onClick={this.onDeleteImage}
                              className="close"
                              style={{
                                marginBottom: "auto",
                                marginTop: "-5px",
                              }}
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                        </label>
                      </div>
                      {errUploadMsg !== "" ? (
                        <p style={{ color: "red" }}>{errUploadMsg}</p>
                      ) : null}
                    </div>
                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/admin/movieCate");
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
  updateMovieCate,
  getMovieCateById,
  getMovieCates,
})(AMovieCateEdit);
