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

 

function Request({request}) {




    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => console.info('swipe action triggered')}>
            Action name
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
