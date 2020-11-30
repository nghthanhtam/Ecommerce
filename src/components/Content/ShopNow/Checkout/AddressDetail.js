import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";

class Cart extends React.Component {

  render() {
    const { id, phone, fullname, numberAndStreet, Ward, District, City } = this.props.item;
    const { addressChkboxChange } = this.props

    return (
      //   <div className="address-box">
      //   <div className="add">
      //     <p className="add1">Địa chỉ:</p>
      //     <p>{address}</p>
      //   </div>
      //   <div className="row-flex">
      //     <p className="tel1">Điện thoại:</p>
      //     <p>0778895138</p>
      //   </div>
      // </div>
      <div className="radio">
        <label>
          <input type="radio" name="address" id={id} onClick={() => addressChkboxChange(this.props.item)} />
          {fullname}
        </label>
        <div className="address-box">
          <div className="add">
            <p className="add1">Địa chỉ:</p>
            <p>{numberAndStreet + ', ' + Ward.ward + ', ' + District.district + ', ' + City.city}</p>
          </div>
          <div className="row-flex">
            <p className="tel1">Điện thoại:</p>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
