import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EMPLOYEE_DELETED,
  EMPLOYEES_RECEIVED,
  EMPLOYEE_ADDED,
  EMPLOYEE_UPDATED,
  EMPLOYEE_RECEIVED,
  UPDATE_EMPLOYEE,
} from "../actions/types";

const initialState = {
  employees: [],
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };
    case EMPLOYEES_RECEIVED:
      return {
        ...state,
        employees: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case EMPLOYEE_RECEIVED:
      return {
        ...state,
        employee: action.payload.data,
        isLoaded: true,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        isLoaded: false,
      };
    case EMPLOYEE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case EMPLOYEE_DELETED:
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.id !== action.payload.id
        ),
      };

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        isUpdated: false,
      };
    case EMPLOYEE_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };

    default:
      return state;
  }
}
