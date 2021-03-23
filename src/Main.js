import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from './redux/userSlice'
import {setRequests} from './redux/requestsSlice'
import {setOffers} from './redux/offersSlice'
import data from './seedData'
import Request from './Request'
import FormCreator from "./FormCreator";
import NewBroadcastForm from "./NewBroadcastForm";
import OfferCard from './OfferCard'
import {useHistory} from 'react-router-dom'


function Main() {
    const user = useSelector(state => state.user)
    const offers = useSelector(state => state.offers)
    const history = useHistory()
    const dispatch = useDispatch()
    const requests = useSelector(state => state.requests)
    const [showForm, setShowForm] = useState(false)
    console.log("offers", offers)
    console.log("requests", requests)
    
   

    useEffect(() => {
        fetch("http://localhost:3000/requests")
        .then(res=>res.json())
        .then(data =>{
            dispatch(setRequests(data))
            
        })
        
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/offers")
        .then(res=>res.json())
        .then(data =>{
            dispatch(setOffers(data))
            
        })
        
    }, [])

    function handleLogout(){
        dispatch(setUser(null))
        localStorage.removeItem('currentUser')
        history.push('/')

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

    return (
        <div>
            Main Page
            <button onClick={handleLogout}>logout</button>
            <h1>Welcome {user.name}</h1>
            <div className="req-offers">
                {requestsDisplay}
                <div className="request-list">
                    {offersDisplay}
                </div>
            </div>
            
            <button onClick={()=>setShowForm(!showForm)}>Create new Broadcast</button>
            {showForm && <NewBroadcastForm />}
            
        </div>
    )
}

export default Main
