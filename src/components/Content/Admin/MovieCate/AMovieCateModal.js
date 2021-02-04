import React, { useState } from "react";
import { connect } from "react-redux";
import { addMovieCate } from "../../../../state/actions/movieCateActions";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../../../../assets/css/helper.module.css";
import qs from "qs";
import request from "superagent";

const mapStateToProps = (state) => ({
  movieCates: state.movieCate.movieCates,
  isLoaded: state.movieCate.isLoaded,
});

const AMovieCateModal = (props) => {
  const [errUploadMsg, setMsg] = useState(""),
    [isUploading, setUploading] = useState(false),
    [imageUrl, setImageUrl] = useState(""),
    [publicId, setpublicId] = useState("");

  const onDeleteImage = () => {
    setImageUrl("");
  };

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
                setpublicId(res.body.public_id);
                setImageUrl(res.body.url);
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

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      onSubmit={(values, actions) => {
        values = { ...values, pages: props.pages, imageUrl, publicId };
        props.addMovieCate(values);
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

                    <div className="form-group">
                      <label className={styles.formiklabel} htmlFor="imageUrl">
                        Hình ảnh (chỉ được chọn 1 ảnh):
                      </label>
                      <input
                        type="file"
                        id="exampleInputFile"
                        onChange={handleFileSelect}
                        disabled={imageUrl !== ""}
                      />
                      {imageUrl !== "" && (
                        <div
                          className="productvar-grid"
                          style={{ marginTop: "10px" }}
                        >
                          <label className="moviecate-card">
                            <div style={{ display: "flex" }}>
                              <img
                                style={{ width: "150px", height: "160px" }}
                                className="product-pic"
                                src={imageUrl}
                                alt="sản phẩm"
                              />
                              <button
                                onClick={onDeleteImage}
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
                      )}
                      {errUploadMsg !== "" ? (
                        <p style={{ color: "red" }}>{errUploadMsg}</p>
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
