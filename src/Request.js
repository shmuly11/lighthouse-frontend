import React from 'react'
import Date from './Date'
import Location from './Location'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
  import RequestCard from './RequestCard'
  import {useSelector, useDispatch} from 'react-redux'
  import {addOffer} from './redux/offersSlice'

 

function Request({request}) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {id, assigned, content, end_date, start_date, location, member_name, time, url, member_id} = request
  const form = {
    new_offer: {...request, 
    assigned: true,
    offer: true,
    member_id: user.id
    },
    new_assigned:{
      member_id,
      member1_id: user.id,
      request_id: id
    }
  }

   function handleAccept(){
     if(user.id !== member_id){
     fetch('http://localhost:3000/request_offers/new_offer',{
       method: "POST",
       headers:{
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(form)
     })
     .then(res => res.json())
     .then(data=>{
       console.log(data)
       dispatch(addOffer(data))
     })
    }
   }

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={handleAccept}>
            Accept Offer
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => console.info('delete action triggered')}
          >
            Delete
          </SwipeAction>
        </TrailingActions>
      );



    // const newDisplay = attributes.map(a => {
    //     console.log(a)
    //     if(a.date){
    //         console.log("date")
    //          return <Date/>
    //     }else if (a.location){
    //        return  <Location/>
    //     }else if(a.pie){
    //         console.log("pie")
    //     }

    // })

    return (
        <div className="request-list">
            <SwipeableList threshold={0.2}>
                <SwipeableListItem
                    leadingActions={leadingActions()}
                    trailingActions={trailingActions()}
                >
                    <RequestCard request={request}/>
                </SwipeableListItem>
            </SwipeableList>
        </div>
    )
}

export default Request
