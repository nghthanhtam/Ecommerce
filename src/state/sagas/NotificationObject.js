import React from "react";
import { NOTIFICATION_TYPE_SUCCESS } from "react-redux-notify";

export const NOTI_SUCCESS = {
  message: "Dữ liệu cập nhật thành công!",
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 2000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};
