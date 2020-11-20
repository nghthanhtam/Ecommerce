import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';
import { getVariantVals } from '../../../../state/actions/variantValActions';

const mapStateToProps = (state) => ({
  variantVals: state.variantVal.variantVals,
  isLoaded: state.movie.isLoaded,
});

class ProductModal extends Component {
  state = {
    name: '',
    phone: '',
    address: '',
    msg: '',
    propValuesList: [],
    colors: [{ label: 'White', value: 1 }, { label: 'Yellow', value: 2 }],
    sizes: [{ label: 'M', value: 12 }, { label: 'L', value: 13 }],
    variants: [{ label: 'color', value: 1 }, { label: 'size', value: 2 }],
    has2Vars: false
  };

  componentDidMount() {
    this.props.getVariantVals({ limit: 1000, page: 1, query: '', idVariant: 1 })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { propValuesList } = this.state
    this.setState({ msg: '' });
    // let pvalues = document.getElementsByName('pvalue'),
    //   pname = document.getElementsByName('pname')[0].value,
    let obj = {}, objList = []

    for (let i = 0; i < propValuesList.length; i++) {
      obj = { name: { label: '', value: '' }, values: [] }

      if (propValuesList[i].name.value == '') {
        this.setState({ msg: 'Bạn chưa nhập tên thuộc tính' });
        return;
      }
      obj.name = propValuesList[i].name;

      for (let j = 0; j < propValuesList[i].values.length; j++) {
        if (propValuesList[i].values.length <= 0) {
          this.setState({ msg: 'Bạn chưa nhập giá trị thuộc tính' });
          return;
        }
        if (propValuesList[i].values[j].value !== '') {
          obj.values.push({
            label: propValuesList[i].values[j].label,
            value: propValuesList[i].values[j].value,
            __isNew__: propValuesList[i].values[j].__isNew__
          });
        }
      }
      objList.push(obj)
    }

    this.props.onsaveProp(objList);
    // Close modal
    document.getElementById('triggerButton').click();
  };

  onSelectChange = (e, { name }) => {
    //neu variant values thay doi
    const { id, value, __isNew__ } = e

    //them field nhap gia tri khi ng dung nhap den field cuoi cung
    if (name[1] == this.state.propValuesList[Number(name[0])].values.length - 1) {
      this.setState((prepState) => {
        let propValuesList = [...prepState.propValuesList];
        for (let i = 0; i < 4; i++) {
          propValuesList[Number(name[0])].values.push({ label: '', value: '' })
        }
        return {
          propValuesList,
        };
      });
    }

    this.setState((prepState) => {
      let propValuesList = [...prepState.propValuesList];

      propValuesList.map((p, index) => {
        if (index == name[0]) {
          p.values[Number(name[1])].label = value
          p.values[Number(name[1])].value = id
          p.values[Number(name[1])].__isNew__ = __isNew__
        }
      });
      return {
        propValuesList,
      };
    });
  };

  onSelectVarChange = (e, { name }) => {
    console.log(this.state.propValuesList);
    //neu variant thay doi
    this.setState((prepState) => {
      let propValuesList = [...prepState.propValuesList];
      propValuesList.map((p, index) => {
        if (index == name[0]) {
          p.name = { label: e.name, value: e.id }
        }
      });
      return {
        propValuesList,
      };
    });
  }

  onOpenModal = () => {
    //console.log('--propsVariantList--', this.props.variantList);
    const { variantList } = this.props
    if (variantList.length > 0) this.setState({ propValuesList: variantList })
    else this.setState({
      propValuesList: [{
        name: { label: '', value: '' },
        values: [{ index: 0, label: '', value: '' }, { index: 1, label: '', value: '' }, { index: 2, label: '', value: '' }, { index: 3, label: '', value: '' }]
      }]
    })
  }

  renderValOption = (name) => {
    for (let variant of this.props.variantVals) {
      if (variant.id == name) return variant.values
    }
  }
  renderValues = (item, index) => {
    return (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <div style={{ marginRight: '11px', width: '178px' }}>
          <Creatable
            key={index}
            placeholder="Thuộc tính..."
            options={this.props.variantVals}
            name={index + "pname"}
            onChange={this.onSelectVarChange}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            value={this.props.variantVals.filter(option => option.id == item.name.value)}
          />
        </div>

        <div className="variant-values-wrapper">
          {item.values && item.values.map((v, indexVal) => {
            return (
              <Creatable
                key={indexVal}
                options={this.renderValOption(item.name.value)}
                getOptionLabel={(option) => option.value}
                getOptionValue={(option) => option.id}
                value={{ value: v.label, id: v.value }}
                name={index + String(indexVal) + "pvalue"}
                onChange={this.onSelectChange}
                placeholder="Chọn..."
              />
            );
          })}
        </div>
      </div>
    )
  }

  onCheckManyVars = () => {
    const { has2Vars, propValuesList } = this.state
    this.setState({ has2Vars: !has2Vars }, () => {
      if (this.state.has2Vars) {
        this.setState((prepState) => ({
          propValuesList: [...prepState.propValuesList, { name: '', values: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }] }],
        }));
      } else {
        propValuesList.pop()
        this.setState({
          propValuesList
        });
      }
    })
  }

  render() {
    const { msg, propValuesList, has2Vars } = this.state;
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
          onClick={this.onOpenModal}
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
                  <label
                    style={{
                      fontWeight: 400,
                      width: '180px',
                      float: 'left'
                    }}
                  >
                    <input
                      style={{
                        marginRight: '3px',
                      }}
                      type="checkbox"
                      className="minimal"
                      name='has2Vars'
                      checked={has2Vars}
                      onChange={this.onCheckManyVars}
                    />
                     2 thuộc tính
                  </label>
                  <button
                    type="button"
                    className="close"
                    style={{ fontSize: '14px', color: '#204d74', opacity: '0.6' }}>
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

                {propValuesList.map((item, index) => {
                  return (this.renderValues(item, index))
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

export default connect(mapStateToProps, { getVariantVals })(ProductModal);
//export default (ProductModal);
