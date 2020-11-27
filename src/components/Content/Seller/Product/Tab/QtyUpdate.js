import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import Select from 'react-select'

import { getProductVarsByIdShop } from '../../../../../state/actions/productVarActions';
import { pushHistory } from '../../../../../state/actions/historyActions';
import ProductRow from '../ProductRow';

const mapStateToProps = (state) => ({
    productVars: state.productVar.productVars,
    isLoaded: state.productVar.isLoaded,
    idShop: state.auth.role.idShop,
    totalDocuments: state.productVar.totalDocuments
});

class QtyUpdate extends React.Component {
    state = {
        sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
        limit: 5,
        page: 1,
        query: '',
        pages: [],
        start: 1,
        end: 5,
        isNextBtnShow: false,
        propValueList: [],
        productList: [
            {
                index: 0,
                id: 0,
                idProduct: '',
                idShop: '',
                SKU: '',
                marketPrice: 0,
                name: '',
                price: 0,
                qty: 0,
                qtyAdd: 0,
                status: 1
            },
        ],
    }

    componentDidMount() {
        const { limit, page, query } = this.state;
        const { idShop } = this.props
        this.props.getProductVarsByIdShop({ limit, page, query, idShop, getActive: false });
    }

    onAddingQty = (e, index) => {
        const { productList } = this.state
        productList.map((pd) => {
            if (pd.index === index) {
                pd.qtyAdd = Number(e.target.textContent);
            }
        });
        console.log(this.state.productList);
    }

    addRow = () => {
        let { skuproduct, productList } = this.state, obj = {};
        obj = Object.assign(skuproduct);
        obj.index = Math.max.apply(Math, productList.map(function (element) { return element.index })) + 1
        this.setState((prepState) => ({
            //add obj to warehouse product list
            productList: [...prepState.productList, obj],
        }));
    };

    render() {
        const { propValueList, productList } = this.state
        const { productVars } = this.props
        return (
            <section className="content">
                <button
                    type="button"
                    id="btnAdd"
                    style={{ float: 'left', margin: '-10px 0 5px 0' }}
                    className="btn btn-primary"
                    data-toggle="modal"
                    onClick={this.addRow}>
                    Thêm dòng
          </button>
                <div className="row">
                    <div>
                        <div className="col-sm-6">
                            <div
                                className="dataTables_length"
                                id="example1_length">
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div
                                id="example1_filter"
                                className="dataTables_filter">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ width: '105%' }}>
                    <div className="col-sm-12">
                        <table
                            id="example1"
                            className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '2%' }}>#</th>
                                    {propValueList.map((item, index) => (
                                        <th key={index} style={{ width: '15%' }}>
                                            {item.name}
                                        </th>
                                    ))}
                                    <th style={{ width: '20%' }}>Tên sản phẩm</th>
                                    <th style={{ width: '15%' }}>Giá niêm yết</th>
                                    <th style={{ width: '15%' }}>Giá bán</th>
                                    <th style={{ width: '10%' }}>Số lượng tồn</th>
                                    <th style={{ width: '10%' }}>Số lượng nhập</th>
                                    <th style={{ width: '2%' }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {productList.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td key={index} bgcolor="#FFFFFF">
                                            <Select
                                                styles={{
                                                    control: (base, state) => ({
                                                        ...base,
                                                        borderColor: 'transparent',
                                                    }),
                                                }}
                                                options={productVars}
                                                getOptionLabel={(option) => option.name + ' - ' + option.SKU}
                                                getOptionValue={(option) => option.id}
                                                name="name"
                                                onChange={(e) => this.onChange(e, index)}
                                            />
                                        </td>
                                        <td
                                            name="marketPrice"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                        >{product.marketPrice}</td>
                                        <td
                                            name="price"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                        >{product.price}</td>
                                        <td
                                            name="qty"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                        >{product.qty}</td>
                                        <td
                                            name="qtyAdd"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                            contentEditable="true"
                                            onBlur={(e) => this.onAddingQty(e, index)}
                                        >{product.qtyAdd}</td>
                                        <td bgcolor="#FFFFFF">
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.removeItem(index)}
                                                className="fa fa-trash"
                                            ></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="button"
                        style={{ marginRight: '18px', float: 'right' }}
                        className="btn btn-primary"
                        onClick={() => this.onSubmit()}
                    >
                        Tiến hành nhập kho
            </button>
                </div>
            </section>
        )
    }
}

QtyUpdate.propTypes = {
    getProductVarsByIdShop: PropTypes.func.isRequired,
    productVars: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getProductVarsByIdShop, pushHistory })(QtyUpdate);
const inputField = {
    '&:focus': {
        outline: 'none',
    },
};
