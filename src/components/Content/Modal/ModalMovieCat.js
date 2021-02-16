import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getMovieCates } from "../../../state/actions/movieCateActions";
import { addSurvey } from "../../../state/actions/userActions";
import { showModal } from "../../../state/actions/modalActions";
import { Formik } from "formik";
import * as Yup from "yup";

const mapStateToProps = (state) => {
  return {
    history: state.history.history,
    isLoaded: state.movieCate.isLoaded,
    movieCates: state.movieCate.movieCates,
    isSurVeyAdded: state.user.isSurVeyAdded,
  };
};

const ModalMovieCat = (props) => {
  useEffect(() => {
    props.getMovieCates({ limit: 1000, page: 1, query: "" });
    console.log(props.movieCates);
  }, []);

  const handleCheck = (e, setFieldValue, values) => {
    let checkedArr = values.checked;
    const { value } = e.target;
    if (checkedArr.includes(Number(value)))
      checkedArr = checkedArr.filter((item) => item != value);
    else checkedArr.push(Number(value));
    setFieldValue("checked", checkedArr);
  };

  return !props.isLoaded ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={{ checked: [] }}
      onSubmit={(values, actions) => {
        const { checked } = values;
        props.addSurvey({ arrayCat: checked });
      }}
      validationSchema={Yup.object().shape({
        checked: Yup.array().required("Bạn chưa chọn thể loại phim yêu thích!"),
      })}
    >
      {({ values, errors, handleSubmit, setFieldValue }) => (
        <Fragment>
          <div className="modal-wrapper">
            <div
              className="login-box"
              style={{
                width: "730px",
                background: "#fff",
                padding: "20px 40px 20px 30px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "5px",
                backgroundColor: "#f7f7f7",
              }}
            >
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="box-body">
                  <h4 className="title-cate">
                    Chọn thể loại phim mà bạn thích:
                  </h4>
                  <p style={{ fontSize: "15px", marginTop: "-8px" }}>
                    Chúng tôi không hề mong muốn bạn rời đi mà không có món hàng
                    nào trên tay!
                  </p>
                  <div className="caterole-label">
                    <div className="list-wrapper">
                      <div className="moviecate-grid">
                        {props.movieCates.map((cate, index) => {
                          return (
                            <div key={cate.id} className="cate-wrapper">
                              <label className="moviecat-wrapper">
                                <input
                                  name="checked"
                                  type="checkbox"
                                  value={cate.id}
                                  checked={values.checked.includes(cate.id)}
                                  onChange={(e) =>
                                    handleCheck(e, setFieldValue, values)
                                  }
                                />
                                <div className="cate-wrapper">
                                  <div className="cate-card">
                                    <img src={cate.imageUrl} alt="photo" />
                                    <div className="info-cate">
                                      <h3>{cate.name}</h3>
                                      <p>{cate.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div
                    className="box-footer"
                    style={{
                      display: "flex",
                      backgroundColor: "#f7f7f7",
                      padding: 0,
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => {
                        props.showModal({ show: false });
                      }}
                      style={{
                        marginRight: "auto",
                      }}
                    >
                      Bỏ qua
                    </button>
                    {errors.checked ? (
                      <div style={{ color: "red" }}>{errors.checked}</div>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-info pull-right"
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, {
  getMovieCates,
  addSurvey,
  showModal,
})(ModalMovieCat);
