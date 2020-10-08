import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEE_DELETED,
  EMPLOYEES_RECEIVED,
  EMPLOYEES_ADDED,
  EMPLOYEE_UPDATED,
} from "../actions/types";

const initialState = {
  employees: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        isLoaded: true,
      };
    case EMPLOYEES_RECEIVED:
      return { ...state, employees: action.payload.data, isLoaded: true };
    case ADD_EMPLOYEE:
      return {
        ...state,
        //employees: [action.payload, ...state.employees],
        isLoaded: false,
      };
    case EMPLOYEES_ADDED:
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        isLoaded: true,
      };
    // case DELETE_EMPLOYEE:
    //   return {
    //     ...state,
    //   };
    case EMPLOYEE_DELETED:
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp._id !== action.payload._id
        ),
      };

    case EMPLOYEE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
