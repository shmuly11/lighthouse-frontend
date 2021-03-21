import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from './redux/userSlice'
import {setRequests} from './redux/requestsSlice'
import data from './seedData'
import Request from './Request'
import FormCreator from "./FormCreator";
import NewBroadcastForm from "./NewBroadcastForm";

function Main() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const requests = useSelector(state => state.requests)
    const [showForm, setShowForm] = useState(false)
   console.log(requests)

    useEffect(() => {
        fetch("http://localhost:3000/requests")
        .then(res=>res.json())
        .then(data =>{
            dispatch(setRequests(data))
        })
        
    }, [])
    
    

    const dataDisplay = requests.map(request=>{
       return <Request key={request.id} request={request} />
    })

    return (
        <div>
            Main Page
            <h1>Welcome {user.name}</h1>
            
            {dataDisplay}
            <button onClick={()=>setShowForm(!showForm)}>Create new Broadcast</button>
            {showForm && <NewBroadcastForm />}
            
        </div>
    )
}

export default Main
