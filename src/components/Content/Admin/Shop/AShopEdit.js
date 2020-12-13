import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';
import { updateShop, getShopById } from '../../../../state/actions/shopActions';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './helper.module.css'
// class AShopEdit extends Component {
//   state = {
//     name: '',
//     busLicenseId: '',
//     city: '',
//     url: '',
//     phone: '',
//     id: '',
//   };

//   componentDidMount() {
//     console.log(this.props.auth);
//     const { id } = this.props.match.params;

//     axios
//       .get(
//         `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/${id}`,
//         this.tokenConfig(this.props.auth.token)
//       )
//       .then((response) => {
//         let {
//           name,
//           busLicenseId,
//           city,
//           url,
//           phone,
//           id,
//         } = response.data;
//         this.setState({ name, busLicenseId, city, url, phone, id });
//       })
//       .catch((er) => console.log(er.response));
//   }

//   tokenConfig = (token) => {
//     const config = {
//       headers: {
//         'Content-type': 'application/json',
//       },
//     };

//     //Header
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   handleSubmit = (e) => {
//     const { id, name, busLicenseId, city, url, phone, } = this.state;
//     e.preventDefault();

//     const newShop = {
//       id,
//       name,
//       busLicenseId,
//       city,
//       url,
//       phone,
//     };
//     this.props.updateShop(newShop);
//     //Quay về trang chính
//     this.props.history.push('/admin/shop');
//   };

//   handleCancel = (e) => {
//     this.props.history.push('/admin/shop');
//   };

//   render() {
//     const { id, name, busLicenseId, city, url, phone } = this.state;

//     return (
//       <Fragment>
//         {!id ? (
//           <Loader></Loader>
//         ) : (
//             <Fragment>
//               {/* Content Header (Page header) */}
//               <section className="content-header">
//                 <h1>
//                   Nhà bán
//                 {/* <small>Preview</small> */}
//                 </h1>
//                 <ol className="breadcrumb">
//                   <li>
//                     <a href="fake_url">
//                       <i className="fa fa-dashboard" /> Trang chủ
//                   </a>
//                   </li>
//                   <li>
//                     <a href="fake_url">Nhà bán</a>
//                   </li>
//                   <li>
//                     <a href="fake_url">Sửa</a>
//                   </li>
//                 </ol>
//               </section>
//               {/* Main content */}
//               <section className="content" style={{ width: '165vw', marginTop: '10px' }}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="box box-info">
//                       <div className="box-header with-border">
//                         <h3 className="box-title"></h3>
//                       </div>
//                       {/* /.box-header */}
//                       {/* form start */}
//                       <form
//                         className="form-horizontal"
//                         onSubmit={this.handleSubmit}
//                       >
//                         <div className="box-body">
//                           <div className="form-group">
//                             <label
//                               htmlFor="inputEmail3"
//                               className="col-sm-2 control-label"
//                             >
//                               ID
//                           </label>
//                             <div className="col-sm-10">
//                               <input
//                                 name="id"
//                                 type="text"
//                                 placeholder="Loading..."
//                                 className="form-control"
//                                 value={id}
//                                 disabled
//                                 onChange={this.handleChange}
//                               />
//                             </div>
//                           </div>
//                           <div className="form-group">
//                             <label
//                               htmlFor="inputPassword3"
//                               className="col-sm-2 control-label"
//                             >
//                               Họ và tên
//                           </label>
//                             <div className="col-sm-10">
//                               <input
//                                 name="name"
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Loading..."
//                                 value={name}
//                                 onChange={this.handleChange}
//                               />
//                             </div>
//                           </div>
//                           <div className="form-group">
//                             <label
//                               htmlFor="phone"
//                               className="col-sm-2 control-label"
//                             >
//                               Số điện thoại
//                           </label>
//                             <div className="col-sm-10">
//                               <input
//                                 name="phone"
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Loading..."
//                                 value={phone}
//                                 onChange={this.handleChange}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         {/* /.box-body */}
//                         <div className="box-footer">
//                           <button
//                             type="button"
//                             onClick={this.handleCancel}
//                             className="btn btn-default"
//                           >
//                             Cancel
//                         </button>
//                           <button
//                             type="submit"
//                             className="btn btn-info pull-right"
//                           >
//                             Save
//                         </button>
//                         </div>
//                         {/* /.box-footer */}
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </Fragment>
//           )}
//       </Fragment>
//     );
//   }
// }
// const mapStateToProps = (state, props) => {
//   return {
//     history: state.history.history,
//     auth: state.auth,
//   };
// };

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
    isLoaded: state.shop.isLoaded,
    shop: state.shop.shop
  };
};

const AShopEdit = (props) => {
  useEffect(() => {
    const { match, getShopById } = props
    getShopById(match.params.id)
  }, [props.match.params.id]);

  const changeName = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    //if shop name changes
    if (name === 'name') {
      let url = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      url = url.replace(/\s+/g, '-');
      setFieldValue('url', url);
    }
  }

  return (
    !props.isLoaded ? <div>Loading...</div> :
      <Formik
        initialValues={props.shop}
        onSubmit={(values, actions) => {
          props.updateShop(JSON.stringify(values, null, 2))
          //actions.setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(200, 'Chỉ được phép nhập ít hơn 200 kí tự')
            .required('Required'),
          busLicenseId: Yup.string()
            .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
            .required('Required'),
          city: Yup.string()
            .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
            .required('Required'),
          phone: Yup.string()
            .max(30, 'Chỉ được phép nhập ít hơn 30 kí tự')
            .required('Required')
            .matches(
              /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              'Số điện thoại không hợp lệ')
        })}
      >
        {({ values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                  <a href="/admin/shop">Nhà bán</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Chỉnh sửa</a>
                </li>
              </ol>
            </section>
            <section className="content" style={{ width: '165vw', marginTop: '10px' }}>
              <div className="row">
                <div className="col-md-6">
                  <div className="box box-info">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="box-body">
                        <label className={styles.formiklabel} htmlFor="firstName"> Tên nhà bán</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          onChange={(event) => changeName(event, setFieldValue)}
                          onBlur={handleBlur}
                          value={values.name}
                          className={
                            errors.name && touched.name
                              ? `${styles.formikinput} ${styles.error}`
                              : styles.formikinput
                          }
                        />
                        {touched.name && errors.name ? (
                          <div className={styles.inputfeedback}>{errors.name}</div>
                        ) : null}
                        <label className={styles.formiklabel} htmlFor="busLicenseId"> Mã kinh doanh</label>
                        <input
                          name="busLicenseId"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.busLicenseId}
                          className={
                            errors.busLicenseId && touched.busLicenseId
                              ? `${styles.formikinput} ${styles.error}`
                              : styles.formikinput
                          } />
                        {touched.busLicenseId && errors.busLicenseId ? (
                          <div className={styles.inputfeedback}>{errors.busLicenseId}</div>
                        ) : null}
                        <label className={styles.formiklabel} htmlFor="city"> Thành phố/Tỉnh</label>
                        <input
                          name="city"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          className={
                            errors.city && touched.city
                              ? `${styles.formikinput} ${styles.error}`
                              : styles.formikinput
                          } />
                        {touched.city && errors.city ? (
                          <div className={styles.inputfeedback}>{errors.city}</div>
                        ) : null}
                        <label className={styles.formiklabel} htmlFor="url"> Đường dẫn</label>
                        <input
                          name="url"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.url}
                          disabled
                          className={styles.formikinput} />
                        <label className={styles.formiklabel} htmlFor="phone"> Số điện thoại</label>
                        <input
                          name="phone"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          className={
                            errors.phone && touched.phone
                              ? `${styles.formikinput} ${styles.error}`
                              : styles.formikinput
                          } />
                        {touched.phone && errors.phone ? (
                          <div className={styles.inputfeedback}>{errors.phone}</div>
                        ) : null}
                      </div>
                      <div className="box-footer">
                        <button
                          type="button"
                          className="btn btn-default">
                          Hủy
                      </button>
                        <button
                          type="submit"
                          className="btn btn-info pull-right" >
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
  updateShop,
  getShopById
})(AShopEdit);
