import React, { Component, Fragment } from 'react';
import Loader from 'react-loader';
import Select from 'react-select';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './product.css';
import { connect } from 'react-redux';
import ProductModal from './ProductModal';
import DuplicateProduct from './DuplicateProduct';
import { updateProductAdd } from '../../../../state/actions/productaddActions';
//rick text editor
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const mapStateToProps = (state) => ({
  productadds: state.productadd.productadds,
});

class ProductAdd extends Component {
  state = {
    selectedFiles: [],
    errorMessage: '',
    propValueList: [],
    isPriceBoardHidden: true,
    skuproduct: {
      index: 0,
      idProduct: 1,
      idShop: 1,
      name: '',
      SKU: '',
      marketPrice: 0,
      price: 0,
      stockAmount: 0,
      variants: {}
    },
    skuProductList: [
      {
        index: 0,
        idProduct: 0,
        idShop: 0,
        name: '',
        SKU: '',
        marketPrice: 0,
        price: 0,
        stockAmount: 0,
        variants: {}
      },
    ],
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    categoryList: [
      { id: 1, name: 'BOOK', value: 1, label: 'Sách' },
      { id: 2, name: 'TOY', value: 2, label: 'Đồ chơi' },
      { id: 3, name: 'CLOTHES', value: 3, label: 'Quần áo' },
    ],
    variantList: [],
    requiredName: '',
    requiredMovie: '',
    requiredCate: '',

    //product state
    name: '',
    description: '',
    brand: '',
    idProduct: 0,
    idShop: 0,
    idMovie: 0,
    idProductCat: 0,
  };

  onsaveProp = (obj) => {
    this.setState((prepState) => ({
      variantList: [...prepState.variantList, { name: obj.name, values: obj.values }],
    }));
    this.setState({ isPriceBoardHidden: false });
    this.setState((prepState) => ({
      propValueList: [...prepState.propValueList, obj],
    }));
  };

  addRow = () => {
    let { skuproduct, skuProductList } = this.state,
      obj = {};
    obj = Object.assign(skuproduct);
    obj.index = Math.max.apply(Math, skuProductList.map(function (element) { return element.index })) + 1
    this.setState((prepState) => ({
      //add obj to list SKU product
      skuProductList: [...prepState.skuProductList, obj],
    }));
  };

  onChange = (e, index, name) => {
    let changeProp, val;
    if (name) changeProp = name
    else {
      val = e.target.textContent
      changeProp = e.target.getAttribute('name')
    }

    this.setState(
      (state) => {
        let skuProductList = [...state.skuProductList];
        for (var product of skuProductList) {
          if (product.index == index) {
            const newItem = Object.assign(product);

            if (name) newItem['variants'][name] = e.value
            else newItem[changeProp] = val;

            skuProductList.splice(index, 1); //xoa 1 phan tu o vi tri index
            skuProductList.splice(index, 0, newItem); //chen newItem vao vi tri thu index
          }
        }

        return {
          skuProductList,
        };
      },
      () => {
        console.log(this.state.skuProductList[0]);
      }
    );
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

  onChangeSelect = (selectedItem, { name }) => {
    if (selectedItem.value) {
      if (name == 'idProductCat') this.setState({ requiredCate: '' })
      if (name == 'idMovie') this.setState({ requiredMovie: '' })
    }
    this.setState({ [name]: selectedItem.value });
  };

  onChangeProductInfor = e => {
    if (!e.target) {
      this.setState({ description: e })
      return
    }
    if (e.target.value !== '') {
      if (e.target.name == 'name') this.setState({ requiredName: '' })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  convertToArrVariant = () => {
    const { variantList } = this.state
    variantList.map(v => {
      v.values = v.values.map(({ label }) => label)
    })
    return variantList
  }

  onSubmit = () => {
    const { skuProductList, idMovie, idProductCat, name, description, brand } = this.state
    const { selectedFiles } = this.props.location
    let arrVariants = this.convertToArrVariant()
    console.log(arrVariants);
    this.props.updateProductAdd({ arrVariants });
    //check blank required-fields
    if (name && idProductCat && idMovie && skuProductList.length > 0) {
      this.props.history.push({
        pathname: '/add-product/photos',
        arrProductVar: skuProductList,
        arrVariants: arrVariants,
        product: { idMovie, idProductCat, name, description, brand },
        selectedFiles
      });
      return;
    }

    if (!name) { this.setState({ requiredName: 'required' }) }
    if (!idMovie) { this.setState({ requiredMovie: 'required' }) }
    if (!idProductCat) { this.setState({ requiredCate: 'required' }) }
  }

  render() {
    const {
      propValueList,
      skuProductList,
      categoryList,
      variantList,
      productList,
      requiredName,
      requiredMovie,
      requiredCate,
      name,
      description,
      brand,
      idProductCat,
    } = this.state,
      settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 4,
        className: 'slider',
      };
    const { updateProduct } = this.props;

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
                      <div className={requiredName}>
                        <input
                          className="form-control"
                          name="name"
                          placeholder="Nhập tên sản phẩm ..."
                          value={name}
                          onChange={this.onChangeProductInfor}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Sản phẩm có thể trùng
                      </label>
                      <div className="duplicate-wrapper">
                        <div className="sliderwrapper">
                          <Slider
                            style={{
                              width: '1150px',
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
                    <div className="form-group"  >
                      <label>Sản phẩm thuộc về phim</label>
                      <div className={requiredMovie}>
                        <Select
                          name="idMovie"
                          onChange={this.onChangeSelect}
                          isSearchable={true}
                          options={categoryList}
                          placeholder="Chọn phim ..."
                          required />
                      </div>
                      <p style={{ marginTop: '5px' }}>Không tìm thấy bộ phim phù hợp với sản phẩm? <span style={{ color: '#337ab7', cursor: 'pointer' }}>Yêu cầu thêm phim mới</span></p>
                    </div>
                    <div className="form-group">
                      <label>Danh mục</label>
                      <div className={requiredCate}>
                        <Select
                          name="idProductCat"
                          onChange={this.onChangeSelect}
                          isSearchable={true}
                          options={categoryList}
                          placeholder="Chọn thể loại ..."
                          required
                        />
                        {/* <div>Nếu sản phẩm của bạn không nằm trong danh sách danh mục của chúng tối, 
                        xin vùi lòng liên hệ với ShopNow thông qua kênh liên lạc dành riêng cho nhà bán hàng</div> */}
                      </div>

                    </div>
                    {idProductCat == 2 || idProductCat == 3 ? (
                      <div className="row-flex">
                        <div className="form-group" style={{ width: '50%', paddingRight: '20px' }}>
                          <label htmlFor="exampleInputEmail1">
                            Thương hiệu
                          </label>
                          <input
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Nhập tên thương hiệu ..."
                            name='brand'
                            value={brand}
                            onChange={this.onChangeProductInfor}
                          />
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <label htmlFor="exampleInputEmail1">Chất liệu</label>
                          <input
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Nhập tên chất liệu ..."
                          />
                        </div>
                      </div>
                    ) : null}
                    {idProductCat == 1 ? (
                      <div className="row-flex">
                        <div
                          className="form-group"
                          style={{ width: '50%', paddingRight: '20px' }}
                        >
                          <label htmlFor="exampleInputEmail1">
                            Tên tác giả
                          </label>
                          <input
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Nhập tên tác giả ..."
                          />
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <label htmlFor="exampleInputEmail1">
                            Nhà xuất bản
                          </label>
                          <input
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Nhập nhà xuất bản ..."
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Sản phẩm có nhiều lựa chọn theo màu sắc, kích cỡ,...?
                      </label>
                      <ProductModal onsaveProp={this.onsaveProp} />
                    </div>
                    <div className="tag-box">
                      {variantList.map((variant, index) => {
                        return (
                          <div key={index} className="prop-tag">
                            <div>{variant.name}</div>
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

                        <div className="row" style={{ width: '105%' }}>
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
                                          options={item.values}
                                          name="select"
                                          onChange={(e) =>
                                            this.onChange(e, index, item.name)
                                          }
                                        />
                                      </td>
                                    ))}

                                    <td
                                      onBlur={(e) => this.onChange(e, index)}
                                      name="name"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                      required
                                    ></td>
                                    <td
                                      name="SKU"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                      onBlur={(e) => this.onChange(e, index)}
                                    ></td>

                                    <td
                                      name="marketPrice"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                      onBlur={(e) => this.onChange(e, index)}
                                    ></td>
                                    <td
                                      name="price"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                      onBlur={(e) => this.onChange(e, index)}
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

                    <div className="form-group">
                      <label>Mô tả sản phẩm </label>
                      <SunEditor
                        name="description"
                        value={description}
                        onChange={this.onChangeProductInfor}
                        height="300"
                        placeholder="Nhập mô tả chi tiết sản phẩm ở đây..." />
                    </div>

                    <button
                      type="button"
                      style={{ float: 'right' }}
                      className="btn btn-primary"
                      data-toggle="modal"
                      onClick={() => this.onSubmit()}
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

export default connect(mapStateToProps, { updateProductAdd })(ProductAdd);

const inputField = {
  '&:focus': {
    outline: 'none',
  },
};
