import useIsAuthenticated from "./IsAuthenticated";
import React from "react";
import AdminLayout from "./layouts/Admin";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <BrowserRouter>
      <Switch>
        {/* Protected Route: Only accessible when the user is logged in */}
        <Route
          path="/admin"
          render={(props) =>
            isAuthenticated ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        {/* Login Route: Show the login page */}
        <Route path="/login" component={Login} />

        {/* Redirect to the admin dashboard if no other routes match */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
