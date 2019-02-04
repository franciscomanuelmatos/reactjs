import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Header = (props) => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to="/dashboard" activeClassName="is-active" exact>Home</NavLink>
      <NavLink to="/create" activeClassName="is-active" exact>Create expense</NavLink>
      <NavLink to="/edit" activeClassName="is-active" exact>Edit expense</NavLink>
      <NavLink to="/help" activeClassName="is-active" exact>Help</NavLink>
      <button onClick={props.startLogout}>Logout</button>
    </nav>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);