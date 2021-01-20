import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePromotion } from "../../../../state/actions/promotionActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  permissionAdmins: state.authAdmin.permissions,
});

class APromotionRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  handleEdit = (id) => {
    this.props.history.push({
      pathname: "/admin/promotion/edit",
      search: `?id=${id}`,
    });
  };

  handleDelete = (id) => {
    this.props.deletePromotion(id);
  };

  render() {
    const { promotion, permissionAdmins } = this.props;

    return (
      <tr>
        <td>{promotion.idPromotionType}</td>
        <td>{promotion.name}</td>
        <td>{promotion.couponCode}</td>
        <td>
          {this.convertDate(promotion.timeStart)}-
          {this.convertDate(promotion.timeEnd)}
        </td>
        <td>{promotion.minAmount}</td>
        <td>{promotion.maxDiscount}</td>
        <td>{promotion.percentage}%</td>

        {(permissionAdmins.includes("editPromotion") ||
          permissionAdmins.includes("deletePromotion")) && (
          <td>
            <div className="btn-group">
              {permissionAdmins.includes("editPromotion") && (
                <button
                  onClick={() => this.handleEdit(promotion.id)}
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              )}

              {permissionAdmins.includes("deletePromotion") && (
                <button
                  onClick={() => this.handleDelete(promotion.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Xóa
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }
}

export default connect(mapStateToProps, { deletePromotion, pushHistory })(
  APromotionRow
);
