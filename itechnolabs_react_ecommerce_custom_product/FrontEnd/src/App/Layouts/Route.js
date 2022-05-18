import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Authenticator from './Authenticator';
import AppLayout from '../Components/AppLayout';

const PrivateRoute = ({ component: Component, ...rest, allowed }) => (
  <Route {...rest} render={props => (
    <Authenticator reverse={ rest.type } {...props}>
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    </Authenticator>
  )} />
)

export default PrivateRoute;
