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



function Main() {
    const user = useSelector(state => state.user)
    const offers = useSelector(state => state.offers)
    const [newComName, setNewComName] = useState("")
    const [admin, setAdmin] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    // dispatch(setCommunity(user.communities[0]))
    const community = useSelector(state => state.community)
    const [communities, setCommunities] = useState([])
    const [showJoinCommunity, setShowJoinCommunity] = useState(false)
    const requests = useSelector(state => state.requests)
    const [showForm, setShowForm] = useState(false)
    
    console.log("main", community)
    console.log("requests", requests)
    console.log(admin)
   

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
            body: JSON.stringify({member_id: user.id, name: newComName})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(setCommunity(data))
            dispatch(setRequests(data.requests))
            dispatch(setOffers(data.offers))
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
        return <button key={community.id} onClick={()=>handleCommunity(community.id)}> {community.name}</button>
    })
  
    function handleCommunity(id){
      fetch('http://localhost:3000/community_members',{
          method: "POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({member_id: user.id, community_id: id})
      })
      .then((res)=>res.json())
      .then(data => {
          dispatch(setCommunity(data))
          dispatch(setRequests(data.requests))
          dispatch(setOffers(data.offers))
          
          
      })
      
    }
    

    const requestsDisplay = requests
    // .filter(request=> request.member_id !== user.id)
    .map(request=>{
       return <Request key={request.id} request={request} />
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

    return (
        <div>
            Main Page
            <button onClick={handleLogout}>logout</button>
            <form onSubmit={handleCreateCommunity}>
                <input type="text" value={newComName} onChange={(e)=> setNewComName(e.target.value)}></input>
            <button type="submit" >create new community</button>
            </form>
            <button onClick={()=>setShowJoinCommunity(!showJoinCommunity)}>join community</button>
            {showJoinCommunity && displayCommunities}
            {admin && <button onClick={()=> history.push('/new_template')}>ADMIN make new template</button>}
            <select onChange={handleCommunitySelect}>
                {user.communities.map((community, index)=>{
                    return <option key={community.id} value={index}>{community.name}</option>
                })}
            </select>
            <h1>Welcome {user.name} To {community.name}</h1>
            <div className="req-offers">
                <h1>Requests</h1>
                {requestsDisplay}
                <div className="request-list">
                    <h1>My Offers</h1>
                    {offersDisplay}
                </div>
            </div>
            
            <button onClick={()=>setShowForm(!showForm)}>New Request</button>
            {showForm && <NewBroadcastForm />}
            {/* <FormTemplate /> */}
        </div>
    )
}

export default Main
