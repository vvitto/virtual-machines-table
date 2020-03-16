import React, { useState } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Refactored ui on antd design lib
import Main from "./features/Main";
import Auth from "./features/pages/Auth";
import { StoreProvider } from "./components/StoreProvider";
import "antd/dist/antd.css";
<<<<<<< HEAD
=======
import Main from "./components/Main";
import { StoreProvider } from "./StoreProvider";
import Auth from "./components/pages/Auth";
import "./App.scss";
>>>>>>> fixed pritter formatting
=======
>>>>>>> Refactored ui on antd design lib

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <StoreProvider>
      <HashRouter>
        <Switch>
          <Route path="/auth">
            <Auth authStatus={{ isAuthenticated, setIsAuthenticated }} />
          </Route>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;
