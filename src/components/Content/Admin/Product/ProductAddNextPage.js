import React, { Component, Fragment } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './product.css';

class ProductAddNextPage extends Component {
  state = {
    selectedFiles: [],
    errorMessage: '',
    propValueList: [],
    isPriceBoardHidden: true,
    skuproduct: { productId: '', sku: '', price: 0, qty: 0 },
    skuProductList: [{ _id: 0, productId: '', sku: '', price: 0, qty: 0 }],
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    categoryList: [
      { _id: 1, value: 'BOOK', label: 'Sách' },
      { _id: 2, value: 'TOY', label: 'Đồ chơi' },
      { _id: 3, value: 'CLOTHES', label: 'Quần áo' },
    ],
    variantList: [],
    category: '',
  };

  onsaveProp = (obj) => {
    this.setState((prepState) => ({
      variantList: [...prepState.variantList, obj.name],
    }));
    this.setState({ isPriceBoardHidden: false });
    this.setState((prepState) => ({
      propValueList: [...prepState.propValueList, obj],
    }));
  };

  addRow = () => {
    let { skuproduct } = this.state,
      obj = {};

    obj = Object.assign(skuproduct);

    this.setState((prepState) => ({
      //add obj to list sku product
      skuProductList: [...prepState.skuProductList, obj],
    }));
  };

  onCellNameEdit = (e, index) => {
    let val = e.target.textContent;
    this.setState((state) => {
      let skuProductList = [...state.skuProductList];

      for (var product of skuProductList) {
        if (product._id == index) {
          const newItem = Object.assign(product);
          newItem['quantity'] = product.quantitydb - val;
          newItem['usedqty'] = val;
          newItem['options'] = this.state.options;
          newItem['createAt'] = new Date();

          skuProductList.splice(index, 1); //xoa 1 phan tu o vi tri index
          skuProductList.splice(index, 0, newItem); //chen newItem vao vi tri thu index
        }
      }

      return {
        skuProductList,
      };
    });
  };

  removeItem = (index) => {
    this.setState((prepState) => {
      let skuProductList = [...prepState.skuProductList];
      skuProductList.splice(index, 1);
      return {
        skuProductList,
      };
    });
  };

  onChangeCategoryList = (selectedItem) => {
    this.setState({ category: selectedItem.value });
  };
  upload = () => {};
  render() {
    const {
      selectedFiles,

      errorMessage,
    } = this.state;

    const dragOver = (e) => {
      e.preventDefault();
    };

    const dragEnter = (e) => {
      e.preventDefault();
    };

    const dragLeave = (e) => {
      e.preventDefault();
    };
    const validateFile = (file) => {
      const validTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/x-icon',
      ];
      if (validTypes.indexOf(file.type) === -1) {
        return false;
      }
      return true;
    };
    const handleFiles = (files) => {
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          files[i].filePath = URL.createObjectURL(files[i]);

          this.setState((prepState) => ({
            selectedFiles: [...prepState.selectedFiles, files[i]],
          }));
        } else {
          files[i]['invalid'] = true;
          this.setState({ errorMessage: 'File type not permitted' });
        }
      }
    };
    const fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;

      if (files.length) {
        handleFiles(files);
      }
    };

    return (
      <Fragment>
        <Fragment>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Đăng ký sản phẩm mới
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="fake_url">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="fake_url">Đăng ký sản phẩm mới</a>
              </li>
              <li>
                <a href="fake_url">Chọn hình ảnh</a>
              </li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              {/* left column */}
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header" style={{ marginTop: '5px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="exampleInputEmail1">
                        Chọn hình ảnh cho sản phẩm
                      </label>
                      <br />
                      <span>1. Kích thước yêu cầu: 240 x 300 px</span>
                      <br />
                      <span>2. Hình ảnh không được chứa tên cửa hàng</span>
                      <br />
                      <span>
                        3. Hình ảnh đầu tiên là hình đại diện cho mỗi nhóm thuộc
                        tính
                      </span>
                    </div>

                    <div>
                      <p
                        style={{
                          background: '#f5f5f5',
                          padding: '10px',
                          fontSize: '16px',
                          fontWeight: '700',
                        }}
                      >
                        Áo choàng Harry Potter - Đen - L
                      </p>
                      <div
                        className="sku-grid"
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                      >
                        {selectedFiles.map((item, index) => {
                          return (
                            <label
                              key={index}
                              htmlFor={item}
                              className="skuproduct-card"
                            >
                              <img
                                style={{ width: '100%', height: '90%' }}
                                className="product-pic"
                                src={item.filePath}
                                alt="product"
                              />
                              <div className="product-info">
                                <input
                                  className="color-checked"
                                  type="checkbox"
                                  id={item}
                                />
                              </div>
                            </label>
                          );
                        })}
                        <div className="upload-area">
                          <i className="fa fa-upload fa-3x" />
                          <p className="upload-text">
                            Kéo và thả ảnh vào để tải ảnh lên
                          </p>
                          {errorMessage}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p
                        style={{
                          background: '#f5f5f5',
                          padding: '10px',
                          fontSize: '16px',
                          fontWeight: '700',
                        }}
                      >
                        Áo choàng Harry Potter - Đen - S
                      </p>
                      <div
                        className="sku-grid"
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                      >
                        {selectedFiles.map((item, index) => {
                          return (
                            <label
                              key={index}
                              htmlFor={item}
                              className="skuproduct-card"
                            >
                              <img
                                style={{ width: '100%', height: '90%' }}
                                className="product-pic"
                                src={item.filePath}
                                alt="product"
                              />
                              <div className="product-info">
                                <input
                                  className="color-checked"
                                  type="checkbox"
                                  id={item}
                                />
                              </div>
                            </label>
                          );
                        })}
                        <div className="upload-area">
                          <i className="fa fa-upload fa-3x" />
                          <p className="upload-text">
                            Kéo và thả ảnh vào để tải ảnh lên
                          </p>
                          {errorMessage}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <button
                        style={{ width: '100px', marginRight: '5px' }}
                        type="button"
                        className="btn btn-block btn-default"
                        onClick={() => this.props.history.push('/add-product')}
                      >
                        Quay lại
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.upload}
                      >
                        Yêu cầu phê duyệt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </Fragment>
      </Fragment>
    );
  }
}

// Category.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired,
// };

// export default connect(mapStateToProps, { getCategories })(Product);
export default ProductAddNextPage;
