import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {GiLighthouse} from 'react-icons/gi'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from './redux/userSlice'
import Modal from '@material-ui/core/Modal';
import Signup from "./Signup";




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://collive.com/">
        Lighthouse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal_body: {
    height: 500,
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));







function Login() {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    
    const [rememberMe, setRememberMe] = useState(false)
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
    const [formData, setFormData] = useState({
      password: "",
      email: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/login",{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
            
          } else {
            console.log(data)
            dispatch(setUser(data))
            if(rememberMe){
              localStorage.setItem('currentUser', JSON.stringify(data))
            }
            history.push("/main");
          }
        })
        
        
    }

    function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  console.log(errors.length > 0)

    return (
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <GiLighthouse />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}  onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={errors.length > 0}
              id="outlined-error-helper-text"
              variant="outlined"
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
              value={formData.password}
              onChange={handleChange}
              error={errors.length > 0}
              id="outlined-error-helper-text"
              helperText={errors}
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={()=> setRememberMe(!rememberMe)}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* {errors.map((error) => (
              <p key={error}>{error}</p>
             ))} */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleOpen}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
             
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
               {<div className={classes.modal_body}>
                <Signup/>
                 </div>}
              </Modal>
        </div>
      </Grid>
    </Grid>
    )
}

export default Login
