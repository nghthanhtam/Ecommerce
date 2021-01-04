import React, { Fragment } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/product.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RecProduct from "./RecProduct";
import ModalShopList from "../../Modal/ModalShopList";
import Loading from "../Loading/Loading";
import Rating from "material-ui-rating";

import { connect } from "react-redux";
import { getProductById } from "../../../../state/actions/productActions";
import { getProductVarById } from "../../../../state/actions/productVarActions";
import { showModal } from "../../../../state/actions/modalActions";
import {
  addRating,
  getRatingsByProduct,
} from "../../../../state/actions/ratingActions";
import { addComment } from "../../../../state/actions/commentActions";
import {
  addQuestion,
  getQuestionsByProduct,
} from "../../../../state/actions/questionActions";
import { addAnswer } from "../../../../state/actions/answerActions";
import { addCart } from "../../../../state/actions/cartActions";

const mapStateToProps = (state) => ({
  user: state.authUser.user,
  product: state.product.product,
  show: state.modal.show,
  modalName: state.modal.modalName,
  isProductLoaded: state.product.isProductLoaded,
  isProVarLoaded: state.productVar.isLoaded,
  productVar: state.productVar.productVar,
  ratings: state.rating.ratings,
  isRatingsLoaded: state.rating.isLoaded,
  isQuestionsLoaded: state.question.isLoaded,
  questions: state.question.questions,
  totalRating: state.rating.totalDocuments,
  tokenUser: state.authUser.token,
  isAuthenticated: state.authUser.isAuthenticated,
  averageRating: state.rating.averageRating,
});

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    productList: [1, 2, 3, 4, 5, 6, 7],
    sameMovieProucts: [],
    replyBoxHidden: false,
    answerBoxHidden: false,
    selectedFiles: [],
    isTransition: false,
    title: "",
    review: "",
    content: "",
    question: "",
    idProduct: "",
    selectedProductVar: "",
    selectedFiles: [],
    rate: "",
    amount: 1,
    variants: [],
    bigPhoto: "",
    errorMsg: "",
    nameObj: "",
  };

  componentDidMount() {
    const { idProduct, idShop } = this.props.match.params;
    this.setState({ idProduct });
    this.props.getProductById({ idShop, idProduct });
    this.props.getRatingsByProduct({ idProduct, limit: 1000, page: 1 });
    this.props.getQuestionsByProduct({ idProduct, limit: 1000, page: 1 });
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { bigPhoto } = this.state;
    const { product, isProductLoaded } = this.props;
    if (bigPhoto == "" && isProductLoaded) {
      this.setState({ bigPhoto: product.images[0].url });
    }

    //get recommended movies by idMovie
    if (
      isProductLoaded &&
      prevProps.isProductLoaded !== this.props.isProductLoaded
    ) {
      let filters = "",
        arrayFilter = [{ name: "idMovie", value: product.product.idMovie }];
      for (let x = 0; x < arrayFilter.length; x++) {
        filters += `&` + arrayFilter[x].name + `=${arrayFilter[x].value}`;
      }
      try {
        axios
          .get(
            `${
              process.env.REACT_APP_BACKEND_PRODUCT
            }/api/product/search/filter?limit=${1000}&page=${1}` + filters,
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          )
          .then((response) => {
            let tempArr = response.data.items;
            if (tempArr.length > 0 && tempArr.length < 5) {
              const arrLength = tempArr.length;
              for (let i = 0; i < 5 - arrLength + 1; i++) {
                tempArr.push({
                  name: "",
                  brand: "",
                  arrayImage: "",
                });
              }
            }
            this.setState(
              {
                sameMovieProucts: tempArr,
              },
              () => console.log(tempArr)
            );
          });
      } catch (error) {
        console.log(error.response);
      }
    }
    // if (!isProVarLoaded && isProductLoaded) {
    //   getProductVarById(product.productVars[0].id);
    //   if (product.product.idProductCat == 1 && nameObj == "") {
    //     //book
    //     this.setState({
    //       nameObj: {
    //         author: "Tác giả",
    //         publisher: "Nhà xuất bản",
    //         language: "Ngôn ngữ",
    //       },
    //     });
    //   } else if (product.product.idProductCat == 3 && nameObj == "") {
    //     //clothes
    //     this.setState({ nameObj: { origin: "Xuất xứ" } });
    //   }
    // }
    if (!prevProps.isProductLoaded && isProductLoaded) {
      this.setState((prevState) => ({
        selectedProductVar: {
          // object that we want to update
          ...prevState.selectedProductVar, // keep all other key-value pairs
          status: "active", // update the value of specific key
          price: product.productVars[0].price,
          marketPrice: product.productVars[0].marketPrice,
        },
      }));
    }
  };

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };
  answerClick = () => {
    let { answerBoxHidden } = this.state;
    this.setState({ answerBoxHidden: !answerBoxHidden });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangeAmount = (value) => {
    this.setState({ amount: this.state.amount + value });
  };

  handleFileSelect = (e) => {
    const validateFile = (file) => {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/x-icon",
      ];
      if (validTypes.indexOf(file.type) === -1) {
        return false;
      }
      return true;
    };

    let files = e.target.files;
    if (files.length > 1) return;

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        const formData = new FormData();
        formData.append("photo", files[i]);

        const config = {
          headers: {
            "Content-Type":
              'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
            Authorization: `Bearer ${this.props.tokenUser}`,
          },
        };

        this.setState({ isTransition: true });
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_RATING}/api/ratingimage/`,
            formData,
            config
          )
          .then((response) => {
            if (response) {
              console.log("response rating image: ", response);
              this.setState({ isTransition: false });
              files[i].url = response.data.imageUrl;
              files[i].publicId = response.data.publicId;
              this.setState((prepState) => ({
                selectedFiles: [...prepState.selectedFiles, files[i]],
              }));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        files[i]["invalid"] = true;
        this.setState({ errorMessage: "Định dạng tệp không phù hợp" });
      }
    }
  };

  sendQuestion = () => {
    console.log("avadf");
    const { question, idProduct } = this.state;
    const { user, addQuestion } = this.props;
    addQuestion({
      idUser: user.id,
      idProduct,
      question,
      type: "user",
    });
    this.setState({ question: "" });
    this.setState({ replyBoxHidden: false });
  };

  sendRating = () => {
    const { title, review, idProduct, selectedFiles, rate } = this.state;
    const { user } = this.props;
    this.props.addRating({
      idUser: user.id,
      idProduct,
      title,
      review,
      rate,
      arrImages: selectedFiles,
      type: "user",
    });
    this.setState({ title: "", review: "", selectedFiles: [], rate: "" });
  };

  sendAnswer = (idQuestion) => {
    const { answer, idProduct } = this.state;
    const { user } = this.props;
    this.props.addAnswer({
      idUser: user.id,
      idQuestion,
      answer,
      idProduct,
      type: "user",
    });
    this.setState({ answer: "" });
    this.setState({ answerBoxHidden: false });
  };

  sendCmt = (idRating) => {
    const { content, idProduct } = this.state;
    const { user } = this.props;
    this.props.addComment({
      idUser: user.id,
      idRating,
      content,
      idProduct,
      type: "user",
    });
    this.setState({ content: "" });
  };

  handleVariants = (item) => {
    //khi chọn variant khác thì clear error cũ
    if (this.state.errorMsg !== "") this.setState({ errorMsg: "" });

    let arr, unknownVariantText, oldVariants;
    //lưu lại mảng variant đã chọn trc đó
    oldVariants = this.state.variants;

    //get name cho variant vừa dc chọn
    let variants = [...this.props.product.variants];
    arr = variants.filter((o) => {
      return o.id == item.idVariant;
    });
    unknownVariantText =
      arr[0].name +
      " " +
      arr[0].VariantValues.filter((o) => {
        return o.id == item.id;
      })[0].value;

    this.setState(
      (state) => {
        let variants = [...state.variants],
          isChecked = false;
        for (let i in variants) {
          if (variants[i].idVariant == item.idVariant) {
            variants[i].idVariantValue = item.id;
            isChecked = true;
          }
        }
        if (!isChecked)
          variants.push({ idVariant: item.idVariant, idVariantValue: item.id });
        return {
          variants,
        };
      },
      () => {
        //set selectedProductVar
        const { product } = this.props;
        let productVars = [...this.props.product.productVars],
          { variants } = this.state;

        //convert arr object variants thành arr gồm các phần tử là idVariantValue
        let convertVariants = variants.map(
          ({ idVariantValue }) => idVariantValue
        );

        if (variants.length == product.variants.length) {
          for (let i = 0; i < productVars.length; i++) {
            for (let j = 0; j < productVars[i].ProductDets.length; j++) {
              if (
                !convertVariants.includes(
                  productVars[i].ProductDets[j].idVariantValue
                )
              ) {
                console.log("del productVars: ", productVars[i]);
                productVars.splice(i, 1);
                i--;
                break;
              }
            }
          }

          if (productVars.length == 1) {
            this.setState({ selectedProductVar: productVars[0] }, () => {
              console.log(
                "selectedProductVar: ",
                this.state.selectedProductVar
              );
            });
            //set big photo
            //set price for productVar
            let images = [...this.props.product.images],
              bigPhotoArr;
            bigPhotoArr = images.filter(
              (i) => i.ProductVar.id == productVars[0].id && i.isMain == true
            );
            this.setState({ bigPhoto: bigPhotoArr[0].url });
          } else {
            let selectedVariantsText = "";
            for (let i in oldVariants) {
              let arr, name;
              //get name cho variant vừa dc chọn nhưng ko match với các variants đã dc chọn trc đó
              let variants = [...this.props.product.variants];
              arr = variants.filter((o) => {
                return o.id == oldVariants[i].idVariant;
              });
              name = arr[0].VariantValues.filter((o) => {
                return o.id == oldVariants[i].idVariantValue;
              })[0].value;
              selectedVariantsText = " - " + name;
            }
            // this.setState({ errorMsg: 'Sản phẩm' + selectedVariantsText + ' không có ' + unknownVariantText })
          }
        }
      }
    );
  };

  addToCart = () => {
    const { selectedProductVar, variants, amount } = this.state;
    const { addCart, user, product } = this.props;
    if (variants.length == product.variants.length) {
      addCart({
        idProductVar: selectedProductVar.id,
        amount,
        idUser: user.id,
      });
    }
  };

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  convertDetailName = (detail) => {
    switch (detail) {
      case "author":
        return "Tác giả";
      case "publisher":
        return "NXB";
      case "language":
        return "Ngôn ngữ";
      case "origin":
        return "Xuất xứ";
      default:
        return "Chi tiết";
    }
  };

  changeShop = (idShop) => {
    const { idProduct } = this.props.match.params;
    this.props.getProductById({ idShop, idProduct });
  };

  render() {
    const {
      selectedProductVar,
      productList,
      replyBoxHidden,
      answerBoxHidden,
      selectedFiles,
      isTransition,
      rate,
      question,
      answer,
      review,
      content,
      amount,
      variants,
      bigPhoto,
      errorMsg,
      sameMovieProucts,
    } = this.state;
    const {
      showModal,
      show,
      modalName,
      isProductLoaded,
      product,
      ratings,
      isRatingsLoaded,
      totalRating,
      tokenUser,
      averageRating,
      questions,
      isQuestionsLoaded,
    } = this.props;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToScroll: 1,
      className: "slider",
    };
    const bigSettings = {
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      className: "slider",
    };
    const smallSettings = {
      infinite: true,
      speed: 800,
      slidesToScroll: 1,
      className: "slider",
    };

    return (
      <div>
        {show && modalName == "modalShopList" && <ModalShopList />}
        {isTransition && <Loading />}
        <Header />

        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="nohome-section"></div>
          {isProductLoaded && (
            <div className="container">
              <div className="card1">
                <div className="image1">
                  <div className="slider">
                    <Slider
                      style={{ width: "100%", height: "320px" }}
                      {...bigSettings}
                    >
                      {productList.map((item, index) => {
                        return (
                          <div key={index} className="big-photo">
                            <img src={bigPhoto} alt="product" />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>

                  <div className="img-slider">
                    <Slider
                      style={{ width: "80%", height: "100%" }}
                      {...smallSettings}
                      slidesToShow={
                        product.images.length < 3 ? product.images.length : 3
                      }
                    >
                      {product.images.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="small-photo"
                            onClick={() =>
                              this.setState({ bigPhoto: item.url })
                            }
                          >
                            <img src={item.url} alt="product" />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
                <div className="infor">
                  <h1>{product.product.name}</h1>
                  <div className="availibity">
                    <div>Tình trạng:</div>
                    {selectedProductVar != "" &&
                    selectedProductVar.status == "active" ? (
                      <div>Đang kinh doanh</div>
                    ) : (
                      <div>Ngừng kinh doanh</div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {isRatingsLoaded && (
                      <div
                        style={{
                          width: "155px",
                          padding: 0,
                          marginLeft: "-10px",
                        }}
                      >
                        <Rating
                          name="size-small"
                          precision={0.5}
                          value={averageRating}
                          size="small"
                          readOnly
                        />
                      </div>
                    )}
                    <div>({totalRating} đánh giá) | </div>
                    <div
                      className="add-your-review"
                      onClick={() => {
                        try {
                          const decodedData = jwt.decode(tokenUser);
                          if (!decodedData) {
                            this.props.showModal({
                              show: true,
                              modalName: "login",
                            });
                          } else {
                            this.myRef.focus();
                          }
                        } catch (error) {}
                      }}
                    >
                      Thêm đánh giá của bạn
                    </div>
                  </div>

                  <div className="price">
                    <div>
                      {selectedProductVar && selectedProductVar.price !== "" ? (
                        <h2>{this.convertPrice(selectedProductVar.price)}đ</h2>
                      ) : (
                        <h2>0đ</h2>
                      )}
                    </div>
                    <div>
                      {selectedProductVar &&
                      selectedProductVar.marketPrice !== "" ? (
                        <h4>
                          {this.convertPrice(selectedProductVar.marketPrice)}đ
                        </h4>
                      ) : (
                        <h4>0đ</h4>
                      )}
                    </div>
                  </div>
                  <div className="info-content">
                    <p>{product.description}</p>
                  </div>
                  {product.variants.map((p, index) => {
                    return (
                      <div key={index}>
                        <h5>{p.name}</h5>
                        <div className="grid-option">
                          {p.VariantValues.map((v, index) => {
                            return (
                              <button
                                className={
                                  !variants.some(
                                    (e) => e.idVariantValue == v.id
                                  )
                                    ? "tag"
                                    : "selected-tag"
                                }
                                onClick={() => this.handleVariants(v)}
                                key={index}
                              >
                                {v.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {errorMsg && <p style={{ color: "red" }}> {errorMsg}</p>}
                  <div className="button">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="minus-btn"
                        onClick={() => this.onChangeAmount(-1)}
                      >
                        <i className="fa fa-minus"></i>
                      </div>
                      <input
                        style={{
                          width: "50px",
                          height: "36px",
                          textAlign: "center",
                          border: "1px solid #ccc",
                        }}
                        name="amount"
                        value={amount}
                        onChange={this.handleChange}
                      />

                      <div
                        className="plus-btn"
                        onClick={() => this.onChangeAmount(1)}
                      >
                        <i className="fa fa-plus"></i>
                      </div>
                    </div>
                    {selectedProductVar !== "" &&
                    selectedProductVar.status == "active" ? (
                      <div className="cart-btn" onClick={this.addToCart}>
                        <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                        hàng
                      </div>
                    ) : (
                      <div className="cart-btn-stop">Ngưng kinh doanh</div>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="label-prodet">
                      Tên nhà bán:
                      <span
                        className="link-shop"
                        onClick={() =>
                          this.props.history.push(
                            `/shopnow/shop/${product.shop.id}/${product.shop.name}`
                          )
                        }
                      >
                        {product.shop.name}
                      </span>
                    </div>
                    {product.otherShops.length > 0 && (
                      <div
                        className="link"
                        onClick={() => {
                          showModal({
                            show: true,
                            modalName: "modalShopList",
                            details: {
                              otherShops: product.otherShops,
                              changeShop: this.changeShop,
                            },
                          });
                        }}
                      >
                        Thay đổi nhà bán
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="label-prodet">Sản phẩm thuộc về phim:</div>
                    <div> {product.product.Movie.name}</div>
                  </div>
                  <div className="voucher-list">
                    <h5> THÔNG TIN THÊM:</h5>
                    {product.product.Details.map((d, index) => {
                      return (
                        <p key={index}>
                          {this.convertDetailName(d.detail)}:{" "}
                          <span>{d.value}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="recommend-wrapper">
                <h3 style={{ marginLeft: "auto" }} className="recommend-pane">
                  NHỮNG SẢN PHẨM KHÁC CÙNG PHIM
                </h3>
                <div className="sliderwrapper">
                  <Slider
                    style={{
                      width: "107%",
                      height: "370px",
                      marginLeft: "-35px",
                    }}
                    {...settings}
                    arrows={sameMovieProucts.length <= 6 ? false : true}
                    slidesToShow={
                      sameMovieProucts.length <= 5 ? sameMovieProucts.length : 5
                    }
                  >
                    {sameMovieProucts.map((item, index) => {
                      return <RecProduct item={item} key={index} />;
                    })}
                  </Slider>
                </div>
              </div>
              <div className="recommend-wrapper">
                <h3 className="recommend-pane" style={{ marginLeft: "auto" }}>
                  NHỮNG SẢN PHẨM KHÁC TƯƠNG TỰ
                </h3>
                <div className="sliderwrapper">
                  <Slider
                    style={{
                      width: "107%",
                      height: "380px",
                    }}
                    {...settings}
                    slidesToShow={
                      sameMovieProucts.length <= 5 ? sameMovieProucts.length : 5
                    }
                  >
                    {sameMovieProucts.map((item, index) => {
                      return <RecProduct item={item} key={index} />;
                    })}
                  </Slider>
                </div>
              </div>

              <div className="mes-wrapper">
                {tokenUser && isQuestionsLoaded && (
                  <div
                    className="row-flex"
                    style={{ borderBottom: "1px solid #d1d1d1" }}
                  >
                    <div className="myreview-wrapper">
                      <div className="form-group">
                        <label
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            marginBottom: "12px",
                          }}
                        >
                          Câu hỏi của bạn
                        </label>
                        <textarea
                          onChange={this.handleChange}
                          name="question"
                          className="form-control"
                          placeholder="Đặt câu hỏi tại đây..."
                          value={question}
                          style={{ height: "120px" }}
                        ></textarea>
                      </div>
                      <div className="row-flex">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#3571a7",
                            color: "white",
                            width: "115px",
                          }}
                          onClick={this.sendQuestion}
                        >
                          Gửi
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {questions.map((question, index) => {
                  return (
                    question.status == "accepted" && (
                      <div className="mes-detail" key={index}>
                        <div className="ava-wrapper">
                          <div className="ava">
                            <img src="./img/ava.png" alt="ava" />
                          </div>
                          <div>{question.User.username}</div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="comments">{question.question}</div>

                          {question.Answers.map((answer, aindex) => {
                            return (
                              <Fragment key={aindex}>
                                {answer.status == "accepted" && (
                                  <>
                                    <div>{answer.answer}</div>
                                    <div className="reply-date">
                                      {answer.idUser} đă trả lời -{" "}
                                      {this.convertDate(question.createdAt)}
                                    </div>
                                  </>
                                )}
                              </Fragment>
                            );
                          })}

                          <div
                            className="reply-btn"
                            onClick={() => this.answerClick()}
                          >
                            Trả lời
                          </div>
                          {answerBoxHidden ? (
                            <div style={{ width: "100%" }}>
                              <textarea
                                onChange={this.handleChange}
                                name="answer"
                                value={answer}
                                className="reply-box"
                              ></textarea>
                              <div className="row-flex">
                                <Button
                                  onClick={() => this.sendAnswer(question.id)}
                                  className="send-btn"
                                  style={{
                                    background: "#3571a7",
                                    color: "white",
                                    width: "115px",
                                    height: "38px",
                                    margin: "5px 5px 5px 0",
                                  }}
                                >
                                  Gửi
                                </Button>
                                <Button
                                  style={{
                                    background: "#fff",
                                    color: "#000",
                                    width: "115px",
                                    height: "38px",
                                    margin: "5px 5px 5px 0",
                                    border: "1px solid #ccc",
                                  }}
                                  onClick={() => this.answerClick()}
                                >
                                  Hủy bỏ
                                </Button>
                              </div>
                            </div>
                          ) : null}
                          {question.Answers.map((answer, aindex) => {
                            return (
                              <div style={{ marginBottom: "10px" }}>
                                <Fragment key={aindex}>
                                  {answer.idQuestion == answer.id &&
                                    answer.status == "accepted" && (
                                      <div className="reply-answer">
                                        <p> {answer.answer} </p>
                                        <div className="cmt-wrapper">
                                          <div className="ava-reply">
                                            <img
                                              src="./img/ava.png"
                                              alt="ava"
                                            />
                                          </div>
                                          <div className="reply-date">
                                            {this.convertDate(answer.createdAt)}
                                          </div>
                                        </div>
                                        <div>{answer.User.username}</div>
                                      </div>
                                    )}
                                </Fragment>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
              <div className="mes-wrapper">
                {tokenUser && isRatingsLoaded && (
                  <div
                    className="row-flex"
                    style={{ borderBottom: "1px solid #d1d1d1" }}
                  >
                    <div className="review-wrapper">
                      <p>ĐÁNH GIÁ</p>
                      <div className="review-score">
                        {averageRating ? averageRating : 0}/5
                      </div>
                      <Rating
                        precision={0.5}
                        name="simple-controlled"
                        value={5}
                      />
                      <div>({totalRating} nhận xét)</div>
                    </div>

                    <div className="myreview-wrapper">
                      <p style={{ fontWeight: "500", fontSize: "16px" }}>
                        {" "}
                        Đánh giá của bạn{" "}
                      </p>
                      <div className="review">
                        <Rating
                          name="simple-controlled"
                          value={rate}
                          size={10}
                          onChange={(value) => this.setState({ rate: value })}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "500", fontSize: "16px" }}
                          htmlFor="exampleInputEmail1"
                        >
                          Tiêu đề nhận xét
                        </label>
                        <input
                          ref={(e) => {
                            this.myRef = e;
                          }}
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          name="title"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            marginBottom: "12px",
                          }}
                        >
                          Nhận xét của bạn
                        </label>
                        <textarea
                          onChange={this.handleChange}
                          name="review"
                          className="form-control"
                          placeholder="Viết nhận xét tại đây..."
                          value={review}
                          style={{ height: "120px" }}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "10px 0 0 0",
                          }}
                        >
                          Tải ảnh lên
                        </p>
                        <input
                          type="file"
                          id="exampleInputFile"
                          onChange={this.handleFileSelect}
                        />
                      </div>
                      <div className="sku-grid">
                        {selectedFiles &&
                          selectedFiles.map((item, index) => {
                            return (
                              <label
                                key={index}
                                htmlFor={item}
                                className="rating-image"
                              >
                                <img
                                  className="rating-pic"
                                  src={item.url}
                                  alt="product"
                                />
                              </label>
                            );
                          })}
                      </div>
                      <div className="row-flex">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#3571a7",
                            color: "white",
                            width: "115px",
                          }}
                          onClick={this.sendRating}
                        >
                          Gửi
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {ratings.map((rating, index) => {
                  return (
                    rating.status == "accepted" && (
                      <div className="mes-detail" key={index}>
                        <div className="ava-wrapper">
                          <div className="ava">
                            <img src="./img/ava.png" alt="ava" />
                          </div>
                          <div>{rating.User.username}</div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="comments">{rating.title}</div>
                          <p>{rating.review}</p>
                          <div className="sku-grid">
                            {rating.RatingImages.map((image, index) => {
                              return (
                                <Fragment key={index}>
                                  {image.idRating == rating.id && (
                                    <div key={index} className="rating-image">
                                      <img
                                        className="rating-pic"
                                        src={image.url}
                                        alt="product"
                                      />
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })}
                          </div>
                          <div className="review">
                            <Rating
                              name="size-small"
                              precision={0.5}
                              value={rating.rate}
                              size="small"
                              readOnly
                            />
                          </div>
                          <div className="reply-date">
                            {this.convertDate(rating.createdAt)}
                          </div>
                          <div
                            className="reply-btn"
                            onClick={() => this.replyClick()}
                          >
                            Trả lời
                          </div>
                          {replyBoxHidden ? (
                            <div style={{ width: "100%" }}>
                              <textarea
                                onChange={this.handleChange}
                                name="content"
                                className="reply-box"
                                value={content}
                              ></textarea>
                              <div className="row-flex">
                                <Button
                                  onClick={() => this.sendCmt(rating.id)}
                                  className="send-btn"
                                  style={{
                                    background: "#3571a7",
                                    color: "white",
                                    width: "115px",
                                    height: "38px",
                                    margin: "5px 5px 5px 0",
                                  }}
                                >
                                  Gửi
                                </Button>
                                <Button
                                  style={{
                                    background: "#fff",
                                    color: "#000",
                                    width: "115px",
                                    height: "38px",
                                    margin: "5px 5px 5px 0",
                                    border: "1px solid #ccc",
                                  }}
                                  onClick={() => this.replyClick()}
                                >
                                  Hủy bỏ
                                </Button>
                              </div>
                            </div>
                          ) : null}
                          {rating.Comments.map((cmt, cindex) => {
                            return (
                              <Fragment>
                                {cmt.idRating == rating.id &&
                                  cmt.status == "accepted" && (
                                    <div className="reply-answer" key={cindex}>
                                      <p> {cmt.content} </p>
                                      <div className="cmt-wrapper">
                                        <div className="ava-reply">
                                          <img src="./img/ava.png" alt="ava" />
                                        </div>
                                        <div className="reply-date">
                                          {this.convertDate(cmt.createdAt)}
                                        </div>
                                      </div>
                                      <div>{cmt.User.username}</div>
                                    </div>
                                  )}
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getProductById,
  getProductVarById,
  showModal,
  addRating,
  addComment,
  getRatingsByProduct,
  addCart,
  getQuestionsByProduct,
  addQuestion,
  addAnswer,
})(ProductDetail);
