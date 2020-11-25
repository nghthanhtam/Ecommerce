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
import { getMovies } from '../../../../state/actions/movieActions';
import PropTypes from 'prop-types';
//rick text editor
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { getProductCates } from '../../../../state/actions/productCateActions';
import { getProducts } from '../../../../state/actions/productActions';

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
  productCates: state.productCate.productCates,
  products: state.product.products,
  isMovieLoaded: state.movie.isLoaded,
  isProductCatesLoaded: state.productCate.isLoaded,
  isProductLoaded: state.product.isLoaded,
  idShop: state.auth.role.idShop,
});

class ProductAdd extends Component {
  state = {
    selectedFiles: [],
    errorMessage: '',
    variantList: [],
    isPriceBoardHidden: true,
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
        variants: [[], [], []],
        selectedFiles: []
      },
    ],
    productList: [1,],
    requiredName: '',
    requiredMovie: '',
    requiredCate: '',

    //product state
    name: '',
    description: '',
    brand: '',
    idProduct: undefined,
    idMovie: 0,
    idProductCat: 0,
  };

  componentDidMount() {
    const { getMovies, getProductCates } = this.props
    const { productUpdate, details } = this.props.location
    console.log(this.props.location);
    getMovies({ limit: 1000, page: 1, query: '' });
    getProductCates({ limit: 1000, page: 1, query: '' })

    //details là data truyền từ ProductNextPage
    if (details) {
      const { arrProductVar, arrVariants } = this.props.location.details
      const { name, description, brand, idProduct, idShop, idMovie, idProductCat } = details.product
      this.setState({
        arrProductVar,
        skuProductList: arrProductVar,
        variantList: arrVariants,
        name, description, brand, idProduct, idShop, idMovie, idProductCat,
      })
    }

    //productUpdate là data của object prodVar cần edit
    // if(productUpdate){
    //   const { name, description, brand, idProduct, idShop, idMovie, idProductCat } = productUpdate.Product
    //   this.setState({
    //     arrProductVar,
    //     skuProductList: arrProductVar,
    //     variantList: arrVariants,
    //     name, description, brand, idProduct, idShop, idMovie, idProductCat,
    //   })
    // }
  }

  onsaveProp = (objList) => {
    this.setState({
      variantList: objList,
    }) //() => console.log(this.state.variantList));

    this.setState({ isPriceBoardHidden: false });
  };

  addRow = () => {
    let { skuProductList, idProduct } = this.state,
      obj = {};
    const { idShop } = this.props
    obj = {
      index: 0,
      idProduct,
      idShop: idShop,
      name: '',
      SKU: '',
      marketPrice: 0,
      price: 0,
      stockAmount: 0,
      variants: [[], [], []],
      selectedFiles: []
    }
    obj.index = Math.max.apply(Math, skuProductList.map(function (element) { return element.index })) + 1

    this.setState((prepState) => ({
      //add obj to list SKU product
      skuProductList: [...prepState.skuProductList, obj],
    }), () => console.log(this.state.skuProductList));
  };

  getVarValue = (variant, product) => {
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
            for (let j in variantList[i].values) {
              if (variantList[i].values[j].value == product.variants[2][k]) {
                res = variantList[i].values[j]
                return res
              }
            }
          }
        }
      }
    }
  }

  onChangeProductVar = (e, index, name, variant) => {
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
            if (index == 0) { //defaul idShop va idProduct la 0
              product.idProduct = this.state.idProduct
              product.idShop = this.props.idShop
            }
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
              if (!variant.name.__isNew__) {
                if (!e.__isNew__) {

                  if (product['variants'][2].length == 0) product['variants'][2].push(e.value)
                  else {
                    for (let ele of this.state.variantList) {
                      if (ele.name.value == variant.name.value) {
                        for (let v of ele.values) {
                          if (product['variants'][2].includes(v.value)) { //kt xem variant này trc đó chọn value chưa
                            product['variants'][2] = product['variants'][2].filter(ele => ele != v.value) //nếu có thì xóa đi
                            product['variants'][2].push(e.value) //và thay bằng value mới chọn
                            return {
                              skuProductList,
                            };
                          }
                        }
                        product['variants'][2].push(e.value)
                      }
                    }
                  }
                }
                else { product['variants'][1].push({ [variant.name.value]: e.value }) }
              } else product['variants'][0].push({ [variant.name.label]: e.label })
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
    if (selectedItem.id) {
      if (name == 'idProductCat') this.setState({ requiredCate: '' })
      if (name == 'idMovie') this.setState({ requiredMovie: '' })
    }
    this.setState({ [name]: selectedItem.id });
  };

  onChangeProductInfor = e => {
    if (!e.target) {
      this.setState({ description: e })
      return
    }
    const { name, value } = e.target
    //search for similar products
    if (name == 'name') {
      let query = ''
      query = value
      if (value == '') query = undefined
      this.props.getProducts({ limit: 50, page: 1, query })
    }

    if (value !== '') {
      if (name == 'name') this.setState({ requiredName: '' })
    }
    this.setState({ [name]: value })
  }

  onSubmit = () => {
    const { idProduct, skuProductList, variantList, idMovie, idProductCat, name, description, brand } = this.state

    //check if required-fields are blank
    if (name && idProductCat && idMovie && skuProductList.length > 0) {
      this.props.history.push({
        pathname: '/add-product/photos',
        arrProductVar: skuProductList,
        arrVariants: variantList,
        product: { idMovie, idProductCat, name, description, brand, details: { idProduct: 1, detail: 'AUTHOR', value: 'Nguyen Nhat Anh' } },
        selectedFiles: this.props.location.details ? this.props.location.details.selectedFiles : null,
        idProduct
      });
      return;
    }

    if (!name) { this.setState({ requiredName: 'required' }) }
    if (!idMovie) { this.setState({ requiredMovie: 'required' }) }
    if (!idProductCat) { this.setState({ requiredCate: 'required' }) }
  }

  removeProp = (variant) => {
    this.setState((prepState) => ({
      variantList: [...prepState.variantList.filter(ele => ele.name.value !== variant.name.value)],
    }));
  }

  //dùng hàm này để chọn bán sp đã có sẵn
  pickProduct = (idProduct) => {
    this.setState({ idProduct })
  }

  render() {
    const {
      variantList,
      skuProductList,
      requiredName,
      requiredMovie,
      requiredCate,
      name,
      description,
      brand,
      idProductCat,
      idMovie
    } = this.state,
      settings = {
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        className: 'slider',
      };
    const { products, movies, productCates, isMovieLoaded, isProductCatesLoaded, isProductLoaded } = this.props;

    return (
      <Fragment>
        {!isMovieLoaded || !isProductCatesLoaded ? (
          <Loader></Loader>
        ) : <Fragment>
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
                      {isProductLoaded && products.length > 0 &&
                        <div className="form-group" >
                          <label htmlFor="exampleInputEmail1">
                            Sản phẩm có thể trùng
                        </label>
                          <div className="duplicate-wrapper">
                            <div className="similar-wrapper">
                              <Slider
                                {...settings}
                                slidesToShow={products.length <= 5 ? products.length : 5}
                              >
                                {products.map((item, index) => {
                                  return <DuplicateProduct key={index} item={item} arr={movies} pickProduct={this.pickProduct} />;
                                })}
                              </Slider>
                            </div>
                          </div>
                        </div>}

                      <div className="form-group"  >
                        <label>Sản phẩm thuộc về phim</label>
                        <div className={requiredMovie}>
                          <Select
                            name="idMovie"
                            onChange={this.onChangeSelect}
                            isSearchable={true}
                            options={movies}
                            placeholder="Chọn phim ..."
                            value={movies.filter(option => option.id === idMovie)}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id} />
                        </div>
                        <p style={{ marginTop: '5px' }}>Không tìm thấy bộ phim phù hợp với sản phẩm? <span style={{ color: '#337ab7', cursor: 'pointer' }}>Yêu cầu thêm phim mới</span></p>
                      </div>
                      <div className="form-group">
                        <label>Danh mục</label>
                        <div className={requiredCate}>
                          <Select
                            styles={{ menu: provided => ({ ...provided, zIndex: 9999 }) }}
                            name="idProductCat"
                            onChange={this.onChangeSelect}
                            isSearchable={true}
                            options={productCates}
                            placeholder="Chọn thể loại ..."
                            getOptionLabel={(option) => option.description}
                            getOptionValue={(option) => option.id}
                            value={productCates.filter(option => option.id === idProductCat)}
                          />
                          {/* <div>Nếu sản phẩm của bạn không nằm trong danh sách danh mục của chúng tối, 
                      xin vui lòng liên hệ với ShopNow thông qua kênh liên lạc dành riêng cho nhà bán hàng</div> */}
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
                          setContents={description}
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
                                onClick={() => this.removeProp(variant)}
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
                                              this.onChangeProductVar(e, index, item.name.label, item)
                                            }
                                          />
                                        </td>
                                      ))}

                                      <td
                                        onBlur={(e) => this.onChangeProductVar(e, index)}
                                        name="name"
                                        bgcolor="#FFFFFF"
                                        style={inputField}
                                        contentEditable="true"
                                        suppressContentEditableWarning={true}
                                      >{product.name}</td>
                                      <td
                                        onBlur={(e) => this.onChangeProductVar(e, index)}
                                        name="SKU"
                                        bgcolor="#FFFFFF"
                                        style={inputField}
                                        contentEditable="true"
                                        suppressContentEditableWarning={true}
                                      >{product.SKU}</td>

                                      <td
                                        name="marketPrice"
                                        bgcolor="#FFFFFF"
                                        style={inputField}
                                        contentEditable="true"
                                        onBlur={(e) => this.onChangeProductVar(e, index)}
                                        suppressContentEditableWarning={true}
                                      ></td>
                                      <td
                                        name="price"
                                        bgcolor="#FFFFFF"
                                        style={inputField}
                                        contentEditable="true"
                                        onBlur={(e) => this.onChangeProductVar(e, index)}
                                        suppressContentEditableWarning={true}
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
          </Fragment>}

      </Fragment>
    );
  }
}

ProductAdd.propTypes = {
  getMovies: PropTypes.func.isRequired,
  getProductCates: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  productCates: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getMovies, getProductCates, getProducts })(ProductAdd);

const inputField = {
  '&:focus': {
    outline: 'none',
  },
};
