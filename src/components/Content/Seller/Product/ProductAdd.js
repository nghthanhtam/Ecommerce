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
    variantList: [],
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
      variants: [[], [], []]
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
        variants: [[], [], []]
      },
    ],
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    categoryList: [
      { id: 1, name: 'BOOK', value: 1, label: 'Sách' },
      { id: 2, name: 'TOY', value: 2, label: 'Đồ chơi' },
      { id: 3, name: 'CLOTHES', value: 3, label: 'Quần áo' },
    ],
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

  componentDidMount() {
    if (this.props.location.details) {
      const { arrProductVar, arrVariants, product } = this.props.location.details
      const { name, description, brand, idProduct, idShop, idMovie, idProductCat } = this.props.location.details.product
      this.setState({
        arrProductVar,
        skuProductList: arrProductVar,
        variantList: arrVariants,
        name, description, brand, idProduct, idShop, idMovie, idProductCat,
      })
    }
  }

  onsaveProp = (objList) => {
    this.setState({
      variantList: objList,
    }) //() => console.log(this.state.variantList));

    this.setState({ isPriceBoardHidden: false });
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

  getVarValue = (variant, product) => {
    // console.log(variant.name.label);
    // if (variant.name.label == 'color') return this.state.variantList[0].values[0]
    // else if (variant.name.label == 'size') return this.state.variantList[1].values[0]
    const { variantList } = this.state
    let tempArr = [], res
    if (product.variants[0].length > 0 || product.variants[1].length > 0) {
      if (product.variants[0].length > 0) tempArr = product.variants[0]
      else tempArr = product.variants[1]

      for (let k in tempArr) {
        for (let i in variantList) {
          if (variantList[i].name.label == variant.name.label) {
            for (let j in variantList[i].values) {
              if (variantList[i].values[j].value == tempArr[k][Object.keys(tempArr[k])[0]]) {
                res = variantList[i].values[j]
                return res
              }
            }
          }
        }
      }
      return res
    }
    else if (product.variants[2].length > 0) {

      for (let k in product.variants[2]) {
        for (let i in variantList) {
          if (variantList[i].name.label == variant.name.label) {
            console.log(variantList[i].name.label)
            for (let j in variantList[i].values) {
              if (variantList[i].values[j].value == product.variants[2][k]) {
                res = variantList[i].values[j]
                console.log(res);
                return res
              }
            }
          }
        }
      }
      //return this.state.variantList[0].values[0]
    }
  }

  onChange = (e, index, name, variant) => {
    let changeProp, val;
    if (!name) { //thay đổi text
      val = e.target.textContent
      changeProp = e.target.getAttribute('name')
    }

    this.setState(
      (state) => {
        let skuProductList = [...state.skuProductList];
        for (var product of skuProductList) {
          if (product.index == index) {
            //const newItem = Object.assign(product);

            // if (name) { //thay đổi select
            //   newItem['variants'] = [[], [], []]
            //   if (!variant.__isNew__) {
            //     if (!e.__isNew__) newItem['variants'][2].push(e.value)
            //     else newItem['variants'][1].push({ [variant.value]: e.value })
            //   } else newItem['variants'][0].push({ [variant.name]: e.value })
            // }
            // else newItem[changeProp] = val; //thay đổi text

            // skuProductList.splice(index, 1); //xoa 1 phan tu o vi tri index
            // skuProductList.splice(index, 0, newItem); //chen newItem vao vi tri thu index

            if (name) { //thay đổi select
              if (!variant.__isNew__) {
                if (!e.__isNew__) product['variants'][2].push(e.value)
                else product['variants'][1].push({ [variant.value]: e.value })
              } else product['variants'][0].push({ [variant.name]: e.value })
            }
            else product[changeProp] = val; //thay đổi text
          }
        }

        return {
          skuProductList,
        };
      },
      () => {
        console.log('skuproductList: ', this.state.skuProductList);
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

  onSubmit = () => {
    const { skuProductList, variantList, idMovie, idProductCat, name, description, brand } = this.state

    //check blank required-fields
    if (name && idProductCat && idMovie && skuProductList.length > 0) {
      this.props.history.push({
        pathname: '/add-product/photos',
        arrProductVar: skuProductList,
        arrVariants: variantList,
        product: { idMovie, idProductCat, name, description, brand },
        selectedFiles: this.props.location.details ? this.props.location.details.selectedFiles : null
      });
      return;
    }

    if (!name) { this.setState({ requiredName: 'required' }) }
    if (!idMovie) { this.setState({ requiredMovie: 'required' }) }
    if (!idProductCat) { this.setState({ requiredCate: 'required' }) }
  }

  render() {
    const {
      variantList,
      skuProductList,
      categoryList,
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
                          value={categoryList.filter(option => option.value === idProductCat)} />
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
                          value={categoryList.filter(option => option.value === idProductCat)}
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
                      <label>Mô tả sản phẩm </label>
                      <SunEditor
                        name="description"
                        value={description}
                        onChange={this.onChangeProductInfor}
                        height="300"
                        placeholder="Nhập mô tả chi tiết sản phẩm ở đây..." />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Sản phẩm có nhiều lựa chọn theo màu sắc, kích cỡ,...?
                      </label>
                      <ProductModal variantList={variantList} onsaveProp={this.onsaveProp} />
                    </div>
                    <div className="tag-box">
                      {variantList.map((variant, index) => {
                        return (
                          <div key={index} className="prop-tag">
                            <div>{variant.name.label}</div>
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
                                  {variantList.map((item, index) => (
                                    <th key={index} style={{ width: '15%' }}>
                                      {item.name.label}
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
                                    {variantList.map((item, varindex) => (
                                      <td key={varindex} bgcolor="#FFFFFF">
                                        <Select
                                          styles={{
                                            control: (base, state) => ({
                                              ...base,
                                              borderColor: 'transparent',
                                            }),
                                          }}
                                          options={item.values}
                                          value={this.getVarValue(item, product)}
                                          name="select"
                                          onChange={(e) =>
                                            this.onChange(e, index, item.name.label, item)
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
