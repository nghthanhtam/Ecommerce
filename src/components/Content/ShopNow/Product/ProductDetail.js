import React from 'react';
import Button from '@material-ui/core/Button';
import 'font-awesome/css/font-awesome.min.css';
import '../../../../assets/css/product.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from './Product';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RecProduct from './RecProduct'
import ModalShopList from '../../Modal/ModalShopList'

import { connect } from 'react-redux';
import { getProductById } from '../../../../state/actions/productActions';
import { showModal } from '../../../../state/actions/modalActions';

const mapStateToProps = (state) => ({
  product: state.product.product,
  show: state.modal.show,
  modalName: state.modal.modalName
});

class ProductDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      replyBoxHidden: false,
    };
  }

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
    const { id } = this.props.match.params;
    console.log(id);
    this.props.getProductById(id)
    // axios
    //   .get(
    //     `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${id}`,
    //     this.tokenConfig(this.props.authUser.token)
    //   )
    //   .then((response) => {
    //     let {
    //       fullname,
    //       idRole,
    //       identityCard,
    //       phone,
    //       username,
    //       id,
    //     } = response.data;
    //     this.setState({ fullname, idRole, identityCard, phone, username, id });
    //   })
    //   .catch((er) => console.log(er.response));
  }

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };

  render() {
    const { productList, replyBoxHidden } = this.state;
    const { showModal, show, modalName } = this.props
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 4,
      className: 'slider',
    };
    return (
      <div>
        {show && modalName == 'modalShopList' && <ModalShopList />}
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
          <div className="container">
            <div className="card1">
              <div className="image">
                <div className="slider">
                  <img src="./img/blue.png" alt="product" />
                </div>
                <div className="img-slider">
                  <img src="./img/blue.png" alt="product" />
                  <img src="./img/blue.png" alt="product" />
                  <img src="./img/blue.png" alt="product" />
                </div>
              </div>
              <div className="infor">
                <h1>Captain Ameria Mouse</h1>
                <div className="availibity">
                  <div>Tình trạng:</div>
                  <div>In Stock</div>
                </div>
                <div className="review">
                  <div>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <div>(1 review) | </div>
                  <div className="add-your-review">Add your review</div>
                </div>

                <div className="price">
                  <div>
                    <h1>$2100</h1>
                  </div>

                  <div>
                    <h3>$2350</h3>
                  </div>
                </div>

                <div className="info-content">
                  <p>
                    ncourage people to post such bad question again and again.
                    New people need to understand how to correctly write
                    question because they need to understand that the question
                    will be useful for new comer. We are not in a discussion
                    forum. We all can check the link to see the code and put an
                    answer to get reputation but this is not the purpose of t
                  </p>
                </div>

                <div>
                  <h5>COLOR:</h5>
                  <div className="grid-option">
                    <button className="tag">white</button>
                    <button className="tag">black</button>
                    <button className="tag">blue</button>
                  </div>
                </div>

                <div>
                  <h5>SIZE:</h5>
                  <div className="grid-option">
                    <button className="tag">XL</button>
                    <button className="tag">L</button>
                    <button className="tag">M</button>
                  </div>
                </div>

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
                      }}
                    />

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
                      <i className="fa fa-minus"></i>
                    </div>
                  </div>
                  <div className="cart-btn">
                    <i className="fa fa-shopping-cart"></i> ADD TO CART
                  </div>
                </div>

                <div style={{ display: 'flex' }}>
                  <div className="label-prodet">Tên nhà bán:</div>
                  <div> Toy Store</div>
                  <div className="link">
                    <Link to="/shop">Ghé thăm</Link>
                  </div>

                  <div className="link" onClick={() => { showModal({ show: true, modalName: 'modalShopList' }) }}>Thay đổi nhà bán</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="label-prodet">Sản phẩm thuộc về phim:</div>
                  <div> Attack on Titan</div>
                </div>
                <div className="voucher-list">
                  <h5>NHẬP MÃ KHUYẾN MÃI ĐỂ ĐƯỢC GIẢM GIÁ:</h5>
                  <p>
                    Nhập <span>SHOP50</span> được giảm 50.000đ trên tổng hóa đơn
                  </p>
                  <p>
                    Nhập <span>SHOP50</span> được giảm 50.000đ trên tổng hóa đơn
                  </p>
                  <p>
                    Nhập <span>SHOP50</span> được giảm 50.000đ trên tổng hóa đơn
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

            <h3 className="recommend-pane">Đánh giá</h3>
            <div className="mes-wrapper">
              <div className="row-flex">
                <div className="review-wrapper">
                  <p>ĐÁNH GIÁ</p>
                  <div className="review-score">4/5</div>
                  <div className="review">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <div>(5 nhận xét)</div>
                </div>

                <div className="myreview-wrapper">
                  <p>Đánh giá của bạn</p>
                  <div className="review">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <p>Nhận xét của bạn</p>
                  <textarea placeholder="Viết nhận xét tại đây" className="reply-box" ></textarea>
                  <div className="row-flex">
                    <Button
                      style={{
                        background: '#3571a7',
                        color: 'white',
                        width: '115px',
                        height: '38px',
                        margin: '5px 5px 5px 0',
                      }}
                    >
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
                  <div className="review">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <div className="comments">Sản phẩm đẹp gói hàng cẩn thận</div>
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
                          onClick={() => this.replyClick()}
                        >
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
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, { getProductById, showModal })(ProductDetail);
