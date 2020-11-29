import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../../state/actions/authUserActions';
import { pushHistory } from '../../../../state/actions/historyActions';
import { showModal } from '../../../../state/actions/modalActions';
import PropTypes from 'prop-types';
import axios from 'axios';

const mapStateToProps = (state) => ({
    error: state.error,
    history: state.history,
    isAuthenticated: state.authUser.isAuthenticated,
    userToken: state.authUser.token,
});

class AddressAdd extends Component {
    state = {
        fullname: '',
        idCity: '',
        idDistrict: '',
        idWard: '',
        address: '',
        phone: '',
        msg: null,
        inputErrors: false,
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        pushHistory: PropTypes.func.isRequired,
    };

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
        // const currentUrl = window.location.pathname;
        // document.body.className = currentUrl === '/login' && 'hold-transition login-page';
        let id = ''
        if (this.props.match) id = this.props.match.params.id;
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_USER}/api/address/${id}`,
                this.tokenConfig(this.props.userToken)
            )
            .then((response) => {
                let {
                    fullname, phone, idCity, idDistrict, idWard, address
                } = response.data;
                this.setState({ fullname, phone, idCity, idDistrict, idWard, address });
            })
            .catch((er) => console.log(er.response));
    }

    validateUsername(fullname) {
        return new RegExp(/^[a-zA-Z0-9_-]+$/).test(fullname);
    }

    validatePhone(phone) {
        return new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/).test(phone);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        let msg = '';

        //Validation
        const isPassed = true
        if (name === 'fullname') isPassed = this.validateUsername(value)
        else if (name === 'phone') isPassed = this.validatePhone(value)
        const inputErrors = isPassed ? false : true;
        if (name === 'fullname' && !isPassed)
            msg = 'Tên chỉ bao gồm chữ cái, số và gạch dưới';
        if (name === 'phone' && !isPassed)
            msg = 'Số điện thoại chưa hợp lệ';

        if (value === '') msg = '';
        this.setState({ [name]: value, msg, inputErrors });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, idCity, idDistrict, idWard, address, phone } = this.state;
        const newAddress = {
            fullname, idCity, idDistrict, idWard, address, phone
        };
        //this.props.addAddress(newAddress);
    };

    render() {
        const { fullname, phone, idCity, idDistrict, idWard, address, msg, inputErrors } = this.state
        const { showModal } = this.props
        return (
            <div className='login-wrapper'>
                <div style={{ background: '#fff', padding: '30px 20px 20px 20px', transition: 'opacity 0.5s linear' }} className="login-box">
                    <button onClick={() => this.props.showModal({ show: false })} style={{ float: 'right', marginTop: '-15px' }} type="button" className="close" data-dismiss="alert" aria-hidden="true">
                        ×
                    </button>

                    <div className="login-box-body">
                        <p className="login-box-msg">Thêm địa chỉ giao hàng mới</p>
                        {this.state.msg ? (
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true"
                                    onClick={() => this.showModal({ show: false })}>
                                    ×
                                </button>
                                {this.state.msg}
                            </div>
                        ) : null}

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input
                                    type="fullname"
                                    name="fullname"
                                    className="form-control"
                                    placeholder="Họ và tên"
                                    value={fullname}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <input
                                    type="phone"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="idCity" value={idCity} onChange={this.handleChange} >
                                    <option value="" disabled selected>Chọn thành phố / tỉnh</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="2">option 3</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="idDistrict" value={idDistrict} onChange={this.handleChange} >
                                    <option value="" disabled selected>Chọn quận / huyện</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="2">option 3</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="idWard" value={idWard} onChange={this.handleChange} >
                                    <option value="" disabled selected>Chọn phường / xã</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="2">option 3</option>
                                </select>
                            </div>
                            <div className="row">
                                {/* /.col */}
                                <div className="col-xs-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block btn-flat"
                                        disabled={
                                            !inputErrors &&
                                                fullname !== '' && phone !== '' && idCity !== '' && idDistrict !== '' && idWard !== ''
                                                ? false : true}>
                                        Thêm
                                    </button>
                                    <button
                                        className="btn btn-default btn-block btn-flat"
                                        disabled={
                                            !this.state.inputErrors && this.state.password !== '' && this.state.username !== '' ? false : true}
                                        onClick={() => showModal({ show: false })}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { login, pushHistory, showModal })(AddressAdd);
