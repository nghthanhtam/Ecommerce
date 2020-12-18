import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { login } from '../../../../state/actions/authUserActions';
import { pushHistory } from '../../../../state/actions/historyActions';
import { showModal } from '../../../../state/actions/modalActions';
import { getCities } from '../../../../state/actions/cityActions';
import { getDistricts } from '../../../../state/actions/districtActions';
import { getWards } from '../../../../state/actions/wardActions';
import { addAddress, updateAddress } from '../../../../state/actions/addressActions';

const mapStateToProps = (state) => ({
    error: state.error,
    history: state.history,
    isAuthenticated: state.authUser.isAuthenticated,
    userToken: state.authUser.token,
    user: state.authUser.user,
    details: state.modal.details,
    cities: state.city.cities,
    districts: state.district.districts,
    wards: state.ward.wards,
    isCityLoaded: state.city.isLoaded,
    isDistrictLoaded: state.district.isLoaded,
    isWardLoaded: state.ward.isLoaded,
    address: state.address.address
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
        const { getCities, getDistricts, getWards, details } = this.props
        let id = ''

        getCities({ limit: 1000, page: 1 })
        if (details) id = details.id
        if (id !== '') {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_USER}/api/address/${id}`,
                    this.tokenConfig(this.props.userToken)
                )
                .then((response) => {
                    let {
                        fullname, phone, idCity, idDistrict, idWard, numberAndStreet
                    } = response.data;
                    this.setState({ fullname, phone, idCity, idDistrict, idWard, numberAndStreet });
                    console.log('abc');
                    getDistricts({ limit: 1000, page: 1, idCity })
                    getWards({ limit: 1000, page: 1, idDistrict })
                })
                .catch((er) => console.log(er.response));
        }
    }

    validateUsername = (fullname) => {
        return !new RegExp(
            /[^a-z0-9A-Z_-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
        ).test(fullname);
    };

    validatePhone(phone) {
        return new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/).test(phone);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let msg = '';

        if (name == 'idCity') this.props.getDistricts({ limit: 1000, page: 1, idCity: value })
        if (name == 'idDistrict') this.props.getWards({ limit: 1000, page: 1, idDistrict: value })

        //Validation
        let isPassed = true
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
        const { fullname, idCity, idDistrict, idWard, numberAndStreet, phone } = this.state;
        const { user, details, updateAddress, addAddress, showModal } = this.props
        const newAddress = {
            fullname, idCity, idDistrict, idWard, numberAndStreet, phone, isHome: true, isMain: true, idUser: user.id
        };
        if (details) {
            newAddress.id = details.id
            updateAddress(newAddress);
        }
        else {
            addAddress(newAddress)
        }
        showModal({ show: false })
    };

    render() {
        const { fullname, phone, idCity, idDistrict, idWard, numberAndStreet, inputErrors } = this.state
        const { showModal, cities, districts, wards, isCityLoaded, isDistrictLoaded, isWardLoaded } = this.props
        return (
            <div className='modal-wrapper'>
                <div style={{ background: '#fff', padding: '30px 20px 20px 20px', transition: 'opacity 0.5s linear' }} className="login-box">
                    <button onClick={() => this.props.showModal({ show: false })} style={{ float: 'right', marginTop: '-15px' }} type="button" className="close" data-dismiss="alert" aria-hidden="true">
                        ×
                    </button>
                    <div className="login-box-body">
                        <h3 className="login-box-msg">Thêm địa chỉ giao hàng mới</h3>
                        {this.state.msg ? (
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true"
                                    onClick={() => showModal({ show: false })}>
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
                                    required
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
                                    required
                                    value={phone}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <input
                                    type="numberAndStreet"
                                    name="numberAndStreet"
                                    className="form-control"
                                    placeholder="Số nhà, đường"
                                    required
                                    value={numberAndStreet}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <select defaultValue={0} className="form-control" name="idCity" value={idCity !== '' ? idCity : 0} onChange={this.handleChange} >
                                    <option value="0" disabled>Chọn thành phố / tỉnh</option>
                                    {isCityLoaded && cities.map((item, index) => {
                                        return (<option key={index} value={item.id}>{item.city}</option>)
                                    })}

                                </select>
                            </div>
                            <div className="form-group">
                                <select defaultValue={0} className="form-control" name="idDistrict" value={idDistrict !== '' ? idDistrict : 0} onChange={this.handleChange} >
                                    <option value="0" disabled>Chọn quận / huyện</option>
                                    {isDistrictLoaded && districts.map((item, index) => {
                                        return (<option key={index} value={item.id}>{item.district}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <select defaultValue={0} className="form-control" name="idWard" value={idWard !== '' ? idWard : 0} onChange={this.handleChange} >
                                    <option value="0" disabled>Chọn phường / xã</option>
                                    {isWardLoaded && wards.map((item, index) => {
                                        return (<option key={index} value={item.id}>{item.ward}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="row">
                                {/* /.col */}
                                <div className="col-xs-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block btn-flat"
                                        disabled={!inputErrors ? false : true}>
                                        Lưu
                                    </button>
                                    <button
                                        className="btn btn-default btn-block btn-flat"
                                        disabled={
                                            !this.state.inputErrors ? false : true}
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

export default connect(mapStateToProps, { login, pushHistory, showModal, getCities, getDistricts, getWards, addAddress, updateAddress })(AddressAdd);
