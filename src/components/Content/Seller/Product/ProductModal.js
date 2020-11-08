import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  arrVariants: state.productadd.arrVariants,
});

class ProductModal extends Component {
  state = {
    name: '',
    phone: '',
    address: '',
    msg: '',
    propValuesList: [
      { name: '', values: ['Hồng', 'Xanh', 'Trắng'] },
    ],
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ msg: '' });
    let pvalues = document.getElementsByName('pvalue'),
      pname = document.getElementsByName('pname')[0].value,
      obj = { name: '', values: [] };
    if (pname == '') {
      this.setState({ msg: 'Bạn chưa nhập tên thuộc tính' });
      return;
    }

    for (let i = 0; i < pvalues.length; i++) {
      if (pvalues[i].value !== '') {
        obj.values.push({
          label: pvalues[i].value,
          value: pvalues[i].value
        });
      }
    }
    if (obj.values.length <= 0) {
      this.setState({ msg: 'Bạn chưa nhập giá trị thuộc tính' });
      return;
    }
    obj.name = pname;
    this.props.onsaveProp(obj);

    // Close modal
    document.getElementById('triggerButton').click();
  };

  onCancel = (e) => {
    this.setState({ propValuesList: [{ name: '', values: ['Hồng', 'Xanh', 'Trắng'] }] }, () => console.log(this.state.propValuesList));
  };

  onChange = (e) => {
    this.setState({ msg: '' });
    this.setState({ [e.target.name]: e.target.value });
  };

  addPropValue = () => {
    this.setState((prepState) => ({
      propValuesList: [
        ...prepState.propValuesList,
        { label: '' },
        { label: '' },
        { label: '' },
        { label: '' },
      ],
    }));
  };

  componentDidMount = () => {
    this.setState({ propValuesList: this.props.arrVariants })
  }

  render() {
    const { msg, propValuesList } = this.state;
    const { arrVariants } = this.props
    return (
      <React.Fragment>
        {/* Button trigger modal */}
        <button
          type="button"
          id="triggerButton"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          style={{ margin: '5px' }}
          className="btn btn-primary"
        >
          Thêm lựa chọn
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <form className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span>
                  <h3 className="modal-title" id="exampleModalLongTitle">
                    Thuộc tính lựa chọn sản phẩm
                  </h3>
                </span>

                <span>
                  <button
                    type="button"
                    className="close"
                    style={{
                      fontSize: '14px',
                      color: '#204d74',
                      opacity: '0.6',
                    }}
                    onClick={this.addPropValue}
                  >
                    <span aria-hidden="true">+ Thêm giá trị</span>
                  </button>
                </span>
              </div>
              <div className="modal-body">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '8px',
                      margin: '0 10px 10px 0',
                    }}
                  >
                    Tên thuộc tính lựa chọn
                  </div>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: '#f5f5f5',
                      padding: '8px',

                      marginBottom: '10px',
                    }}
                  >
                    Các giá trị lựa chọn
                  </div>
                </div>

                {propValuesList.map(item => {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ marginRight: '11px', width: '178px' }}>
                        <input
                          type="text"
                          className="form-control"
                          name="pname"
                          placeholder="VD: Màu"
                          onChange={this.onChange}
                        />
                      </div>

                      <div
                        style={{
                          flex: 1,
                          display: 'inline-grid',
                          flexDirection: 'row',
                          gridTemplateColumns: '1fr 1fr 1fr 1fr',
                          gridColumnGap: '12px',
                          gridRowGap: '12px',
                        }}
                      >
                        {item.values.map((v, index) => {
                          return (
                            <input
                              key={index}
                              type="text"
                              className="form-control"
                              name="pvalue"
                              value={v}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )
                })}

              </div>
              <div className="modal-footer">
                <p className="pull-left" style={{ color: 'red' }}>
                  {msg}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.onCancel}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                >
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps,)(ProductModal);
