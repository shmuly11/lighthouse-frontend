import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from './redux/userSlice'
import {setCommunity} from './redux/communitySlice'
import {setRequests} from './redux/requestsSlice'
import {setOffers} from './redux/offersSlice'
import data from './seedData'
import Request from './Request'
import FormCreator from "./FormCreator";
import NewBroadcastForm from "./NewBroadcastForm";
import OfferCard from './OfferCard'
import {useHistory} from 'react-router-dom'
import FormTemplate from "./FormTemplate";
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from "react-infinite-scroll-component";
import Fade from 'react-reveal/Fade'
import Modal from '@material-ui/core/Modal'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { appleTabsStylesHook } from '@mui-treasury/styles/tabs'
import Button from '@material-ui/core/Button'

// import classes from '*.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
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
  }))

  



function Main() {

    const [tabIndex, setTabIndex] = React.useState(0);
//   const tabsStyles = appleTabsStylesHook.useTabs();
//   const tabItemStyles = appleTabsStylesHook.useTabItem()
    
      const classes = useStyles()
    const user = useSelector(state => state.user)
    const offers = useSelector(state => state.offers)
    const [newComName, setNewComName] = useState("")
    const [newComPassword, setNewComPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    // dispatch(setCommunity(user.communities[0]))
    const community = useSelector(state => state.community)
    const [communities, setCommunities] = useState([])
    const [showJoinCommunity, setShowJoinCommunity] = useState(false)
    const requests = useSelector(state => state.requests)
    const [showForm, setShowForm] = useState(false)
    const [startIndex, setStartIndex] = useState(0)
    const [joinPassword, setjoinPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
    
    console.log("main", community)
    console.log("requests", requests)
    console.log(localStorage.getItem('currentUser'))
   

    useEffect(() => {
     
        console.log("useeffect", community)
        fetch(`http://localhost:3000/communities/${community.id}`)
        .then(res=>res.json())
        .then(data =>{
            dispatch(setRequests(data.requests))
            dispatch(setOffers(data.offers))
        })
        
    }, [])

    function isAdmin(id){
        return fetch("http://localhost:3000/admin",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({member_id: user.id, community_id: id})
        })
        .then(res=>res.json())
        

    }

    useEffect(() => {
        isAdmin(community.id)
        .then(data =>{ 
            setAdmin(data.admin)    
        })
    }, [community])

    function handleLogout(){
        dispatch(setUser(null))
        localStorage.removeItem('currentUser')
        history.push('/')

    }



    function handleCreateCommunity(e){
        e.preventDefault()
        fetch("http://localhost:3000/communities",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({member_id: user.id, name: newComName, password: newComPassword})
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUser(data))
            console.log(data)
            const newCom = data.communities[data.communities.length - 1]
            dispatch(setCommunity(newCom))
            dispatch(setRequests(newCom.requests))
            dispatch(setOffers(newCom.offers))
            setNewComName("")
            setNewComPassword("")
            // console.log(data)
            // dispatch(setCommunity(data))
            // dispatch(setRequests(data.requests))
            // dispatch(setOffers(data.offers))
        })

    }

    function handleJoinCommunity(){

    }

    useEffect(() => {
        fetch('http://localhost:3000/communities')
        .then(res => res.json())
        .then(setCommunities)
       
    }, [])
    
    const displayCommunities = communities.filter(allCom => {
       return !user.communities.some(userCom => userCom.id === allCom.id)
    })
    .map(community => {
        return (
            <form onSubmit={(e)=>handleCommunity(e, community.id)}>
              <input type="password" value={joinPassword} onChange={(e)=> setjoinPassword(e.target.value)}></input>
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
          body: JSON.stringify({member_id: user.id, community_id: id, password: joinPassword})
      })
      .then((res)=>res.json())
      .then(data => {
        if (data.errors) {
            setErrors(data.errors);
            
          } else {

          dispatch(setUser(data))
          console.log(data)
          const newCom = data.communities[data.communities.length - 1]
          dispatch(setCommunity(newCom))
          dispatch(setRequests(newCom.requests))
          dispatch(setOffers(newCom.offers))
          }
          
          
      })
      
    }
    

    const requestsDisplay = requests
    .filter(request => request.people - request.helpers.length > 0)
    .filter(request => !request.helpers.some(helper => helper.id === user.id))
    .filter(request => {
        if ( tabIndex=== 0){
            return true
        }else{
            return request.broadcast.id === tabIndex
        }
    
    })
    // .slice(startIndex, startIndex + 8)
    // .filter(request=> request.member_id !== user.id)
    .map(request=>{
       return (
           
       <Request key={request.id} request={request} />
      )
    })

    const offersDisplay = offers
    .filter(offer=> offer.member_id === user.id)
    .map(offer => {
        return <OfferCard key={offer.id} offer={offer} />
    })
    console.log(user.communities)

    function handleCommunitySelect(e){
        dispatch(setCommunity(user.communities[e.target.value]))
        dispatch(setRequests(user.communities[e.target.value].requests))
        dispatch(setOffers(user.communities[e.target.value].offers))
        console.log("in change", community)
        // isAdmin(e.target.value)
        // .then(data =>{ 
        //     setAdmin(data.admin)    
        // })
    }

    function handleMoreClick() {
        setStartIndex((startIndex) => {
          // there's another trick with %
          if (startIndex === requests.length - 8) {
            return 0;
          } else {
            return startIndex + 8;
          }
        });
      }

      const tabs = community.broadcasts.map(broadcast=>{
       return <Tab  label={broadcast.name} style={{color: broadcast.color}}/>
      })

      function handleTabChange(e, index){
        console.log(e, index)
        setTabIndex(index)
      }

    return (
        <div className="main">
            
             
         
             

            
            <button onClick={handleOpen}>New Request</button>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
               {<div className={classes.modal_body}>
                <NewBroadcastForm handleClose={handleClose}/>
                 </div>}
              </Modal>
            {showForm && <NewBroadcastForm />}
            <Button className="logout" varient="outlined"  onClick={handleLogout}>logout</Button>
            {/* <button onClick={handleMoreClick}>More</button> */}
            <form onSubmit={handleCreateCommunity}>
                <input type="text" value={newComName} placeholder="name" onChange={(e)=> setNewComName(e.target.value)}></input>
                <input type="password" value={newComPassword} placeholder="password" onChange={(e)=> setNewComPassword(e.target.value)}></input>
            <button type="submit" >create new community</button>
            </form>

            <button onClick={()=>setShowJoinCommunity(!showJoinCommunity)}>join community</button>
            {showJoinCommunity && displayCommunities}
            {errors.map((error) => (
              <p key={error}>{error}</p>
             ))}
            {admin && <button onClick={()=> history.push('/new_template')}>ADMIN make new template</button>}
            <select onChange={handleCommunitySelect}>
                {user.communities.map((community, index)=>{
                    return <option key={community.id} value={index}>{community.name}</option>
                })}
            </select>
            
            <h1>Welcome {user.name} To {community.name} </h1>
            <Avatar alt={user.name} src={user.image} className={classes.large}/>
            <Tabs
            value={tabIndex}
            onChange={(e, index) => handleTabChange(e, index)}
            className="tabs"
            variant="scrollable"
            scrollButtons="on"
            >
                    <Tab   label={"All"} />
                {tabs}
            </Tabs>
            <div id="board">     
                <div className="grid">
                {/* <h1>Requests</h1> */}
                {requestsDisplay}
                
                </div>
                
            </div>
           
            <div className="request-list">
                    <h1>My Offers</h1>
                    {offersDisplay}
                </div>
                   
            
            
            {/* <FormTemplate /> */}
           
            {/* <div className="glass"></div> */}
        </div>
        
       
    )
}

export default Main
