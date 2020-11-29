import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";

class Cart extends React.Component {

  render() {
    const { address, id, idUser } = this.props.item;
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
      <div class="radio">
        <label>
          <input type="radio" name="address" id={id} onClick={() => addressChkboxChange(id)} />
          {idUser}
        </label>
        <div className="address-box">
          <div className="add">
            <p className="add1">Địa chỉ:</p>
            <p>{address}</p>
          </div>
          <div className="row-flex">
            <p className="tel1">Điện thoại:</p>
            <p>0778895138</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
