import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {removeOffer} from './redux/offersSlice'

function OfferCard({offer}) {
    console.log(offer)
    const dispatch= useDispatch()

    function handleDelete(){
        fetch(`http://localhost:3000/request_offers/${offer.id}`,{
          method: "DELETE"
        })
        dispatch(removeOffer(offer))
      }
    return (
        <div >
            Helping {offer.helpeds[0].name}
            <br></br>
            With
            <p>{offer.content}</p>
            <button onClick={handleDelete}>delete offer</button>
        </div>
    )
}

export default OfferCard
