import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import 'font-awesome/css/font-awesome.min.css';
import '../../../../assets/css/product.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RecProduct from './RecProduct'
import ModalShopList from '../../Modal/ModalShopList'
import Loading from '../Loading/Loading'
import Rating from 'material-ui-rating'

import { connect } from 'react-redux';
import { getProductById } from '../../../../state/actions/productActions';
import { getProductVarById } from '../../../../state/actions/productVarActions';
import { showModal } from '../../../../state/actions/modalActions';
import { addRating } from '../../../../state/actions/ratingActions';
import { addCart } from '../../../../state/actions/cartActions';

const mapStateToProps = (state) => ({
  user: state.authUser.user,
  product: state.product.product,
  show: state.modal.show,
  modalName: state.modal.modalName,
  isLoaded: state.product.isProductLoaded,
  isProVarLoaded: state.productVar.isLoaded,
  productVar: state.productVar.productVar,
});

class ProductDetail extends React.Component {
  state = {
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    replyBoxHidden: false,
    selectedFiles: [],
    isTransition: false,
    title: '',
    review: '',
    idProduct: '',
    selectedProductVar: {},
    selectedFiles: [],
    rate: '',
    price: '',
    marketPrice: '',
    variants: [],
    bigPhoto: '',
    errorMsg: ''
  };

  tokenConfig = (token) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    //Header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };

  componentDidMount() {
    const { id, } = this.props.match.params;
    const { idShop } = this.props.location.state;
    this.setState({ idProduct: id })
    this.props.getProductById({ idShop, idProduct: id })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.bigPhoto == '' && this.props.isLoaded) {
      this.setState({ bigPhoto: this.props.product.images[0].url })
    }
    if (!this.props.isProVarLoaded && this.props.isLoaded) {
      this.props.getProductVarById(this.props.product.productVars[0].id)
    }
  }

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileSelect = (e) => {
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

    let files = e.target.files
    if (files.length > 1) return;

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        const formData = new FormData();
        formData.append("photo", files[i]);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
          }
        };

        this.setState({ isTransition: true })
        axios.post(`${process.env.REACT_APP_BACKEND_RATING}/api/ratingimage/`, formData, config).then((response) => {
          if (response) {
            console.log('response rating image: ', response);
            this.setState({ isTransition: false })
            files[i].url = response.data.imageUrl;
            files[i].publicId = response.data.publicId
            this.setState((prepState) => ({
              selectedFiles: [...prepState.selectedFiles, files[i]]
            }));
          }
        }).catch(err => {
          console.log(err);
        });

      } else {
        files[i]['invalid'] = true;
        this.setState({ errorMessage: 'Định dạng tệp không phù hợp' });
      }
    }
  }

  sendRating = () => {
    const { title, review, idProduct, selectedFiles, rate } = this.state
    const { user } = this.props
    this.props.addRating({ idUser: user.id, idProduct, title, review, rate, arrImages: selectedFiles })
  }

  handleVariants = (item) => {
    //khi chọn variant khác thì clear error cũ
    if (this.state.errorMsg !== '') this.setState({ errorMsg: '' })

    let arr, unknownVariantText, oldVariants
    //lưu lại mảng variant đã chọn trc đó
    oldVariants = this.state.variants

    //get name cho variant vừa dc chọn
    let variants = [...this.props.product.variants]
    arr = variants.filter(o => { return o.id == item.idVariant });
    unknownVariantText = arr[0].name + ' ' + arr[0].VariantValues.filter(o => { return o.id == item.id })[0].value;

    this.setState(
      (state) => {
        let variants = [...state.variants], isChecked = false
        for (let i in variants) {
          if (variants[i].idVariant == item.idVariant) {
            variants[i].idVariantValue = item.id
            isChecked = true
          }
        }
        if (!isChecked) variants.push({ idVariant: item.idVariant, idVariantValue: item.id })
        return {
          variants,
        };
      },
      () => {
        //set selectedProductVar
        const { product } = this.props
        let productVars = [...this.props.product.productVars],
          { variants } = this.state

        //convert arr object variants thành arr gồm các phần tử là idVariantValue
        let convertVariants = variants.map(({ idVariantValue }) => idVariantValue)

        if (variants.length == product.variants.length) {
          for (let i = 0; i < productVars.length; i++) {
            for (let j = 0; j < productVars[i].ProductDets.length; j++) {
              if (!convertVariants.includes(productVars[i].ProductDets[j].idVariantValue)) {
                console.log('del productVars: ', productVars[i]);
                productVars.splice(i, 1)
                i--;
                break
              }
            }
          }

          if (productVars.length == 1) {
            this.setState({ selectedProductVar: productVars[0] })

            //set big photo
            //set price for productVar
            let images = [...this.props.product.images], bigPhotoArr
            bigPhotoArr = images.filter(i => i.ProductVar.id == productVars[0].id && i.isMain == true)
            this.setState({ bigPhoto: bigPhotoArr[0].url, price: productVars[0].price })

          } else {
            let selectedVariantsText = '';
            console.log('oldVariants: ', oldVariants);
            for (let i in oldVariants) {
              let arr, name

              //get name cho variant vừa dc chọn nhưng ko match với các variants đã dc chọn trc đó
              let variants = [...this.props.product.variants]
              arr = variants.filter(o => { return o.id == oldVariants[i].idVariant });
              name = arr[0].VariantValues.filter(o => { return o.id == oldVariants[i].idVariantValue })[0].value;
              selectedVariantsText = ' - ' + name

            }
            this.setState({ errorMsg: 'Sản phẩm' + selectedVariantsText + ' không có ' + unknownVariantText })
          }

        }
      }
    );

  }

  addToCart = () => {
    const { selectedProductVar, variants } = this.state
    const { addCart, user, product } = this.props
    if (variants.length == product.variants.length) {
      addCart({
        idProductVar: selectedProductVar.id,
        amount: 1,
        idUser: user.id
      })
    }
  }

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  render() {
    const { productList, replyBoxHidden, selectedFiles, isTransition, rate, price, marketPrice, variants, bigPhoto, errorMsg } = this.state;
    const { showModal, show, modalName, isLoaded, product, isProVarLoaded, productVar } = this.props
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 3,
      className: 'slider',
    };
    const bigSettings = {
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      className: 'slider',
    };
    const smallSettings = {
      infinite: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      className: 'slider',
    };

    return (
      <div>
        {show && modalName == 'modalShopList' && <ModalShopList />}
        {isTransition && <Loading />}
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: '300px',
            position: 'relative',
            backgroundColor: '#f7f7f7',
          }}
        >
          <div className="nohome-section"></div>
          {isLoaded &&
            <div className="container">
              <div className="card1">
                <div className="image">
                  <div className="slider">
                    <Slider style={{ width: '100%' }} {...bigSettings}>
                      {productList.map((item, index) => {
                        return (<div className='big-photo'>
                          <img src={bigPhoto} alt="product" />
                        </div>)
                      })}
                    </Slider>
                  </div>
                  <div className="img-slider" >
                    <Slider style={{ width: '100%' }} {...smallSettings}>
                      {product.images.map((item, index) => {
                        return <div className='small-photo' onClick={() => this.setState({ bigPhoto: item.url })}>
                          <img src={item.url} alt="product" />
                        </div>

                      })}
                    </Slider>
                  </div>
                </div>
                <div className="infor">
                  <h1>{product.product.name}</h1>
                  <div className="availibity">
                    <div>Tình trạng:</div>
                    <div>Đang kinh doanh</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-o"></i>
                    </div>
                    <div>(1 đánh giá) | </div>
                    <div className="add-your-review">Thêm đánh giá của bạn</div>
                  </div>


                  <div className="price">
                    <div>
                      {price == '' && isProVarLoaded && (<h2> {this.convertPrice(productVar.price)}đ</h2>)}
                      {price !== '' && <h2>{this.convertPrice(price)}đ</h2>}
                    </div>
                    <div>
                      {marketPrice == '' && isProVarLoaded && <h4>{this.convertPrice(productVar.marketPrice)}đ</h4>}
                      {marketPrice !== '' && <h4>{this.convertPrice(marketPrice)}đ</h4>}
                    </div>
                  </div>

                  <div className="info-content">
                    <p>
                      {product.description}
                    </p>
                  </div>

                  {product.variants.map((p, index) => {
                    return (
                      <div key={index}>
                        <h5>{p.name}</h5>
                        <div className="grid-option">
                          {p.VariantValues.map((v, index) => {
                            return <button className={!variants.some(e => e.idVariantValue == v.id) ? 'tag' : 'selected-tag'}
                              onClick={() => this.handleVariants(v)} key={index}>{v.value}</button>
                          })}
                        </div>
                      </div>)
                  })}
                  {errorMsg && <p style={{ color: 'red' }}> {errorMsg}</p>}
                  <div className="button">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'white',
                          height: '37px',
                          width: '37px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </div>
                      <input
                        style={{
                          width: '50px',
                          height: '36px',
                          textAlign: 'center',
                          border: '1px solid #ccc',
                        }} />

                      <div
                        style={{
                          backgroundColor: 'white',
                          height: '37px',
                          width: '37px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                        }}>
                        <i className="fa fa-minus"></i>
                      </div>
                    </div>
                    <div className="cart-btn" onClick={this.addToCart}>
                      <i className="fa fa-shopping-cart"></i> Thêm vào giỏ hàng
                    </div>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <div className="label-prodet">Tên nhà bán:</div>
                    <div> {product.shop.name}</div>
                    <div className="link">
                      <Link to="/shop">Ghé thăm</Link>
                    </div>

                    <div className="link" onClick={() => { showModal({ show: true, modalName: 'modalShopList' }) }}>Thay đổi nhà bán</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className="label-prodet">Sản phẩm thuộc về phim:</div>
                    <div> {product.product.Movie.name}</div>
                  </div>
                  <div className="voucher-list">
                    <h5>NHẬP MÃ KHUYẾN MÃI ĐỂ ĐƯỢC GIẢM GIÁ:</h5>
                    <p>
                      Nhập <span>SHOP50</span> được giảm 50.000đ trên tổng hóa đơn
                    </p>
                    <p>
                      Nhập <span>SHOP20</span> được giảm 20.000đ trên tổng hóa đơn
                    </p>
                    <p>
                      Nhập <span>SHOP10</span> được giảm 10.000đ trên tổng hóa đơn
                    </p>
                  </div>
                </div>
              </div>
              <div className="recommend-wrapper" >
                <h3 style={{ marginLeft: 'auto' }} className="recommend-pane">NHỮNG SẢN PHẨM KHÁC CÙNG PHIM</h3>
                <div className="sliderwrapper">
                  <Slider style={{ width: '107%' }} {...settings}>
                    {productList.map((item, index) => {
                      return <RecProduct key={index} />;
                    })}
                  </Slider>
                </div>
              </div>
              <div className="recommend-wrapper">
                <h3 className="recommend-pane" style={{ marginLeft: 'auto' }}>
                  NHỮNG SẢN PHẨM KHÁC TƯƠNG TỰ
                </h3>
                <div className="sliderwrapper">
                  <Slider style={{ width: '107%' }}  {...settings} >
                    {productList.map(() => {
                      return <RecProduct />;
                    })}
                  </Slider>
                </div>
              </div>

              {/* <h3 className="recommend-pane">Đánh giá</h3> */}
              <div className="mes-wrapper">
                <div className="row-flex" style={{ borderBottom: '1px solid #d1d1d1' }}>
                  <div className="review-wrapper">
                    <p>ĐÁNH GIÁ</p>
                    <div className="review-score">4/5</div>
                    <Rating
                      precision={0.5}
                      name="simple-controlled"
                      value={5}
                    />
                    <div>(5 nhận xét)</div>
                  </div>

                  <div className="myreview-wrapper">
                    <p style={{ fontWeight: '500', fontSize: '16px' }}> Đánh giá của bạn </p>
                    <div className="review">
                      <Rating
                        name="simple-controlled"
                        value={rate}
                        size={10}
                        onChange={(value) => this.setState({ rate: value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: '500', fontSize: '16px' }} for="exampleInputEmail1">Tiêu đề nhận xét</label>
                      <input onChange={this.handleChange} type="text" className="form-control" name='title' />
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: '500', fontSize: '16px', marginBottom: '12px' }}>Nhận xét của bạn</label>
                      <textarea onChange={this.handleChange} name='review' className="form-control" placeholder="Viết nhận xét tại đây" style={{ height: '120px' }} ></textarea>
                    </div>
                    <div className="form-group">
                      <p style={{ fontWeight: '500', fontSize: '16px', margin: '10px 0 0 0' }}>Tải ảnh lên</p>
                      <input type="file" id="exampleInputFile" onChange={this.handleFileSelect} />
                    </div>
                    <div className="sku-grid">
                      {selectedFiles && selectedFiles.map((item, index) => {
                        return (
                          <label key={index} htmlFor={item} className="rating-image">
                            <img
                              style={{ width: '100%', height: '90%' }}
                              className="product-pic"
                              src={item.url}
                              alt="product"
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div className="row-flex">
                      <Button variant="contained" style={{ backgroundColor: '#3571a7', color: 'white', width: '115px' }}
                        onClick={this.sendRating} >
                        Gửi
                  </Button>
                    </div>
                  </div>
                </div>

                <div className="mes-detail" >
                  <div className="ava">
                    <img src="./img/ava.png" alt="ava" />
                  </div>
                  <div className="reply-wrapper">
                    <div className="comments">Sản phẩm đẹp gói hàng cẩn thận</div>
                    <div className="review">
                      <Rating
                        name="size-small"
                        precision={0.5}
                        value={rate}
                        size="small"
                      />
                    </div>
                    <div>6 phút trước</div>
                    <div className="reply-btn" onClick={() => this.replyClick()}>
                      Trả lời
                </div>
                    {replyBoxHidden ? (
                      <div style={{ width: '100%' }}>
                        <textarea className="reply-box"></textarea>
                        <div className="row-flex">
                          <Button
                            style={{
                              background: '#3571a7',
                              color: 'white',
                              width: '115px',
                              height: '38px',
                              margin: '5px 5px 5px 0',
                            }}>
                            Gửi
                      </Button>
                          <Button
                            style={{
                              background: '#fff',
                              color: '#000',
                              width: '115px',
                              height: '38px',
                              margin: '5px 5px 5px 0',
                              border: '1px solid #ccc',
                            }}
                            onClick={() => this.replyClick()}>
                            Hủy bỏ
                      </Button>
                        </div>
                      </div>
                    ) : null}
                    <div className="reply-answer">
                      <p>
                        ncourage people to post such bad question again and again.
                        New people need to understand how to correctly write
                        question because they need to understand that the question
                        will be useful for new comer. We are not in a discussion
                        forum. We all can check the link to see the code and put an
                        answer to get reputation but this is not the purpose of t
                      </p>
                      <div className='row-flex-center'>
                        <div className="ava-reply">
                          <img src="./img/ava.png" alt="ava" />
                        </div>
                        <div style={{ color: 'grey' }}>20/03/2020</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, { getProductById, getProductVarById, showModal, addRating, addCart })(ProductDetail);
