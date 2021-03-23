import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addRequest} from './redux/requestsSlice'
// import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function NewBroadcastForm() {

    const user = useSelector(state => state.user)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        member_id: user.id,
        title: "",
        start_date: new Date(),
        url: "",
        content: "",
        broadcast_id:1,
        offer: false
    })
    
    const handleDateChange = (date) => {
        console.log(date)
    setSelectedDate(date);
    setFormData({...formData, start_date: date.toDateString()})
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        fetch("http://localhost:3000/request_offers",{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res=> res.json())
        .then(data=> {
            dispatch(addRequest(data))
        })
    }
    
    function handleChange(e){
        // console.log(e)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" name="title" onChange={handleChange}></input>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         
        </Grid>
        </MuiPickersUtilsProvider>
        <input type="text" placeholder="link" name="url" onChange={handleChange}></input>
        <input type="textarea" placeholder="content" name="content" onChange={handleChange}></input>
        <input type="submit"></input>
            </form>
            {/* {selectedDate.toString()} */}
        </div>
    )
}

export default NewBroadcastForm
