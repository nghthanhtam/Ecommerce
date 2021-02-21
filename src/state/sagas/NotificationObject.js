import React from "react";
import { NOTIFICATION_TYPE_SUCCESS } from "react-redux-notify";

export const NOTI_SUCCESS = {
  message: "Dữ liệu cập nhật thành công!",
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 2000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const NOTI_APPROVE_SUCCESS = {
  message: "Duyệt thành công!",
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 2000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const NOTI_DEL_PROMOTION_SUCCESS = {
  message: "Xóa mã giảm giá thành công!",
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 2000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};
