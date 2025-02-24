import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import validator from "validator";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
export default function SignUp({ navigate }) {
  const route = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    mobile: "",
    birthdate: "",
    question: "",
    answer: "",
    showPassword: false,
  });

  const [forgetPassword, setForgetPassword] = useState(false);
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("");

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
  //go to backend

  const handleSubmit = (event) => {
    var uid ;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("firstName") === "" ||
      data.get("lastName") === "" ||
      data.get("password") === "" ||
      data.get("username") === "" ||
      data.get("birthdate") === "" ||
      data.get("mobile") === "" ||
      data.get("question") === "" ||
      data.get("answer") === ""
      // data.get("birthdate") === ""
    ) {
      setError(1);
      setErrorMessage("Please fill all fields!");
      setType("warning");
    } else {
      // if (
      //   !validator.isStrongPassword(data.get("password"), {
      //     minLength: 8,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1,
      //   })
      // ) {
      //   setError(1);
      //   setErrorMessage("Please enter a strong password");
      //   setType("warning");
      // } else {
       // console.log(data);
       
      
  
        initializeApp(firebaseConfig)
       
// init services
       const db = getFirestore()
       const auth = getAuth()
       let valuesExt= {} ;
       createUserWithEmailAndPassword(auth,
        String(data.get("username"))  ,  String(data.get("password"))
      ).then(cred => {
         
        console.log(cred.user)
        let values = {
          firstName: String(data.get("firstName")),
          lastName: String(data.get("lastName")),
          userName: String(data.get("username")),
          birth_date: String(data.get("birthdate")),
          phoneNumber:String( data.get("mobile")),
          uid: String(cred.user.uid)
          
        };
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
          method: "POST",
          headers : myHeaders,
          redirect: "follow",
          body: JSON.stringify(values)
        };

        console.log(values);
        fetch("https://us-central1-cegedim-1d756.cloudfunctions.net/users/", requestOptions)
          .then(()=>{
            route('/');
          })
          .catch((error) => console.log("error", error));

      }).catch(err => {
          console.log(err)
      })

    
      
    
     
       
     }}    ;
 
   

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <label htmlFor="outlined-adornment-password">
              First Name
                  </label>
                <OutlinedInput
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <label htmlFor="outlined-adornment-password">
              Last Name
                  </label>
                <OutlinedInput
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
              <label htmlFor="outlined-adornment-password">
              UserName
                  </label>
                <OutlinedInput
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            
                <FormControl fullWidth sx={{ m: 1, width: "25ch" }} variant="outlined">
                
                  <label htmlFor="outlined-adornment-password">
                    Password
                  </label>
                  <OutlinedInput
                    fullWidth
                    name="password"
                    id="outlined-adornment-password"
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <div position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </div>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <label htmlFor="outlined-adornment-password">
              Mobile Phone
                  </label>
                <OutlinedInput
                  autoComplete="fname"
                  name="mobile"
                  required
                  fullWidth
                  id="firstName"
                  label="Mobile Number"
                  autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <label id="demo-simple-select-helper-label">
                    gov 20 number
                  </label>
                <OutlinedInput
                  required
                  fullWidth
                  id="gov"
                  label="gob"
                  name="gob"
                  autoComplete="gov"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <label htmlFor="outlined-adornment-password">
              Birth date
                  </label>
                <OutlinedInput
                  id="date"
                  label="Birthday"
                  type="date"
                  name="birthdate"
                  defaultValue="2022-01-01"
                  sx={{ width: 267 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <label id="demo-simple-select-helper-label">
                    Question
                  </label>
                  <Select
                    required
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={state.question}
                    name="question"
                    label="Question"
                    onChange={handleChange("question")}
                  >
                    <MenuItem value={"what is your favorite pet?"}>
                      what is your favorite pet?
                    </MenuItem>
                    <MenuItem value={"what is your favorite color?"}>
                      what is your favorite color?
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    (choose security question to restore password)
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <label id="demo-simple-select-helper-label">
                    Answer
                  </label>
                <OutlinedInput
                  required
                  fullWidth
                  id="answer"
                  label="answer"
                  name="answer"
                  autoComplete="answer"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#009999" }}
            >
              Sign Up
            </Button>
            {error === 1 && (
              <Alert severity={type}>warning — {errorMessage}</Alert>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/featured/?vaccine)",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
