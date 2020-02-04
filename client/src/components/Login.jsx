import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAlert } from "react-alert";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const UnconnectedLogin = ({ lgin, dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert.show("username address / password missing");
      return;
    }

    let response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    let responsebody = await response.text();

    let payload = JSON.parse(responsebody);
    console.log("/login response", payload);

    if (payload.success) {
      localStorage.setItem("token", payload.jwt);
      dispatch({
        type: "login-success",
        value: payload.user
      });

      alert.show(`login-success`);
    } else {
      dispatch({
        type: "login-fail"
      });
      alert.show(`Login-failed ${payload.message}`);
    }
  };

  const renderRedirect = () => {
    if (lgin) {
      return <Redirect to="/serverManager" />;
    }
  };

  return (
    <>
      {renderRedirect()}
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign in</Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username Address"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => handleSubmit(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
let mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
