import * as React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {ReactSession} from 'react-client-session';
import Navbar from "../Navbar";
import { Label } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function SignInSide({ navigate }) {
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("warning");
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [forgetPassword, setForgetPassword] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const route = useNavigate();

  const firebaseConfig = {
    apiKey: "AIzaSyAPPXFRcjX1HaSZ_pdLPfQYt992PvNgFo8",
    authDomain: "cegedim-1d756.firebaseapp.com",
    databaseURL: "https://cegedim-1d756-default-rtdb.firebaseio.com",
    projectId: "cegedim-1d756",
    storageBucket: "cegedim-1d756.appspot.com",
    messagingSenderId: "65613562669",
    appId: "1:65613562669:web:0ac78582c0237fbb7489a4",
    measurementId: "G-490J6MR99R"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let check = 0;
    if (data.get("password") === "" || data.get("username") === "") {
      setError(1);
      setErrorMessage("Please fill all fields!");
      setType("warning");
      check = 1;
    }
    if (check === 0) {
      initializeApp(firebaseConfig)
       
      // init services
             const db = getFirestore()
             const auth = getAuth()
           
             signInWithEmailAndPassword(auth,
              String(data.get("username"))  ,  String(data.get("password"))
            ).then(cred => {
               
              console.log(cred.user)
              // let values = {
               
              //   userName: String(data.get("username")),
              //   password: String(data.get("password")),
                
              // };
              // db.collection("users").doc().set({name:"ahmed waleed"})
              // .then(()=>{
              //   console.log("sucess")
              // })
              // .catch(()=>{
              //   console.log("error")
              // })
              let myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              var requestOptions = {
                method: "GET",
                headers : myHeaders,
                redirect: "follow",
                //body: JSON.stringify(values)
              };
      
              // console.log(values);
              fetch("https://us-central1-cegedim-1d756.cloudfunctions.net/users/"+cred.user.uid, requestOptions)
              .then((response) => {
                
                response.text()})
                .then((data)=>{
                  console.log(data);
                  route('/');
                })
                .catch((error) => console.log("error", error));
      
            }).catch(err => {
                console.log(err)
            })
      
          
            
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange1 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleForgetPassword = () => {
    console.log(values.username);
    setForgetPassword(true);
    //call to the back end to get the question  and set them
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8082/api/auth/get-user-question/${values.username}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setQuestion(data);
      })
      .catch((error) => console.log("error", error));
  };
  const handleAnswer = (event) => {
    //send the answer to the back end and show the result
    var requestOptions = {
      method: "POST",
      body: answer,
      redirect: "follow",
    };

    console.log(answer);
    fetch(
      `http://localhost:8082/api/auth/validate-answer/${values.username}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // setQuestion(data);
        // setAnswer(event.target.value);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/featured/?vaccine)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#009999" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <label >UserName</label>
              <OutlinedInput
                required
                margin="dense"
                fullWidth
                id="outlined-required"
                label="userName"
                name="username"
                autoComplete="username"
                onChange={handleChange1("username")}
              />

              <FormControl
                fullWidth
                variant="outlined"
                label={'margin="dense"'}
                id="margin-dense"
                margin="dense"
              >
                {/* <InputLabel required htmlFor="outlined-adornment-password">
                  Password
                </InputLabel> */}
                <label > Password</label>
                <OutlinedInput
                  label={'margin="dense"'}
                  id="margin-dense"
                  margin="dense"
                  name="password"
                  type={values.showPassword ? "password" : "text"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <div position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </div>
                  }
                />
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#009999" }}
                onClick={handleForgetPassword}
              >
                Forget Password ?
              </Button>
              {forgetPassword && (
                // <InputLabel required htmlFor="outlined-adornment-password">
                //   {question}
                // </InputLabel>
                <label > {question} </label>
              )}
              {forgetPassword && (
                <input
                  required
                  margin="dense"
                  fullWidth
                  id="outlined-required"
                  label="Answer"
                  name="answer"
                  autoComplete="username"
                  defaultValue={answer}
                />
              )}
              {forgetPassword && <Button onClick={handleAnswer}>OK</Button>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#009999" }}
              >
                Sign In
              </Button>
              {error === 1 && (
                <Alert severity={type}>warning — {errorMessage}</Alert>
              )}
              <Grid container>
                <Grid item xs></Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
