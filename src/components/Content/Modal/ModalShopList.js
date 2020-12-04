import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pushHistory } from '../../../state/actions/historyActions';
import { showModal } from '../../../state/actions/modalActions';
import { updateOrder } from '../../../state/actions/orderActions';
import './modal.css'

const mapStateToProps = (state) => ({
    history: state.history,
    userToken: state.authUser.token,
    user: state.authUser.user,
    details: state.modal.details,
});

class ModalShopList extends Component {
    state = {
        cancelReason: '',
        msg: null,
        inputErrors: false,
    };

    validateCancelReason = (fullname) => {
        return !new RegExp(
            /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
        ).test(fullname);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        let msg = '';

        //Validation
        let isPassed = true
        isPassed = this.validateCancelReason(value)
        const inputErrors = isPassed ? false : true;
        if (!isPassed)
            msg = 'Bạn chỉ được nhập chữ cái, số và gạch dưới';

        if (value === '') msg = '';
        this.setState({ [name]: value, msg, inputErrors });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { details, showModal, updateOrder } = this.props
        const { cancelReason } = this.state

        if (details) {
            const newOrder = details.order
            newOrder.status = 'canceled'
            newOrder.cancelReason = cancelReason
            updateOrder(newOrder);
            showModal({ show: false })
            window.location.reload()
        }
    };

    render() {
        const { showModal } = this.props
        return (
            <div className='modal-wrapper'>
                <div style={{ background: '#fff', padding: '20px 20px 20px 20px', transition: 'opacity 0.5s linear' }} className="login-box">
                    <button onClick={() => this.props.showModal({ show: false })} style={{ float: 'right', marginTop: '-10px' }} type="button" className="close" data-dismiss="alert" aria-hidden="true">
                        ×
                    </button>
                    <div className="login-box-body">
                        <h2 className="login-box-msg">Các nhà bán khác</h2>
                        {this.state.msg ? (
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true"
                                    onClick={() => showModal({ show: false })}>
                                    ×
                                </button>
                            </div>
                        ) : null}

                        <div className='shoplist-wrapper' >
                            <div className="ava-reply">
                                <img src="./img/ava.png" alt="ava" />
                            </div>
                            <div className="shoplist-infor">
                                <h4>Tiki notTrading</h4>
                                <p style={{ fontSize: '17px' }}>150,000đ</p>
                            </div>
                            <button className="btn btn-default"
                                onClick={() => showModal({ show: false })}> Chọn
                            </button>
                        </div>
                        <div className='shoplist-wrapper'>
                            <div className="ava-reply">
                                <img src="./img/ava.png" alt="ava" />
                            </div>
                            <div className="shoplist-infor">
                                <h4>Tiki notTrading</h4>
                                <p style={{ fontSize: '17px' }}>150,000đ</p>
                            </div>
                            <button className="btn btn-default"
                                onClick={() => showModal({ show: false })}> Chọn
                            </button>
                        </div>
                        <div className='shoplist-wrapper'>
                            <div className="ava-reply">
                                <img src="./img/ava.png" alt="ava" />
                            </div>
                            <div className="shoplist-infor">
                                <h4>Tiki notTrading</h4>
                                <p style={{ fontSize: '17px' }}>150,000đ</p>
                            </div>
                            <button className="btn btn-default"
                                onClick={() => showModal({ show: false })}> Chọn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { pushHistory, showModal, updateOrder })(ModalShopList);
