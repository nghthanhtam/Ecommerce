import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//Return errors

// export const returnErrors = (msg, status, id = null) => {
//   return {
//     type: GET_ERRORS,
//     payload: { msg, status, id }
//   };
// };

export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  params: { msg, status, id },
});

// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
