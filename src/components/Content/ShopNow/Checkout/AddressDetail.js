import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../assets/css/cart.css";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    let { item } = this.props;
    return (
      <div>
        <FormControlLabel
          color="default"
          value={item._id}
          control={<Radio color="default" />}
          label={item.label}
        />
        <div className="address-box">
          <div className="add">
            <p className="add1">Địa chỉ:</p>
            <p>679 Lê Đức Thọ, P15, Gò Vấp , TPHCM</p>
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
