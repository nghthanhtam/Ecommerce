import React, { Component } from "react";
import { connect } from "react-redux";
import Creatable from "react-select/creatable";
import { getVariantVals } from "../../../../state/actions/variantValActions";

const mapStateToProps = (state) => ({
  variantVals: state.variantVal.variantVals,
  isLoaded: state.movie.isLoaded,
});

class ProductModal extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    msg: "",
    propValuesList: [],
    colors: [
      { label: "White", value: 1 },
      { label: "Yellow", value: 2 },
    ],
    sizes: [
      { label: "M", value: 12 },
      { label: "L", value: 13 },
    ],
    variants: [
      { label: "color", value: 1 },
      { label: "size", value: 2 },
    ],
    has2Vars: false,
    emptyObj: "",
    nameCLear: "",
  };

  componentDidMount() {
    this.props.getVariantVals({
      limit: 1000,
      page: 1,
      query: "",
      idVariant: 1,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { propValuesList } = this.state;
    this.setState({ msg: "" });
    // let pvalues = document.getElementsByName('pvalue'),
    //   pname = document.getElementsByName('pname')[0].value,
    let obj = {},
      objList = [];

    console.log("propValuesList: ", propValuesList);
    for (let i = 0; i < propValuesList.length; i++) {
      obj = { name: { label: "", value: "" }, values: [] };

      if (propValuesList[i].name.value == "") {
        this.setState({ msg: "Bạn chưa nhập tên thuộc tính" });
        return;
      }
      obj.name = propValuesList[i].name;

      for (let j = 0; j < propValuesList[i].values.length; j++) {
        if (!propValuesList[i].values.some((val) => val.value !== "")) {
          this.setState({ msg: "Bạn chưa nhập giá trị thuộc tính" });
          return;
        }
        if (propValuesList[i].values[j].value !== "") {
          obj.values.push({
            label: propValuesList[i].values[j].label,
            value: propValuesList[i].values[j].value,
            __isNew__: propValuesList[i].values[j].__isNew__,
          });
        }
      }
      objList.push(obj);
    }
    console.log(objList);
    this.props.onsaveProp(objList);
    // Close modal
    document.getElementById("triggerButton").click();
  };

  addEmptyVariantValues = (index) => {
    this.setState((prepState) => {
      let propValuesList = [...prepState.propValuesList];
      for (let i = 0; i < 3; i++) {
        propValuesList[index].values.push({ label: "", value: "" });
      }
      return {
        propValuesList,
      };
    });
  };

  onSelectChange = (e, { name }, v) => {
    if (!e) {
      let variantIndex = Number(name[0]);
      name = name.substring(1); //bỏ chữ cái đầu
      let valueIndex = Number(name.split("pvalue")[0]); //bỏ chữ pvalue

      this.setState(
        (prepState) => {
          let propValuesList = [...prepState.propValuesList],
            variantValue = propValuesList[variantIndex].values[valueIndex];
          variantValue.value = "";
          variantValue.label = "";
          return {
            propValuesList,
          };
        },
        () => {
          console.log("--", this.state.propValuesList);
        }
      );
      this.setState({ nameCLear: name });
      this.setState({ emptyObj: null });
      return;
    }

    this.setState({ msg: "" });
    this.setState({ emptyObj: "" });

    //neu variant values thay doi
    let { id, value, __isNew__ } = e;
    if (e.__isNew__) {
      value = e.label;
      id = e.value;
    }

    //them field nhap gia tri khi ng dung nhap den field cuoi cung
    if (
      name[1] ==
      this.state.propValuesList[Number(name[0])].values.length - 1
    ) {
      this.setState((prepState) => {
        let propValuesList = [...prepState.propValuesList];
        for (let i = 0; i < 3; i++) {
          propValuesList[Number(name[0])].values.push({ label: "", value: "" });
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
          p.values[Number(name[1])].label = value;
          p.values[Number(name[1])].value = id;
          p.values[Number(name[1])].__isNew__ = __isNew__;
        }
      });
      return {
        propValuesList,
      };
    });
  };

  onSelectVarChange = (e, { name }) => {
    let { label, value, __isNew__ } = e;
    if (!e.__isNew__) {
      label = e.name;
      value = e.id;
    }

    //neu variant thay doi
    this.setState((prepState) => {
      let propValuesList = [...prepState.propValuesList];
      propValuesList.map((p, index) => {
        if (index == name[0]) {
          p.name = { label, value, __isNew__ };
        }
      });
      return {
        propValuesList,
      };
    });
  };

  onOpenModal = () => {
    const { variantList } = this.props;
    if (variantList.length > 0) {
      let tempArr = [...variantList];
      for (let i in tempArr) {
        if (tempArr[i].values.length < 3) {
          for (let j = 0; j < 3 - tempArr[i].values.length + 1; j++) {
            tempArr[i].values.push({ label: "", value: "" });
          }
        }
      }

      this.setState({ propValuesList: tempArr });
    } else
      this.setState({
        propValuesList: [
          {
            name: { label: "", value: "" },
            values: [
              { label: "", value: "" },
              { label: "", value: "" },
              { label: "", value: "" },
            ],
          },
        ],
      });
  };

  renderValOption = (name) => {
    for (let variant of this.props.variantVals) {
      if (variant.id == name) return variant.values;
    }
  };

  renderValues = (item, index) => {
    const { emptyObj, nameCLear } = this.state;
    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <div style={{ marginRight: "11px", width: "165px" }}>
          <Creatable
            key={index}
            placeholder="Thuộc tính..."
            options={this.props.variantVals}
            name={index + "pname"}
            onChange={this.onSelectVarChange}
            getOptionLabel={(option) => {
              return option.__isNew__ ? option.label : option.name;
            }}
            getOptionValue={(option) => option.id}
            value={{ name: item.name.label, id: item.name.value }}
          />
        </div>

        <div className="variant-values-wrapper">
          {item.values &&
            item.values.map((v, indexVal) => {
              return (
                <Creatable
                  isClearable={true}
                  key={indexVal}
                  options={this.renderValOption(item.name.value)}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.id}
                  value={
                    emptyObj !== "" &&
                    nameCLear == index + String(indexVal) + "pvalue"
                      ? emptyObj
                      : { value: v.label, id: v.value }
                  }
                  name={index + String(indexVal) + "pvalue"}
                  onChange={this.onSelectChange}
                  placeholder="Chọn..."
                />
              );
            })}
          <button
            type="button"
            className="close btn-addempty"
            onClick={() => this.addEmptyVariantValues(index)}
          >
            <span aria-hidden="true">+ Thêm ô giá trị</span>
          </button>
        </div>
      </div>
    );
  };

  onCheckManyVars = () => {
    const { has2Vars, propValuesList } = this.state;
    this.setState({ has2Vars: !has2Vars }, () => {
      if (this.state.has2Vars) {
        this.setState((prepState) => ({
          propValuesList: [
            ...prepState.propValuesList,
            {
              name: "",
              values: [
                { label: "", value: "" },
                { label: "", value: "" },
                { label: "", value: "" },
              ],
            },
          ],
        }));
      } else {
        propValuesList.pop();
        this.setState({
          propValuesList,
        });
      }
    });
  };

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
          style={{ margin: "5px" }}
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
            <div className="modal-content" style={{ width: "800px" }}>
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
                      width: "180px",
                      float: "left",
                    }}
                  >
                    <input
                      style={{
                        marginRight: "3px",
                      }}
                      type="checkbox"
                      className="minimal"
                      name="has2Vars"
                      checked={has2Vars}
                      onChange={this.onCheckManyVars}
                    />
                    2 thuộc tính
                  </label>
                </span>
              </div>
              <div className="modal-body">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "8px",
                      margin: "0 10px 10px 0",
                    }}
                  >
                    Tên thuộc tính lựa chọn
                  </div>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#f5f5f5",
                      padding: "8px",

                      marginBottom: "10px",
                    }}
                  >
                    Các giá trị lựa chọn
                  </div>
                </div>

                {propValuesList.map((item, index) => {
                  return this.renderValues(item, index);
                })}
              </div>
              <div className="modal-footer">
                <p className="pull-left" style={{ color: "red" }}>
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
