import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {removeOffer} from './redux/offersSlice'

function OfferCard({offer}) {
    const dispatch= useDispatch()

    function handleDelete(){
        fetch(`http://localhost:3000/request_offers/${offer.id}`,{
          method: "DELETE"
        })
        dispatch(removeOffer(offer))
      }
    return (
        <div >
            {offer.content}
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default OfferCard
