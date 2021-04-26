import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./views/HomePage";
import PostPage from "./views/PostPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

//styles
import "./styles/app.css";
import "./styles/form.css";
import "./styles/helpers.css";
import { useAppState } from "./context/appContext";

const App: React.FC = () => {
  const { sl_token } = useAppState();
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (sl_token ? <Redirect to="/posts" /> : <HomePage />)}
        />
        <ProtectedRoute
          exact
          path="/posts"
          component={PostPage}
          sl_token={sl_token}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default App;
