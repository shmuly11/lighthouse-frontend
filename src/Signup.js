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
import {setCommunity} from './redux/communitySlice'
import {useHistory} from 'react-router-dom'




function Signup() {
  const dispatch = useDispatch()
  const history = useHistory()
  const community = useSelector(state => state.community)
  const user = useSelector(state => state.user)
  const [communities, setCommunities] = useState([])
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    age:"",
    image: "",
    password: "",
    email: ""
  })
  const [joinPassword, setJoinPassword] = useState("")
  const [comErrors, setComErrors] = useState([])

  useEffect(() => {
      fetch('http://localhost:3000/communities')
      .then(res => res.json())
      .then(setCommunities)
     
  }, [])

  const displayCommunities = communities.map(community => {
      return (
        <form onSubmit={(e)=>handleCommunity(e, community.id)}>
        <input type="password" value={joinPassword} onChange={(e)=> setJoinPassword(e.target.value)}></input>
        <button key={community.id} type="submit"> {community.name}</button>
        </form>
        )
        })

  function handleCommunity(e, id){
    e.preventDefault()
    fetch('http://localhost:3000/community_members',{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({member_id: user.id, community_id: id})
    })
    .then((res)=>res.json())
    .then(data => {
      if (data.errors) {
        setComErrors(data.errors);
        
      } else {
        dispatch(setCommunity(data.communities[data.communities.length - 1]))
        console.log("use", user.communities)
        console.log("signup", community)
        history.push("/main")
      }
    })
    
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function handleFormChange(e) {
    
    const value = e.target.type !== 'file' ? e.target.value : e.target.files[0]
    setFormData({ ...formData, [e.target.name]: value });
    }

  function handleSignupSubmit(e){

      e.preventDefault()
      const signUpFormData = new FormData()
      signUpFormData.append("name", formData.name)
      signUpFormData.append("age", formData.age)
      signUpFormData.append("email", formData.email)
      signUpFormData.append("password", formData.password)
      signUpFormData.append("image", formData.image)

      fetch("http://localhost:3000/signup",{
          method: "POST",
          
          body: signUpFormData
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
            <input type='file' name='image'onChange={handleFormChange}></input>
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
        {comErrors.map((error) => (
              <p key={error}>{error}</p>
             ))}
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
