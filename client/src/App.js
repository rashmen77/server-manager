import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login.jsx";
import ServerManager from "./components/ServerManager.jsx";

const UnconnectedApp = ({ lgin, dispatch }) => {
  const handleClick = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: "login-fail"
    });
  };

  return (
    <BrowserRouter>
      {lgin ? <button onClick={handleClick}>Log Out</button> : ""}
      <Route exact={true} path="/" component={Login}></Route>
      <Route
        exact={true}
        path="/serverManager"
        component={ServerManager}
      ></Route>
    </BrowserRouter>
  );
};

let mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
