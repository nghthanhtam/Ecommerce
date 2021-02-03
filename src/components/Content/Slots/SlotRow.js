import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";

const mapStateToProps = (state) => ({
  permissionAdmins: state.authAdmin.permissions,
});

const SlotRow = ({
  item,
  index,
  updateItemStatus,
  cate,
  pages,
  permissionAdmins,
  showModal,
}) => {
  const [statuses, setStatuses] = useState([
    { value: "accepted", label: "Duyệt" },
    { value: "declined", label: "Không duyệt" },
  ]);

  const handleUpdate = (status) => {
    if (status.value !== "reply")
      updateItemStatus({
        id: item.id,
        status: status.value,
        pages,
      });
    else
      showModal({
        show: true,
        modalName: "modalReply",
        details: {
          type: cate == "rating" ? "comment" : "answer",
          idRating: item.id,
          idQuestion: item.id,
        },
      });
  };

  useEffect(() => {
    if (cate == "rating" || cate == "question")
      setStatuses([
        { value: "accepted", label: "Duyệt" },
        { value: "declined", label: "Không duyệt" },
        { value: "reply", label: "Phản hồi" },
      ]);
  }, []);

  function convertDate(date) {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.idUser}</td>
      {cate == "question" && (
        <>
          <td>{item.idProduct}</td>
          <td>{item.question}</td>
        </>
      )}
      {cate == "answer" && (
        <>
          {
            <td>
              {item.Question ? <td> {item.Question.question} </td> : "Đã xóa"}
            </td>
          }
          <td>{item.answer}</td>
        </>
      )}
      {cate == "comment" && (
        <>
          {
            <td>
              {item.Rating ? (
                <>
                  <div style={{ fontWeight: "500" }}>{item.Rating.title}</div>
                  {item.Rating.review}
                </>
              ) : (
                "Đã xóa"
              )}
            </td>
          }
          <td>{item.content}</td>
        </>
      )}
      {cate == "rating" && (
        <>
          <td>{item.idProduct}</td>
          <td>
            <div style={{ fontWeight: "500" }}>{item.title}</div>
            {item.review}
          </td>
        </>
      )}

      <td>{convertDate(item.createdAt)}</td>
      {((permissionAdmins.includes("pendRating") && cate == "rating") ||
        (permissionAdmins.includes("pendQuestion") && cate == "question") ||
        (permissionAdmins.includes("pendComment") && cate == "comment") ||
        (permissionAdmins.includes("pendAnswers") && cate == "answer")) && (
        <td>
          <div className="btn-group">
            <button type="button" className="btn btn-info">
              Thao tác
            </button>
            <button
              type="button"
              className="btn btn-info dropdown-toggle"
              data-toggle="dropdown"
            >
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu" role="menu">
              {statuses.map((s, index) => (
                <li key={index} onClick={() => handleUpdate(s)}>
                  <a href="javascript:void(0);"> {s.label} </a>
                </li>
              ))}
            </ul>
          </div>
        </td>
      )}
    </tr>
  );
};

export default connect(mapStateToProps, { pushHistory, showModal })(SlotRow);
