import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEE_DELETED,
  EMPLOYEES_RECEIVED,
  EMPLOYEE_ADDED,
  EMPLOYEE_UPDATED,
} from '../actions/types';

const initialState = {
  employees: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        //isLoaded: true,
      };
    case EMPLOYEES_RECEIVED:
      return {
        ...state,
        employees: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        //employees: [action.payload, ...state.employees],
        isLoaded: false,
      };
    case EMPLOYEE_ADDED:
      return {
        ...state,
        //employees: [action.payload, ...state.employees],
        isLoaded: true,
      };

    case EMPLOYEE_DELETED:
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.id !== action.payload.id
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
