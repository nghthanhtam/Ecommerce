import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../state/actions/historyActions';
import { showModal } from '../../../state/actions/modalActions';
import { updateOrder } from '../../../state/actions/orderActions';

const mapStateToProps = (state) => ({
    history: state.history,
    userToken: state.authUser.token,
    user: state.authUser.user,
    details: state.modal.details,
});

class ModalProductDetails extends Component {
    state = {
        cancelReason: '',
        msg: null,
        inputErrors: false,
        nameObj: {}
    };

    componentDidMount() {
        console.log(this.props)
        const { data, productCateName, brand } = this.props.details
        if (productCateName == 'book') this.setState({ nameObj: { author: 'Tác giả', publisher: 'Nhà xuất bản', language: 'Ngôn ngữ' } })
        else if (productCateName == 'clothes') this.setState({ nameObj: { origin: 'Xuất xứ' } })
    }

    render() {
        const { nameObj } = this.state
        const { data, brand } = this.props.details
        return (
            <div className='modal-wrapper'>
                <div style={{ background: '#fff', padding: '20px 20px 20px 20px', transition: 'opacity 0.5s linear' }} className="login-box">
                    <button onClick={() => this.props.showModal({ show: false })} style={{ float: 'right', marginTop: '-10px' }} type="button" className="close" data-dismiss="alert" aria-hidden="true">
                        ×
                    </button>
                    <div className="login-box-body">
                        <h3 className="login-box-msg">Thông tin sản phẩm </h3>

                        <form onSubmit={this.handleSubmit}>
                            <div className="box-body">
                                {data.map(d => {
                                    return (
                                        Object.keys(nameObj).map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {item == d.detail &&
                                                        (
                                                            <div className='row-flex'>
                                                                <p style={{ fontWeight: '500', marginRight: '5px' }}>{nameObj[item]}: </p>
                                                                <p>{d.value}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    )
                                })}

                                {/* <div className='row-flex'>
                                    <p style={{ fontWeight: '500', marginRight: '5px' }}>Thương hiệu </p>
                                    <p> {brand}</p>
                                </div> */}
                            </div>
                            <div className="row">
                                {/* /.col */}
                                <div className="col-xs-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block btn-flat"
                                        onClick={() => this.props.showModal({ show: false })}>
                                        Đóng
                                    </button>
                                    {/* <button
                                        className="btn btn-default btn-block btn-flat"
                                        disabled={
                                            !this.state.inputErrors ? false : true}
                                        onClick={() => showModal({ show: false })}>
                                        Hủy
                                    </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { pushHistory, showModal, updateOrder })(ModalProductDetails);
