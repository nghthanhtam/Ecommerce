import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { deleteComment, updateCommentStatus } from '../../../../state/actions/commentActions';
import { pushHistory } from '../../../state/actions/historyActions';

const SlotRow = ({ item, index, deleteItem, updateItemStatus, cate, pages }) => {
  const [statuses, setStatuses] = useState([
    { value: "accepted", label: 'Duyệt' },
    { value: "declined", label: 'Không duyệt' }])

  function convertDate(date) {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + '-' + month + '-' + year;
  }

  useEffect(() => {
    //console.log(pages);
  });

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.idUser}</td>
      {cate == 'question' &&
        <>
          <td>{item.idProduct}</td>
          <td>{item.question}</td>
        </>
      }
      {cate == 'answer' &&
        <>
          {<td>
            {item.Question ?
              <td> {item.Question.question} </td> :
              'Đã xóa'}
          </td>}
          <td>{item.answer}</td>
        </>
      }
      { cate == 'comment' &&
        <>
          {<td>
            {item.Rating ?
              <>
                <div style={{ fontWeight: '500' }}>{item.Rating.title}</div>
                {item.Rating.review}
              </> :
              'Đã xóa'}
          </td>}
          <td>{item.content}</td>
        </>
      }
      {cate == 'rating' &&
        <>
          <td>{item.idProduct}</td>
          <td>
            <div style={{ fontWeight: '500' }}>{item.title}</div>
            {item.review}
          </td>
        </>
      }

      <td>{convertDate(item.createdAt)}</td>
      <td>
        <div className="btn-group">
          <div className="btn-group">
            <button type="button" className="btn btn-info">Duyệt</button>
            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu" role="menu">
              {statuses.map((s, index) => (
                <li key={index} onClick={() => {
                  updateItemStatus({ id: item.id, status: s.value, pages });
                }}><a href="javascript:void(0);"> {s.label} </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => deleteItem(item.id)}
            type="button"
            className="btn btn-danger">
            Xóa
            </button>
        </div>
      </td>
    </tr>
  );
}

export default connect(null, { pushHistory, })(SlotRow);
