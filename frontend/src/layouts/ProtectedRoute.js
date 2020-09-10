import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  render() {
    const { prop, key } = this.props;
    let Component = prop.component;
    const isAuthenticated = this.props.authenticated;
    console.log(isAuthenticated);

    return isAuthenticated === true ? (
      <Component key={key} />
    ) : (
      <Redirect to="/auth/login" />
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated.authenticated
  };
};
export default connect(mapStateToProps)(ProtectedRoute);
