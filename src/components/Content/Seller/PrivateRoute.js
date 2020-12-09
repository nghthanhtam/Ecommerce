import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

function createArrayOfRoles(obj) {
  var newArray = [];

  for (let eachVar in obj) {
    if (typeof obj[eachVar] === 'boolean' && obj[eachVar] === true) {
      newArray.push(eachVar);
    }
  }
  return newArray;
}
export const PrivateRoute = ({
  component: Component,
  role,
  token,
  ...rest
}) => (
    <Route
      {...rest}
      render={(props) => {
        // const userRole = jwt.decode(token);
        // console.log("userRole", jwt.decode(token));
        // let arrayOfRoles = createArrayOfRoles(userRole.role);

        // //check if route is restricted by role
        // if (userRole && !arrayOfRoles.includes(userRole)) {
        //   // userRole not authorised so redirect to home page
        //   return <Redirect to={{ pathname: '/403' }} />;
        // }

        // // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
// connect((state) => {
//   return {
//     auth: state.auth,
//   };
// }, PrivateRoute);
