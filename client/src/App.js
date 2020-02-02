import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const UnconnectedApp = ({ dispatch }) => {
  // let checkLogined = async () => {
  //   let response = await fetch("/checkLogined");
  //   let reponseBody = await response.text();
  //   let body = JSON.parse(reponseBody);
  //   console.log("Current user loggedIn", body);

  //   if (body.success) {
  //     dispatch({
  //       type: "login-success",
  //       value: body.data
  //     });
  //   } else {
  //     console.log("Login/Signup - no user logined in");
  //     dispatch({
  //       type: "login-fail"
  //     });
  //   }
  // };

  // useEffect(() => {
  //   checkLogined();
  // });

  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={Login}></Route>
      <Route exact={true} path="/signup" component={Signup}></Route>
    </BrowserRouter>
  );
};

let mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
