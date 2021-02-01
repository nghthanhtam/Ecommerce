import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import {
  updatePromotion,
  getPromotionById,
} from "../../../../state/actions/promotionActions";
import { getPromotionTypes } from "../../../../state/actions/promotionTypeActions";
import { getProductCates } from "../../../../state/actions/productCateActions";
import { getMovieCates } from "../../../../state/actions/movieCateActions";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../../assets/css/helper.module.css";
import { useHistory } from "react-router-dom";
import qs from "qs";

//1 - giảm toàn hóa đơn
//2 - giảm theo loại sp
//3 - giảm theo loại phim

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.promotion.isLoaded,
    isLoadedProductCates: state.productCate.isLoaded,
    isLoadedMovieCates: state.movieCate.isLoaded,
    isUpdated: state.promotion.isUpdated,
    promotion: state.promotion.promotion,
    promotionTypes: state.promotionType.promotionTypes,
    productCates: state.productCate.productCates,
    movieCates: state.movieCate.movieCates,
    isLoadedPromoType: state.promotionType.isLoaded,
  };
};

const APromotionEdit = (props) => {
  const history = useHistory();
  useEffect(() => {
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
    props.getPromotionById(id);
    props.getPromotionTypes({ limit: 1000, page: 1, query: "" });
    props.getProductCates({ limit: 1000, page: 1, query: "" });
    props.getMovieCates({ limit: 1000, page: 1, query: "" });
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.isUpdated) {
      history.push("/admin/promotion");
    }
  }, [props.isUpdated]);

  const handleChangeSelect = (selectedItem, type, setFieldValue) => {
    if (type == "promotionType")
      setFieldValue("idPromotionType", selectedItem.id);
    else {
      if (!selectedItem) {
        setFieldValue("arrayCat", []);
        return;
      }
      setFieldValue(
        "arrayCat",
        selectedItem.map(({ id }) => id)
      );
    }
  };

  return !props.isLoaded ||
    !props.isLoadedPromoType ||
    !props.isLoadedProductCates ||
    !props.isLoadedMovieCates ? (
    <div>Loading...</div>
  ) : (
    <Formik
      initialValues={{
        ...props.promotion,
        arrayCat:
          props.promotion.PromotionProductCats &&
          props.promotion.PromotionProductCats.length > 0
            ? props.promotion.PromotionProductCats
            : props.promotion.PromotionMovieCats,
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        values = { ...values, pages: props.pages };
        props.updatePromotion(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(3, "Mô tả phải dài hơn 3 kí tự")
          .max(100, "Chỉ được phép nhập ít hơn 100 kí tự")
          .required("Bắt buộc nhập"),
        couponCode: Yup.string().required("Bắt buộc nhập"),
        timeStart: Yup.string().required("Bắt buộc nhập"),
        timeEnd: Yup.string().required("Bắt buộc nhập"),
        minAmount: Yup.string().required("Bắt buộc nhập"),
        maxDiscount: Yup.string().required("Bắt buộc nhập"),
        percentage: Yup.string().required("Bắt buộc nhập"),
        arrayCat: Yup.array().required("Chọn ít nhất 1 thể loại!"),
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
            <h1>Chương trình khuyến mại</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/admin">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/admin/promotion">Mã giảm giá</a>
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
                        htmlFor="idPromotionType"
                      >
                        Loại giảm giá
                      </label>
                      <Select
                        name="idPromotionType"
                        onChange={(e) =>
                          handleChangeSelect(e, "promotionType", setFieldValue)
                        }
                        isSearchable={true}
                        options={props.promotionTypes}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder="Loading..."
                        onBlur={handleBlur}
                        value={props.promotionTypes.filter(
                          (option) => option.id === values.idPromotionType
                        )}
                        className={
                          errors.idPromotionType && touched.idPromotionType
                            ? `${styles.formikinput}`
                            : ""
                        }
                      />
                      {touched.idPromotionType && errors.idPromotionType ? (
                        <div className={styles.idPromotionType}>
                          {errors.idPromotionType}
                        </div>
                      ) : null}

                      {values.idPromotionType == 2 ? (
                        <>
                          {" "}
                          <label
                            className={styles.formiklabel}
                            htmlFor="arrayCat"
                          >
                            Thể loại sản phẩm được giảm
                          </label>
                          <Select
                            onChange={(e) =>
                              handleChangeSelect(e, "arrayCat", setFieldValue)
                            }
                            defaultValue={props.productCates.filter((el) =>
                              values.PromotionProductCats.map(
                                ({ idProductCat }) => idProductCat
                              ).includes(el.id)
                            )}
                            isMulti
                            name="arrayCat"
                            options={props.productCates}
                            getOptionLabel={(option) => option.description}
                            getOptionValue={(option) => option.id}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                          {touched.arrayCat && errors.arrayCat ? (
                            <div className={styles.inputfeedback}>
                              {errors.arrayCat}
                            </div>
                          ) : null}
                        </>
                      ) : null}

                      {values.idPromotionType == 3 ? (
                        <>
                          <label
                            className={styles.formiklabel}
                            htmlFor="arrayCat"
                          >
                            Thể loại phim được giảm
                          </label>
                          <Select
                            onChange={(e) =>
                              handleChangeSelect(e, "arrayCat", setFieldValue)
                            }
                            defaultValue={props.movieCates.filter((el) =>
                              values.PromotionMovieCats.map(
                                ({ idMovieCat }) => idMovieCat
                              ).includes(el.id)
                            )}
                            isMulti
                            name="arrayCat"
                            options={props.movieCates}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                          {touched.arrayCat && errors.arrayCat ? (
                            <div className={styles.inputfeedback}>
                              {errors.arrayCat}
                            </div>
                          ) : null}
                        </>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="name">
                        {" "}
                        Mô tả:
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập mô tả..."
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
                        htmlFor="couponCode"
                      >
                        Mã giảm giá:
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá..."
                        name="couponCode"
                        value={values.couponCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.couponCode && touched.couponCode
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.couponCode && errors.couponCode ? (
                        <div className={styles.inputfeedback}>
                          {errors.couponCode}
                        </div>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="timeStart">
                        Thời gian bắt đầu:
                      </label>
                      <input
                        type="datetime-local"
                        name="timeStart"
                        placeholder="Chọn thời gian bắt đầu"
                        value={values.timeStart}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.timeStart && touched.timeStart
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.timeStart && errors.timeStart ? (
                        <div className={styles.inputfeedback}>
                          {errors.timeStart}
                        </div>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="timeEnd">
                        Thời gian kết thúc
                      </label>
                      <input
                        type="datetime-local"
                        name="timeEnd"
                        placeholder="Chọn thời gian kết thúc..."
                        value={values.timeEnd}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.timeEnd && touched.timeEnd
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.timeEnd && errors.timeEnd ? (
                        <div className={styles.inputfeedback}>
                          {errors.timeEnd}
                        </div>
                      ) : null}

                      <label className={styles.formiklabel} htmlFor="minAmount">
                        Giá trị hóa đơn tối thiểu:
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập giá trị hóa đơn tối thiểu..."
                        name="minAmount"
                        value={values.minAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.minAmount && touched.minAmount
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.minAmount && errors.minAmount ? (
                        <div className={styles.inputfeedback}>
                          {errors.minAmount}
                        </div>
                      ) : null}

                      <label
                        className={styles.formiklabel}
                        htmlFor="maxDiscount"
                      >
                        Mức giảm giá tối đa:
                      </label>
                      <input
                        type="number"
                        id="maxDiscount"
                        placeholder="Nhập mức giảm giá tối đa..."
                        name="maxDiscount"
                        value={values.maxDiscount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.maxDiscount && touched.maxDiscount
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.maxDiscount && errors.maxDiscount ? (
                        <div className={styles.inputfeedback}>
                          {errors.maxDiscount}
                        </div>
                      ) : null}

                      <label
                        className={styles.formiklabel}
                        htmlFor="percentage"
                      >
                        Phần trăm giảm giá:
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập phần trăm giảm giá..."
                        name="percentage"
                        value={values.percentage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.percentage && touched.percentage
                            ? `${styles.formikinput} ${styles.error}`
                            : styles.formikinput
                        }
                      />
                      {touched.percentage && errors.percentage ? (
                        <div className={styles.inputfeedback}>
                          {errors.percentage}
                        </div>
                      ) : null}
                    </div>
                    <div className="box-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          props.history.push("/admin/promotion");
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
  updatePromotion,
  getPromotionById,
  getPromotionTypes,
  getProductCates,
  getMovieCates,
})(APromotionEdit);
