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
import { connect } from 'react-redux';

import { getProductVarById } from '../../../../state/actions/productVarActions';

class ProductDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      replyBoxHidden: false,
    };
  }

  componentDidMount() {


  }

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };
  render() {
    let { productList, replyBoxHidden } = this.state;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 4,
      className: 'slider',
    };
    return (
      <div>
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
                  <div>Avaibility:</div>
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
                  <div className="label">SHOP:</div>
                  <div> Toy Store</div>
                  <div className="link">
                    <Link to="/shop">Visit</Link>
                  </div>

                  <div className="link">Change</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="label">DELIVERY ADDRESS:</div>
                  <div> 545 Le Duc Tho, p115, Go Vap, TPHCM</div>
                  <div className="link">Change</div>
                </div>
                <div className="voucher-list">
                  <h5>RELATED PROMOTIONS:</h5>
                  <p>
                    Enter <span>SHOP50</span> to get a promotion of 50000 VND to
                    your order
                  </p>
                  <p>
                    Enter <span>SHOP50</span> to get a promotion of 50000 VND to
                    your order
                  </p>
                  <p>
                    Enter <span>SHOP50</span> to get a promotion of 50000 VND to
                    your order
                  </p>
                </div>
              </div>
            </div>
            <div className="recommend-wrapper">
              <h3 className="recommend-pane">PRODUCTS RELATED TO THIS MOVIE</h3>
              <div className="sliderwrapper">
                <Slider
                  style={{
                    width: '85%',
                  }}
                  {...settings}
                >
                  {productList.map(() => {
                    return <Product />;
                  })}
                </Slider>
              </div>
            </div>
            <div className="recommend-wrapper">
              <h3 className="recommend-pane">
                SIMILAR PRODUCTS INSPIRED BY THIS ITEM
              </h3>
              <div className="sliderwrapper">
                <Slider
                  style={{
                    width: '85%',
                  }}
                  {...settings}
                >
                  {productList.map(() => {
                    return <Product />;
                  })}
                </Slider>
              </div>
            </div>

            <h3 className="recommend-pane">Reviews</h3>
            <div className="mes-wrapper">
              <div className="row-flex">
                <div className="review-wrapper">
                  <p>Đánh giá trung bình</p>
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
                  <textarea
                    placeholder="Viết nhận xét tại đây"
                    className="reply-box"
                  ></textarea>
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

              <div className="mes-detail">
                <div className="ava">
                  <img src="./img/ava.png" alt="ava" />
                </div>
                <div className="col-flex">
                  <div className="review">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <div className="comments">Sản phẩm đẹp gói hàng cẩn thận</div>
                  <div className="time-agp">6 phút trước</div>
                  <div className="reply-btn" onClick={() => this.replyClick()}>
                    Trả lời
                  </div>
                  {replyBoxHidden ? (
                    <div>
                      <textarea className="reply-box"></textarea>
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

const mapStateToProps = (state) => ({
  productVar: state.productVar.productVar,
  isLoaded: state.productVar.isLoaded,
});

export default connect(mapStateToProps, { getProductVarById })(ProductDetail);
