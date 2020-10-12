import React, { Component, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader';
import Select from 'react-select';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './product.css';
import ProductModal from './ProductModal';
import DuplicateProduct from './DuplicateProduct';

class ProductAdd extends Component {
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

  render() {
    const {
        propValueList,
        skuProductList,
        selectedFiles,
        categoryList,
        category,
        variantList,
        errorMessage,
        productList,
      } = this.state,
      settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 4,
        className: 'slider',
      };
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
                <a href="fake_url">Đăng ký sản phẩm</a>
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
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                      <input
                        className="form-control"
                        id="name"
                        placeholder="Nhập tên sản phẩm ..."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Sản phẩm có thể trùng
                      </label>
                      <div className="duplicate-wrapper">
                        <div className="sliderwrapper">
                          <Slider
                            style={{
                              width: '100%',
                            }}
                            {...settings}
                          >
                            {productList.map((item, index) => {
                              return <DuplicateProduct key={index} />;
                            })}
                          </Slider>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Danh mục</label>
                      <Select
                        name="idCate"
                        onChange={this.onChangeCategoryList}
                        isSearchable={true}
                        options={categoryList}
                        placeholder="Chọn thể loại ..."
                        required
                      ></Select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Thương hiệu</label>
                      <input
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Nhập tên thương hiệu ..."
                      />
                    </div>
                    {category !== 'BOOK' ? (
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Chất liệu</label>
                        <input
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Nhập chất liệu ..."
                        />
                      </div>
                    ) : null}
                    <div className="form-group">
                      <label>Mô tả sản phẩm (100 kí tự)</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Nhập mô tả ..."
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Sản phẩm có nhiều lựa chọn theo màu sắc, kích cỡ,...?
                      </label>
                      <ProductModal onsaveProp={this.onsaveProp} />
                    </div>
                    <div className="tag-box">
                      {variantList.map((name, index) => {
                        return (
                          <div key={index} className="prop-tag">
                            <div>{name}</div>
                            <div
                              onClick={this.removeProp}
                              className="tag-close"
                            >
                              ×
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <section
                      style={{ marginLeft: '-15px' }}
                      className="content"
                    >
                      <label htmlFor="exampleInputEmail1">
                        Điền thông tin giá sản phẩm
                      </label>

                      {/* /.box-header */}
                      <div className="box-body">
                        <div className="row">
                          <div>
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="example1_length"
                              >
                                <button
                                  type="button"
                                  id="btnAdd"
                                  style={{ float: 'left' }}
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  onClick={this.addRow}
                                >
                                  Thêm dòng
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="example1_filter"
                                className="dataTables_filter"
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="row" style={{ width: '1258px' }}>
                          <div className="col-sm-12">
                            <table
                              id="example1"
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: '2%' }}>#</th>
                                  {propValueList.map((item, index) => (
                                    <th key={index} style={{ width: '15%' }}>
                                      {item.name}
                                    </th>
                                  ))}
                                  <th style={{ width: '20%' }}>Tên sản phẩm</th>
                                  <th style={{ width: '15%' }}>Mã sản phẩm</th>
                                  <th style={{ width: '15%' }}>Giá niêm yết</th>
                                  <th style={{ width: '15%' }}>Giá bán</th>
                                  <th style={{ width: '2%' }}></th>
                                </tr>
                              </thead>

                              <tbody>
                                {skuProductList.map((product, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    {propValueList.map((item, index) => (
                                      <td key={index} bgcolor="#FFFFFF">
                                        <Select
                                          styles={{
                                            control: (base, state) => ({
                                              ...base,
                                              borderColor: 'transparent',
                                            }),
                                          }}
                                          options={item.list}
                                        />
                                      </td>
                                    ))}

                                    <td
                                      onBlur={(e) =>
                                        this.onCellNameEdit(e, index)
                                      }
                                      name="name"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>
                                    <td
                                      name="sku"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>

                                    <td
                                      name="fakeprice"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>
                                    <td
                                      name="price"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>
                                    <td bgcolor="#FFFFFF">
                                      <div
                                        style={{
                                          cursor: 'pointer',
                                          float: 'right',
                                        }}
                                        onClick={() => this.removeItem(index)}
                                        className="fa fa-trash"
                                      ></div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>

                    <button
                      type="button"
                      id="btnUpload"
                      style={{ float: 'right' }}
                      className="btn btn-primary"
                      data-toggle="modal"
                      onClick={() =>
                        this.props.history.push('/add-product/photos')
                      }
                    >
                      Tiếp theo
                    </button>
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
export default ProductAdd;
const inputField = {
  '&:focus': {
    outline: 'none',
  },
};
