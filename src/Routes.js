import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Cart from "./Pages/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}
export default Routes;