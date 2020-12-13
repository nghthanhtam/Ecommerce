import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Select from "react-select";
import Loader from 'react-loader';
import axios from 'axios';

import { pushHistory } from '../../../../state/actions/historyActions';
import { updateProductVar } from '../../../../state/actions/productVarActions';

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
  };
};

class ProductEdit extends Component {
  state = {
    id: '', name: '', SKU: '', marketPrice: 0, price: 0, status: '', Images: [],
    statuses: [{ label: 'Đang chờ duyệt', value: 'pending' },
    { label: 'Đang kinh doanh', value: 'active' },
    { label: 'Ngừng kinh doanh', value: 'inactive' }],
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then((response) => {
        let {
          id, name, SKU, marketPrice, price, status, Images
        } = response.data;
        this.setState({ id, name, SKU, marketPrice, price, status, Images });
      })
      .catch((er) => console.log(er.response));
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeSelect = (selectedItem, { name }) => {
    this.setState({ [name]: selectedItem.value });
  }

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
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          files[i].filePath = URL.createObjectURL(files[i]);
          this.setState((prepState) => ({
            Images: [...prepState.Images, files[i]]
          }));
        } else {
          files[i]['invalid'] = true;
          this.setState({ errorMessage: 'Định dạng tệp không phù hợp' });
        }
      }
    }
  }

  handleSubmit = (e) => {
    const { id, name, SKU, marketPrice, price, status } = this.state;
    e.preventDefault();

    const newProductVar = {
      id, name, SKU, marketPrice, price, status
    };
    this.props.updateProductVar(newProductVar);
    //Quay về trang chính
    this.props.history.push('/product');
  };

  handleCancel = (e) => {
    this.props.history.push('/product');
  };

  oncheckboxChange = (id) => {
    this.setState((prepState) => {
      let Images = [...prepState.Images];
      Images.map((image) => {
        if (image.id == id) image.isMain = true
        else image.isMain = false
      })
      return {
        Images,
      };
    }, () => console.log(this.state.Images));
  }

  render() {
    const { id, name, SKU, marketPrice, price, status, Images,
      statuses } = this.state;

    return (
      <Fragment>
        <div>
          <section className="content-header">
            <ol className="breadcrumb" >
              <li>
                <a href="fake_url">
                  <i className="fa fa-dashboard" /> Trang chủ
                  </a>
              </li>
              <li>
                <a href="fake_url">Sản phẩm</a>
              </li>
              <li>
                <a href="fake_url">Chỉnh sửa</a>
              </li>
            </ol>
          </section>
          <section className="content" style={{ width: '165vw', marginTop: '10px' }}>
            <div className="row">
              <div className="col-md-6">
                <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Cập nhật thông tin sản phẩm</h3>
                  </div>
                  <form
                    role="form"
                    onSubmit={this.handleSubmit}>
                    <div className="box-body">
                      <div className="form-group">
                        <label for="id">ID</label>
                        <input className="form-control" name="id" type="text" placeholder="Loading..." className="form-control" value={id} disabled onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label for="SKU">SKU</label>
                        <input className="form-control" name="SKU" type="text" placeholder="Loading..." className="form-control" value={SKU} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label for="name">Tên sản phẩm</label>
                        <input className="form-control" name="name" type="text" placeholder="Loading..." className="form-control" value={name} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label for="marketPrice">Giá niêm yết</label>
                        <input className="form-control" name="marketPrice" type="number" placeholder="Loading..." className="form-control" value={marketPrice} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label for="price">Giá bán</label>
                        <input className="form-control" name="price" type="number" placeholder="Loading..." className="form-control" value={price} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label for="price">Tình trạng</label>
                        <Select
                          name="status"
                          onChange={this.handleChangeSelect}
                          isSearchable={true}
                          options={statuses}
                          placeholder="Loading ..."
                          value={statuses.filter(option => option.value === status)} />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputFile">Hình ảnh</label>
                        <input type="file" id="exampleInputFile" onChange={this.handleFileSelect} />
                      </div>
                      <div className="sku-grid">
                        {Images.length > 0 &&
                          Images.map((photo, index) => {
                            return (
                              <label
                                key={index}
                                htmlFor={photo}
                                className="skuproduct-card">
                                <img
                                  style={{ width: '100%', height: '90%' }}
                                  className="product-pic"
                                  src={photo.url}
                                  alt="sản phẩm"
                                />
                                <div className="product-info">
                                  <input
                                    className="color-checked"
                                    type="checkbox"
                                    checked={photo.isMain}
                                    onChange={() => this.oncheckboxChange(photo.id)}
                                  />
                                </div>
                              </label>
                            );
                          })}
                        {/* <div className="upload-area">
                          <i className="fa fa-upload fa-3x" />
                          <p className="upload-text">Kéo và thả ảnh vào để tải ảnh lên</p>
                          {errorMessage}
                        </div> */}
                      </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      <button
                        type="button"
                        onClick={this.handleCancel}
                        className="btn btn-default">
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="btn btn-info pull-right">
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment >
    );
  }
}

export default connect(mapStateToProps, { pushHistory, updateProductVar, })(ProductEdit);
