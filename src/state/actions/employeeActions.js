import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEES_BY_SHOP
} from './types';

// export const getCategories = (show = 5, page = 1, query) => (
//   dispatch,
//   getState
// ) => {
//   let newQuery = "";
//   if (query === "") newQuery = "undefined";
//   else newQuery = query;
//   axios
//     .get(
//       `${process.env.REACT_APP_BACKEND_HOST}/api/category/${show}/${page}/${newQuery}`,
//       tokenConfig(getState)
//     )

//     .then((response) =>
//       dispatch({ type: GET_EMPLOYEES, payload: response.data })
//     )
//     .catch((er) => console.log(er.response));
// };
export const getEmployees = (params) => ({
  type: GET_EMPLOYEES,
  pages: params,
});

export const getEmployeesByShop = (params) => ({
  type: GET_EMPLOYEES_BY_SHOP,
  pages: params,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  id: id,
});
// export const deleteCategory = (id) => (dispatch, getState) => {
//   axios
//     .delete(
//       `${process.env.REACT_APP_BACKEND_HOST}/api/category/${id}`,
//       tokenConfig(getState)
//     )
//     .then((response) => {
//       dispatch({
//         type: DELETE_EMPLOYEE,
//         payload: response.data,
//       });
//     })
//     .catch((er) => console.log(er.response));
// };

// export const addCategory = (newEmp) => (dispatch, getState) => {
//   axios
//     .post(
//       `${process.env.REACT_APP_BACKEND_HOST}/api/category/`,
//       newEmp,
//       tokenConfig(getState)
//     )
//     .then((response) => {
//       if (newEmp._id instanceof mongoose.Types.ObjectId) {
//         newEmp._id = newEmp._id.toString();
//       }

//       dispatch({
//         type: ADD_EMPLOYEE,
//         payload: newEmp,
//       });
//     })
//     .catch((er) => console.log(er.response));
// };

export const addEmployee = (newEmp) => ({
  type: ADD_EMPLOYEE,
  newEmp: newEmp,
});

export const updateEmployee = (newEmp) => ({
  type: UPDATE_EMPLOYEE,
  newEmp: newEmp,
});

// export const updateCategory = (newEmp) => (dispatch, getState) => {
//   axios
//     .put(
//       `${process.env.REACT_APP_BACKEND_HOST}/api/category/${newEmp._id}`,
//       newEmp,
//       tokenConfig(getState)
//     )

//     .then((response) => {
//       dispatch({
//         type: UPDATE_EMPLOYEE,
//         payload: response.data,
//       });
//     })
//     .catch((error) => {
//       console.log(error.response);
//     });
// };
