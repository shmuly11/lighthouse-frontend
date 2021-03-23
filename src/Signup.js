import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from './redux/userSlice'
import {useHistory} from 'react-router-dom'




function Signup() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const [communities, setCommunities] = useState([])
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    age:"",
    password: "",
    email: ""
  })

  useEffect(() => {
      fetch('http://localhost:3000/communities')
      .then(res => res.json())
      .then(setCommunities)
     
  }, [])

  const displayCommunities = communities.map(community => {
      return <button key={community.name} onClick={()=>handleCommunity(community.id)}> {community.name}</button>
  })

  function handleCommunity(id){
    fetch('http://localhost:3000/community_members',{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({member_id: user.id, community_id: id})
    })
    .then(history.push("/main"))
    
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  function handleSignupSubmit(e){

      e.preventDefault()
      fetch("http://localhost:3000/signup",{
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
            setValue(1)
        //     if(rememberMe){
        //       localStorage.setItem('currentUser', JSON.stringify(data))
        //     }
        //     history.push("/main");
          }
        })
    
  }
    return (
        <>
        { value === 0 ? <form onSubmit={handleSignupSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleFormChange}
            
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              
              value={formData.email}
              onChange={handleFormChange}
              error={errors.length > 0}
              id="outlined-error-helper-text"
              variant="outlined"
              helperText={errors}
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
              onChange={handleFormChange}
            //   error={errors.length > 0}
            //   id="outlined-error-helper-text"
            //   helperText={errors}
            //   variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            //   className={classes.submit}
            >
              Sign Up
            </Button>

        </form>
        :
        <>
        {displayCommunities}
        </>
        }
        <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab icon={<AccountCircleIcon/>} label="My Info" disabled={value === 1}/>
          {/* <Tab label="Disabled" disabled={false} /> */}
          <Tab icon={<SupervisedUserCircleIcon/>} label="Choose Community" disabled={value === 0}/>
        </Tabs>
      </Paper>
      </>
    )
}

export default Signup
