import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin";


 class PrivateRoute extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        isAuthenticated:Boolean
    }
  }

  render() {
    let token = localStorage.getItem("token");
    let isAuthenticated= this.state.isAuthenticated;
    if (token) {
      isAuthenticated = true;
      
    } else {
      isAuthenticated = false;
    }
    return (
      <Route
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }

          if (this.props.component) {
            return React.createElement(this.props.component);
          }

          if (this.props.render) {
            return this.props.render(props);
          }
        }}
      />
    );
  }
}
export default PrivateRoute;
